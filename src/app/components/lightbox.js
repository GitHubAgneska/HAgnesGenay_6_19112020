// code chunk adapted from:   https://www.w3.org/WAI/tutorials/lightboxs/full-code/
// Focusin/out event polyfill (for Firefox) by nuxodin
// Source: https://gist.github.com/nuxodin/9250e56a3ce6c0446efa
// lightbox Prototype Eric Eggert for W3C

import { photographerPageModule } from '../modules/photographerPageModule';

export const Lightbox = (function () {

    // Initial variables
    let index, slidenav, slides, settings, timer, setFocus, animationSuspended, announceItem, _this;
    let currentGallery; let currentImg;
    
    //HELPER FUNCTIONS
            // Helper function: Iterates over an array of elements
            function forEachElement(elements, fn) {
                for (var i = 0; i < elements.length; i++) 
                    fn(elements[i], i);
            }
            // Helper function: Remove Class ---------------> ( used to update class 'current/active'  of viewed picture ) 
            function removeClass(el, className) {
                if (el.classList) { el.classList.remove(className);
                } else { 
                    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }
            // Helper function: Test if element has a specific class -----> ( used to update class 'current/active'  of viewed picture )
            function hasClass(el, className) {
                if (el.classList) {
                    return el.classList.contains(className);
                } else {
                    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
                }
            }

    // Initialization for the lightbox ----------------------------------------
    // Argument: set = an object of settings
    // - slidenav <bool> If true, a list of slides is shown.
    // - animate <bool> If true, the slides can be animated.
    // - startAnimated <bool> If true, the animation begins immediately. ===> DEFAULT = FALSE 
    //                        If false, the animation needs to be initiated by clicking the play button.

    function init(set) { // Make settings available to all functions
        settings = set;
        // currentImgId = settings.currentImgId; // console.log('CURRENT ID CLICKED==', currentImgId);
        currentImg = settings.currentImg ; // = mediaItem object
        currentGallery = settings.currentGallery;

        // generate LIGHTBOX WRAPPER ========================================
        const lightboxWrapper = document.createElement('div');
        lightboxWrapper.setAttribute('class', 'lightbox-main-wrapper');
        lightboxWrapper.setAttribute('id', 'lightbox-main-wrapper');
        const lightboxInnerWrapper = document.createElement('div');
        lightboxInnerWrapper.setAttribute('class', 'lightbox-inner-wrapper');
        lightboxWrapper.appendChild(lightboxInnerWrapper);

        // generate LIGHTBOX  ========================================
        const lightboxElement = document.createElement('div');
        lightboxElement.setAttribute('id', 'lightbox');
        lightboxElement.setAttribute('class', 'lightbox');

        // close lightbox btn ========================================
        const closeLightboxBtn = document.createElement('div');
        closeLightboxBtn.innerHTML = 
        `
        <div id="closeLightboxBtn" class="closeLightboxBtn" role="button" aria-label="close lightbox">
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        `;

        closeLightboxBtn.addEventListener('click', function(){photographerPageModule.closeLightbox(lightboxWrapper);});

        lightboxElement.appendChild(closeLightboxBtn);

        // attach lightbox to its main wrapper
        lightboxInnerWrapper.appendChild(lightboxElement);
        
        // append lightbox main wrapper to root container
        const root = document.querySelector('#root');
        root.appendChild(lightboxWrapper);

        // from here, definition of 'lightbox':
        const lightbox = lightboxWrapper.querySelector('#lightbox');


        // HERE : generate first ul, injecting data from json as bg images into li elements
        // --------------------------------------------------------------------------------
        var firstUl = document.createElement('ul');
        firstUl.setAttribute('class', 'lightbox-images');

        // for each image of gallery, generate a li element with bg img + class .slide or a video tag + source
        currentGallery.forEach(pic => {
            let liItem = document.createElement('li');
            liItem.className = 'slide';
            liItem.setAttribute('data', pic.id);

            // eslint-disable-next-line no-prototype-builtins
            if (pic.hasOwnProperty('image')) {
                liItem.setAttribute('style', 'background-image:url("./assets/img/' + pic.photographerName + '/XL/'+ (pic.image ) + '")' );
            }
            // eslint-disable-next-line no-prototype-builtins
            else if (pic.hasOwnProperty('video')) {
                let videoWrapper = document.createElement('video');
                videoWrapper.setAttribute('controls', '');
                let source = document.createElement('source');
                source.setAttribute('src', './assets/img/' + pic.photographerName + '/'+ (pic.video) );
                source.setAttribute('type', 'video/mp4');

                videoWrapper.appendChild(source);
                liItem.appendChild(videoWrapper);
            }
            
            let imgTitle = document.createElement('h5');
            imgTitle.setAttribute('class', 'mediaItem-title');
            let imgTitleTxt = document.createTextNode(pic.title);
            imgTitle.appendChild(imgTitleTxt);

            liItem.appendChild(imgTitle);// attach h5 title element to li element
            firstUl.appendChild(liItem); // attach li element to ul
        });

        lightboxElement.appendChild(firstUl);
        slides = lightbox.querySelectorAll('.slide');


        // CONTROLS : second ul -------------------------------------------------------------------
        var ctrls = document.createElement('ul');
        ctrls.className = 'controls';
        ctrls.innerHTML = 
            `<li>
                <button type="button" aria-label="previous photo" class="btn-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
            </li> 
            <li>
                <button type="button" aria-label="next photo" class="btn-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
            </li>
            `;
        
        // attach click events to btns
        ctrls.querySelector('.btn-prev').addEventListener('click', function () { prevSlide(true); });
        ctrls.querySelector('.btn-next').addEventListener('click', function () { nextSlide(true); });

        lightboxElement.appendChild(ctrls);
        // ---------------------------------------------------------------------------------


        // GENERATE UL ELEMENTS for accessibility : third ul --------------------------------------------------------------------------- 
        // start/pause lightbox / pictures indexes to navigate manually + check current active pic 
        if (settings.slidenav || settings.animate) {   // If lightbox 'animated' or 'slide navigation' = requested in settings

            slidenav = document.createElement('ul'); // settings.slidenav = true : 'list of slides is shown.'
            slidenav.className = 'slidenav';

            if (settings.animate) {  // 'If true, the slides can be animated => add start/stop btns

                var li = document.createElement('li');  
                if (settings.startAnimated) {
                    li.innerHTML = '<button aria-label="stop slides animation" class="commands" data-action="stop"><span class="visuallyHidden">Stop Animation </span>￭</button>';
                } else {
                    li.innerHTML = '<button aria-label="start slides animation" class="commands" data-action="start"><span class="visuallyHidden">Start Animation </span>▶</button>';
                }
                slidenav.appendChild(li);
            }
            if (settings.slidenav) { // settings.slidenav = true : list of slides is shown.

                forEachElement(slides, function (el, i) {  // for each li element created with bg image
                    var li = document.createElement('li');
                    var klass = (i === 0) ? 'class="current" ' : '';
                    var kurrent = (i === 0) ? ' <span class="visuallyHidden">(Current Item)</span>' : '';

                    li.innerHTML = // ----------------------- list should only display picture name/title
                        // eslint-disable-next-line quotes
                        `<button  ` + klass + `aria-label="picture-title" `   + `data-slide="` + i + `"><span class="visuallyHidden">placeholder</span>"` + ( i + 1 ) + kurrent + `</button>`;

                    slidenav.appendChild(li);
                });
            }
            // STOP & START btns CLICK EVENT LISTENERS -----------------------------------------------------------
            slidenav.addEventListener('click', function (event) {
                var button = event.target;
                if (button.localName == 'button') {
                    if (button.getAttribute('data-slide')) {
                        stopAnimation();
                        setSlides(button.getAttribute('data-slide'), true);
                    } else if (button.getAttribute('data-action') == 'stop') {
                        stopAnimation();
                    } else if (button.getAttribute('data-action') == 'start') {
                        startAnimation();
                    }
                }
            }, true);

            // KEYBOARD SUPPORT
            slidenav.addEventListener('keydown', function (event) {
                var button = event.target;
                if (button.localName == 'button') {
                    if (button.getAttribute('data-slide')) {
                        stopAnimation();
                        setSlides(button.getAttribute('data-slide'), true);

                    } else if (button.getAttribute('data-action') == 'stop') {
                        stopAnimation();
                    } else if (button.getAttribute('data-action') == 'start') {
                        startAnimation();
                    }
                }
            }, true);

            lightbox.className = 'active lightbox with-slidenav';
            lightboxElement.appendChild(slidenav);
        }
        // Add a live region to announce the slide number when using the previous/next buttons
        var liveregion = document.createElement('div');
        liveregion.setAttribute('aria-live', 'polite');
        liveregion.setAttribute('aria-atomic', 'true');
        liveregion.setAttribute('class', 'liveregion visuallyHidden');
        lightbox.appendChild(liveregion);

        
        // After the slide transitioned, remove the in-transition class, 
        // if focus should be set, set the tabindex attribute to -1 and focus the slide.
        slides[0].parentNode.addEventListener('transitionend', function (event) {
            var slide = event.target;
            removeClass(slide, 'in-transition');
        if (hasClass(slide, 'current')) {
                if (setFocus) {
                    slide.setAttribute('tabindex', '-1');
                    slide.focus();
                    setFocus = false;
                }
            }
        });

        // MOUSE / FOCUS  EVENTS --------------------------------------------------------------------------
        // When the mouse enters the lightbox, suspend the animation.
        lightbox.addEventListener('mouseenter', suspendAnimation);

        // When the mouse leaves the lightbox, and the animation is suspended, start the animation.
        lightbox.addEventListener('mouseleave', function () {
            if (animationSuspended) {
                startAnimation();
            }
        });
        // When the focus enters the lightbox, suspend the animation
        lightbox.addEventListener('focusin', function (event) {
            if (! hasClass(event.target, 'slide')) {
                suspendAnimation();
            }
        });
        // When the focus leaves the lightbox, and the animation is suspended, start the animation
        lightbox.addEventListener('focusout', function (event) {
            if (! hasClass(event.target, 'slide') && animationSuspended) {
                startAnimation();
            }
        });
        // --------------------------------------------------------------------------

        // Set the index to current slide index in gallery
        index = currentGallery.indexOf(currentImg);
        setSlides(index, lightbox, slides);

        // AUTO ANIM ----------------------------------------------------------------
        if (settings.startAnimated) { timer = setTimeout(nextSlide, 5000);}


        // KEYBOARD SUPPORT ----------------------------------------------------------------

        const lightboxFocusableElements = document.querySelectorAll('#lightbox-main-wrapper .btn-next, #lightbox-main-wrapper .btn-prev, #lightbox-main-wrapper .slidenav button ,#lightbox-main-wrapper #closeLightboxBtn');
        console.log('lightboxFousableElements', lightboxFocusableElements);

        const videoNotFocusable = document.querySelector('li.slide video'); // disable focusable video controls IF video = not current slide
        if (videoNotFocusable.classList.contains('current')) { videoNotFocusable.setAttribute('tabindex', '0');} else { videoNotFocusable.setAttribute('tabindex', '-1');} // ---- CHECK 
        
        let slidesAmount = currentGallery.length;

        // add tabindex 0 + keydown event to each focusable element of lightbox
        Array.from(lightboxFocusableElements).forEach(el => { 
            // console.log('EL==', el);
            el.setAttribute('tabindex', '0');
            el.addEventListener('keydown', function(event){  
                if (event.code === 'Enter' || event.code === 'Space') { event.target.click();}

                if (el.getAttribute('data-slide') == slidesAmount-1 ) { // tab on last btn on slidenav  ------- TO REVIEW : add tab goes to 1st 
                    console.log('I AM LAST !');
                }
                if (el.classList.contains('btn-next') || el.classList.contains('btn-prev') ) { 
                    if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') { event.target.click();}
                }
                
            }, false);
        });

    
    } // end of init()

    // SET SLIDE TO CURRENT SLIDE -----------------------------------------------------
    function setSlides(new_current, lightbox, setFocusHere, transition, announceItemHere) {
        // Focus, transition and announce Item are optional parameters.
        // focus denotes if the focus should be set after the lightbox advanced to slide number new_current.
        // transition denotes if the transition is going into the next or previous direction.
        // If announceItem is set to true, the live region’s text is changed (and announced)

        // Here defaults are set:
        setFocus = typeof setFocusHere !== 'undefined' ? setFocusHere : false;
        transition = typeof transition !== 'undefined' ? transition : 'none';
        announceItem = typeof announceItemHere !== 'undefined' ? announceItemHere : false;
        
        lightbox = document.querySelector('#lightbox');
        // console.log('SLIDES====', slides); 
        //currentImgId = currentImgId;
        new_current = parseFloat(new_current); 

        var length = slides.length;
        var new_next = new_current + 1;
        var new_prev = new_current - 1;

        // If next slide number = length,  next slide = first one of the slides
        // If  previous slide number < 0,  previous slide = last of the slides
        if (new_next === length) { new_next = 0; } else if (new_prev < 0) { new_prev = length - 1; }


        // RESET SLIDES CLASS --------------------------------------------------------------------------------------------
        for (var i = slides.length - 1; i >= 0; i--) { slides[i].className = 'slide'; }

        // CLASSES UPDATE : Add classes to the previous, next and current slide ------------------------------------------
        slides[new_next].className = 'next slide' + ( (transition == 'next') ? ' in-transition' : '' );
        slides[new_next].setAttribute('aria-hidden', 'true');

        slides[new_prev].className = 'prev slide' + ( (transition == 'prev') ? ' in-transition' : '' );
        slides[new_prev].setAttribute('aria-hidden', 'true');

        slides[new_current].className = 'current slide';
        slides[new_current].removeAttribute('aria-hidden');

        // Update the text in the live region which is then announced by screen readers.
        if (announceItem) {
            lightbox.querySelector('.liveregion').textContent = 'Item ' + ( new_current + 1 ) + ' of ' + slides.length;
        }


        // BTNS UPDATE : Update the buttons in the slider navigation to match the currently displayed item ------------
        if (settings.slidenav) {  // --------- (slidenav true = display list of slides)
            var buttons = lightbox.querySelectorAll('.slidenav button[data-slide]');
            for (var j = buttons.length - 1; j >= 0; j--) {
                buttons[j].className = '';
                // eslint-disable-next-line quotes
                buttons[j].innerHTML = `<span class="visuallyHidden"></span> ` + ( j + 1 );  // ------- TO REVIEW : images titles should be displayed
            }
            buttons[new_current].className = 'current';

            buttons[new_current].innerHTML = 
                `
                    <span class="visuallyHidden"></span> 
                    ` 
                    + ( new_current + 1 ) 
                    + 
                    `
                    <span class="visuallyHidden">(Current Item)</span>
                `;
        }
        // global index = new current value
        index = new_current;
    } 
    // ( end of setSlides function )


    // GO TO NEXT SLIDE -----------------------------------------------------------------------------
    function nextSlide(announceItem) {
        announceItem = typeof announceItem !== 'undefined' ? announceItem : false;
        var length = slides.length,
            new_current = index + 1;

        if (new_current === length) {  new_current = 0;  }

        // If we advance to the next slide, the previous needs to be visible to the user, so the third parameter is 'prev', not next.
        setSlides(new_current, false, 'prev', announceItem);

        // If lightbox = animated, go to next slide after 5s
        if (settings.animate) { timer = setTimeout(nextSlide, 5000); }
    }

    // GO BACK TO PREVIOUS ----------------------------------------------------------------------------
    function prevSlide(announceItem) {
        announceItem = typeof announceItem !== 'undefined' ? announceItem : false;
        var length = slides.length,
            new_current = index - 1;

        // If we are already on the first slide, show the last slide instead.
        if (new_current < 0) { new_current = length - 1; }

        // If we advance to the previous slide, the next needs to be visible to the user, so the third parameter is 'next', not prev.
        setSlides(new_current, false, 'next', announceItem);
    }

    // STOP ANIM ----------------------------------------------------------------------------------------
    function stopAnimation(lightbox) {
        lightbox = document.querySelector('#lightbox');
        clearTimeout(timer);
        settings.animate = false;
        animationSuspended = false; // -------------------------- true?
        _this = lightbox.querySelector('[data-action]');
        // eslint-disable-next-line quotes
        _this.innerHTML = `<span class="visuallyHidden">Start Animation </span>▶`;
        _this.setAttribute('data-action', 'start');
    }

    // START ANIM ----------------------------------------------------------------------------------------
    function startAnimation(lightbox) {
        lightbox = document.querySelector('#lightbox');
        settings.animate = true;
        animationSuspended = false;
        timer = setTimeout(nextSlide, 5000);
        _this = lightbox.querySelector('[data-action]');
        // eslint-disable-next-line quotes
        _this.innerHTML = `<span class="visuallyHidden">Stop Animation </span>￭`;
        _this.setAttribute('data-action', 'stop');
    }

    // PAUSE ANIM ----------------------------------------------------------------------------------------
    function suspendAnimation() {
        if (settings.animate) {
            clearTimeout(timer);
            settings.animate = false;
            animationSuspended = true;
        }
    }

    // Making some functions public
    return {
        init: init,
        next: nextSlide,
        prev: prevSlide,
        goto: setSlides,
        stop: stopAnimation,
        start: startAnimation
    };
});





// FINAL HTML RESULT SHOULD LOOK LIKE SO:

/* <div id="lightbox" class="active lightbox with-slidenav">

    <ul class="lightbox-images">
        <li class="current slide"  style="background-image: url('../../img/ex-teddy2-aedbb01f.jpg');"></li>
        <li class="next slide" tabindex="-1" aria-hidden="true"><img></li>
        <li class="prev slide" tabindex="-1" aria-hidden="true"><img></li>
    </ul>

    <ul class="controls">
        <li><button type="button" class="btn-prev"><icon left></button> </li>
        <li><button type="button" class="btn-next"><icon right></button></li>
    </ul>

    <ul class="slidenav">
        <li>
            <button data-action="start">
                <span class="visuallyHidden">Start Animation </span>▶</button>
        </li>
        <li>
            <button class="current" data-slide="0">
                <span class="visuallyHidden">PIC NAME</span> 1 <span class="visuallyHidden">(Current Item)</span>
            </button>
        </li>
        <li>
            <button data-slide="1" class="">
                <span class="visuallyHidden">PIC NAME</span> 2</button></li>
        <li>
            <button data-slide="2" class=""><span class="visuallyHidden">PIC NAME</span> 3</button>
        </li>
    </ul>

    <div aria-live="polite" aria-atomic="true" class="liveregion visuallyHidden"></div>
    
</div> */

// COMPATIBILITY ENHANCER ===> NOT NECESSARY WITH WEBPACK -----------------------------------------------------
/* !function () {   // syntax = short-hand or alternative of self-invoking anonymous function IIFE
    var w = window,
        d = w.document;

    if (w.onfocusin === undefined) {
        d.addEventListener('focus', addPolyfill, true);
        d.addEventListener('blur', addPolyfill, true);
        d.addEventListener('focusin', removePolyfill, true);
        d.addEventListener('focusout', removePolyfill, true);
    }
    function addPolyfill(e) {
        var type = e.type === 'focus' ? 'focusin' : 'focusout';
        var event = new CustomEvent(type, {
            bubbles: true,
            cancelable: false
        });
        event.c1Generated = true;
        e.target.dispatchEvent(event);
    }
    function removePolyfill(e) {
        if (! e.c1Generated) { // focus after focusin, so chrome will the first time trigger tow times focusin
            d.removeEventListener('focus', addPolyfill, true);
            d.removeEventListener('blur', addPolyfill, true);
            d.removeEventListener('focusin', removePolyfill, true);
            d.removeEventListener('focusout', removePolyfill, true);
        }
        setTimeout(function () {
            d.removeEventListener('focusin', removePolyfill, true);
            d.removeEventListener('focusout', removePolyfill, true);
        });
    }
}(); */
// ----------------------------------------------------------------------------------------------------------

