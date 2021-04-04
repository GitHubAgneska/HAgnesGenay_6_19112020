
// code chunk adapted from:   https://www.w3.org/WAI/tutorials/lightboxs/full-code/
// Focusin/out event polyfill (for Firefox) by nuxodin
// Source: https://gist.github.com/nuxodin/9250e56a3ce6c0446efa
// lightbox Prototype Eric Eggert for W3C


!function () {
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
}();





export const Lightbox = (function () {

    "use strict"; // code should be executed in "strict mode"- you can not, for example, use undeclared variables

    // Initial variables
    var lightbox, index, slidenav, slides, settings, timer, setFocus, animationSuspended, announceItem, _this;
    var currentImg; var currentGallery;

    //HELPER FUNCTIONS
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
    // Possible settings:
    // -----------------
    // - id <string> ID of the lightbox wrapper element (required).
    // - slidenav <bool> If true, a list of slides is shown.
    // - animate <bool> If true, the slides can be animated.
    // - startAnimated <bool> If true, the animation begins immediately.
    //                        If false, the animation needs to be initiated by clicking the play button.

    function init(set) { // Make settings available to all functions
        settings = set;
        currentImg = settings.currentImg ;
        currentGallery = settings.currentGallery ;

        // generate LIGHTBOX WRAPPER ========================================
        const lightboxWrapper = document.createElement('div');
        lightboxWrapper.setAttribute('class', 'lightbox__main-wrapper');

        // lightbox style
        const lightboxStyle = document.createElement('link');
        lightboxStyle.setAttribute('href', './main.css');
        lightboxStyle.setAttribute('rel', 'stylesheet');
        lightboxStyle.setAttribute('type', 'text/css');

        
        // generate LIGHTBOX  ========================================
        const lightbox = document.createElement('div');
        lightbox.setAttribute('id', 'lightbox');
        lightbox.setAttribute('class', 'active lightbox with-slidenav');
        
        // attach lightbox to its main wrapper
        lightboxWrapper.appendChild(lightbox);
        
        // append lightbox main wrapper to body
        document.body.appendChild(lightboxWrapper);


        // HERE : generate first ul, injecting data from json as bg images into li elements
        // --------------------------------------------------------------------------------
        var firstUl = document.createElement('ul');

        // for each image of gallery, generate a li element with bg img + class .slide
        currentGallery.forEach(pic => {
            var liItem = document.createElement('li');
            liItem.className = 'slide';
            var url = pic.url;
            liItem.setAttribute('style', 'background-image:url(' + url + ')');
            firstUl.appendChild(liItem); // attach li element to ul
        });

        lightbox.appendChild(firstUl);
        slides = lightbox.querySelectorAll('.slide');


        // CONTROLS : second ul -------------------------------------------------------------------
        var ctrls = document.createElement('ul');
        ctrls.className = 'controls';
        ctrls.innerHTML = 
            `<li>
                <button type="button" class="btn-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
            </li> 
            <li>
                <button type="button" class="btn-next"><i class="fa fa-chevron-right" aria-hidden="true"></button>
            </li>
            `;
        
        // attach click events to btns
        ctrls.querySelector('.btn-prev').addEventListener('click', function () { prevSlide(true); });
        ctrls.querySelector('.btn-next').addEventListener('click', function () { nextSlide(true); });
        lightbox.appendChild(ctrls);
        // ---------------------------------------------------------------------------------


        // GENERATE UL ELEMENTS for accessibility : third ul --------------------------------------------------------------------------- 
        // start/pause lightbox / pictures indexes to navigate manually + check current active pic 
        if (settings.slidenav || settings.animate) {   // If lightbox 'animated' or 'slide navigation' = requested in settings

            // another unordered list that contains those elements is added.
            slidenav = document.createElement('ul'); // settings.slidenav = true : 'list of slides is shown.'
            slidenav.className = 'slidenav';

            if (settings.animate) {  // 'If true, the slides can be animated.'

                forEachElement(slides, function (el, i) {  // for each li element created with bg image
                    var li = document.createElement('li');
                    if (settings.startAnimated) {
                        li.innerHTML = '<button data-action="stop"><span class="visuallyhidden">Stop Animation </span>￭</button>';
                    } else {
                        li.innerHTML = '<button data-action="start"><span class="visuallyhidden">Start Animation </span>▶</button>';
                    }
                    slidenav.appendChild(li);
                    }
                )}

            if (settings.slidenav) { // settings.slidenav = true : list of slides is shown.

                forEachElement(slides, function (el, i) {  // for each li element created with bg image
                    var li = document.createElement('li');
                    var klass = (i === 0) ? 'class="current" ' : '';
                    var kurrent = (i === 0) ? ' <span class="visuallyhidden">(Current Item)</span>' : '';

                    li.innerHTML = // ----------------------- list should only display picture name/title
                        `<button ` + klass + `data-slide="` + i + `"><span class="visuallyhidden">PLACEHOLDER</span>` + ( i + 1 ) + kurrent + `</button>`;

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
                    } else if (button.getAttribute('data-action') == "stop") {
                        stopAnimation();
                    } else if (button.getAttribute('data-action') == "start") {
                        startAnimation();
                    }
                }
            }, true);

            lightbox.className = 'active lightbox with-slidenav';
            lightbox.appendChild(slidenav);
        }

        // Add a live region to announce the slide number when using the previous/next buttons ----- use?
        var liveregion = document.createElement('div');
        liveregion.setAttribute('aria-live', 'polite');
        liveregion.setAttribute('aria-atomic', 'true');
        liveregion.setAttribute('class', 'liveregion visuallyhidden');
        lightbox.appendChild(liveregion);

        
        slides = lightbox.querySelectorAll('.slide'); // necessary to redefine --- ?
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
        lightbox.addEventListener('mouseleave', function (event) {
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

        // Set the index (=current slide) to 0 – the first slide
        index = 0;
        setSlides(index);

        // AUTO ANIM ----------------------------------------------------------------
        if (settings.startAnimated) {
            timer = setTimeout(nextSlide, 5000);
        }
    }

    // SET SLIDE TO CURRENT SLIDE -----------------------------------------------------
    function setSlides(new_current, setFocusHere, transition, announceItemHere) {
        // Focus, transition and announce Item are optional parameters.
        // focus denotes if the focus should be set after the lightbox advanced to slide number new_current.
        // transition denotes if the transition is going into the next or previous direction.
        // If announceItem is set to true, the live region’s text is changed (and announced)
        // Here defaults are set:

        setFocus = typeof setFocusHere !== 'undefined' ? setFocusHere : false;
        transition = typeof transition !== 'undefined' ? transition : 'none';
        announceItem = typeof announceItemHere !== 'undefined' ? announceItemHere : false;

        new_current = parseFloat(new_current);

        var length = slides.length;
        var new_next = new_current + 1;
        var new_prev = new_current - 1;

        // If next slide number = length,  next slide = first one of the slides
        // If  previous slide number < 0,  previous slide = last of the slides
        if (new_next === length) { 
            new_next = 0;
            } else if (new_prev < 0) { new_prev = length - 1; }


        // RESET SLIDES CLASS ----------------
        for (var i = slides.length - 1; i >= 0; i--) {
            slides[i].className = "slide";
        }

        // CLASSES UPDATE : Add classes to the previous, next and current slide ------------------------------------------
        slides[new_next].className = 'next slide' + ( (transition == 'next') ? ' in-transition' : '' );
        slides[new_next].setAttribute('aria-hidden', 'true');

        slides[new_prev].className = 'prev slide' + ( (transition == 'prev') ? ' in-transition' : '' );
        slides[new_prev].setAttribute('aria-hidden', 'true');

        slides[new_current].className = 'current slide';
        slides[new_current].removeAttribute('aria-hidden');

        // Update the text in the live region which is then announced by screen readers.
        if (announceItem) {
            lightbox.querySelector('.liveregion').textContent = 'Item ' + (
                new_current + 1
            ) + ' of ' + slides.length;
        }


        // BTNS UPDATE : Update the buttons in the slider navigation to match the currently displayed item ------------
        if (settings.slidenav) {  // --------- (slidenav true = display list of slides)
            var buttons = lightbox.querySelectorAll('.slidenav button[data-slide]');
            for (var j = buttons.length - 1; j >= 0; j--) {
                buttons[j].className = '';
                buttons[j].innerHTML = `<span class="visuallyhidden">PLACEHOLDER</span> ` + ( j + 1 );
            }
            buttons[new_current].className = "current";
            buttons[new_current].innerHTML = `<span class="visuallyhidden">PLACEHOLDER</span> ` 
            + ( new_current + 1 ) 
            + ` <span class="visuallyhidden">(Current Item)</span>`;
        }

        // global index = new current value
        index = new_current;

    } // ( end of setSlides function )


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
    function stopAnimation() {
        clearTimeout(timer);
        settings.animate = false;
        animationSuspended = false; // -------------------------- true?
        _this = lightbox.querySelector('[data-action]');
        _this.innerHTML = `<span class="visuallyhidden">Start Animation </span>▶`;
        _this.setAttribute('data-action', 'start');
    }

    // START ANIM ----------------------------------------------------------------------------------------
    function startAnimation() {
        settings.animate = true;
        animationSuspended = false;
        timer = setTimeout(nextSlide, 5000);
        _this = lightbox.querySelector('[data-action]');
        _this.innerHTML = `<span class="visuallyhidden">Stop Animation </span>￭`;
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

/* <div id="c" class="active lightbox with-slidenav">

    <ul>
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
                <span class="visuallyhidden">Start Animation </span>▶</button>
        </li>
        <li>
            <button class="current" data-slide="0">
                <span class="visuallyhidden">PIC NAME</span> 1 <span class="visuallyhidden">(Current Item)</span>
            </button>
        </li>
        <li>
            <button data-slide="1" class="">
                <span class="visuallyhidden">PIC NAME</span> 2</button></li>
        <li>
            <button data-slide="2" class=""><span class="visuallyhidden">PIC NAME</span> 3</button>
        </li>
    </ul>

    <div aria-live="polite" aria-atomic="true" class="liveregion visuallyhidden"></div>
    
</div> */

