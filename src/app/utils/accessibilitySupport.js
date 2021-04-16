

// document.activeElement = who has focus currently

export function focusNextElement() {
    var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
        var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements), function (element) {
            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
        });
        var index = focussable.indexOf(document.activeElement);
        focussable[index + 1].focus();
    }
}

// KEYBOARD NAV SUPPORT : before modal opens, all bg tabindex = -1
export function disableTabBgElements(){
        const root = document.getElementById('root');
        // let tabbables = root.querySelectorAll('[tabindex]');
        let tabbables = root.childNodes;
        console.log(tabbables);
        for (let node of tabbables) {
            if ( node.nodeName!=="#text") { 
                node.setAttribute('tabindex', '-1');
                
            }
        }
}


/* window.addEventListener('keydown', function (event) {
    // initiate navigation by tab keys
    if (event.keyIdentifier = 'Tab') {
            // if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
        if (event.target.nodeName === 'INPUT' && event.target.type !== 'textarea') {
            event.preventDefault();
            focusNextElement();
            return false;
        }
    }
    // activate tabbable elements via the Enter/Return key
    if ( event.keyIdentifier === 13 ) { // The Enter/Return key
            document.activeElement.click();
        }

}, true);  */



/*
event.keyIdentifier === 'Space'
event.key === 13
Left: 37
Up: 38
Right: 39
Down: 40 */



// 'undirectAction' : tab focus on DIV parent =>  delegate focus and action to first child element
// 'directAction' : tab focus on element 
// export function keyAction(elem, actionType) {
export function keyAction(elem) {
    let el = elem;
    // let action = actionType;
    // let targetElem;
    el.addEventListener('keydown', function(event) {
        el = event.target;
        console.log('concerned==', el);

        /* if ( action === 'undirectAction') {
            if ( event.keyCode === 13 || event.code === 'Space') {
                let targetElem = event.target.firstElementChild;
                // targetElem = document.activeElement;
                targetElem.focus();
                keyAction(this, 'directAction');
            }
        }
        if ( action === 'directAction' ) { */
            // if elem press ENTER or SPACE =>  = click()
            if ( event.code === 'Enter' || event.code === 'Space') {

                el.click();
            }
            
            // if elem press RIGHT or DOWN => focus moves onto nextelem + listen to key
            if ( event.code === 'ArrowRight' || event.code === 'ArrowDown' ) { 
                if (el.nextSibling && el.nextSibling!== null) {  // check the element exists
                    el.blur();
                    // console.log('el.nextSibling==', el.nextElementSibling)
                    el.nextElementSibling.focus();
                    keyAction(el.nextElementSibling); 
                } else { // if no next sibling > focus goes back to parent
                    event.preventDefault(); // which is whole page scrolling
                    el.blur();
                    el.parentNode.focus();
                }
            }

            // if elem press LEFT or UP => focus moves onto nextelem + listen to key
            if ( event.code === 'ArrowLeft' || event.code === 'ArrowUp' ) {
                if (el.previousElementSibling && el.previousElementSibling !== null) { // check the element exists
                    el.previousElementSibling.focus();
                    keyAction(el.previousElementSibling); 
                } else { // if no next sibling > focus goes back to parent
                    event.preventDefault(); // which is whole page scrolling
                    el.blur();
                    el.parentNode.focus(); }
            }

            // if elem press LEFT => focus moves onto nextelem + listen to key
            if ( event.code === 'Escape' ) {
                el.parentNode.focus();
                console.log('ESCAPED!');
            }
       //  }
    }, false);
}

