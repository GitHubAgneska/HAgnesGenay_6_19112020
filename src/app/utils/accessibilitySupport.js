

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
    let concernedElement = elem;
    // let action = actionType;
    // let targetElem;
    concernedElement.addEventListener('keydown', function(event) {
        concernedElement = event.target;
        // console.log('concerned==', concernedElement);
        // console.log('concernedChild==', concernedElement.firstElementChild);
        // console.log('concernedParent==', concernedElement.parentNode);

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
            if ( event.keyCode === 13 || event.code === 'Space') { elem.click(); }
            
            // if elem press RIGHT => focus moves onto nextelem + listen to key
            else if ( event.keyCode === 39 ) { 
                elem.nextSibling.focus();
                keyAction(elem.nextSibling); }

            // if elem press LEFT => focus moves onto nextelem + listen to key
            else if ( event.keyCode === 37 ) { 
                elem.previousSibling.focus();
                keyAction(elem.previousSibling); }

            // if elem press LEFT => focus moves onto nextelem + listen to key
            else if ( event.code === 'Escape' ) { 
                elem.parentNode.focus();
            }
       //  }
    }, false);
}

