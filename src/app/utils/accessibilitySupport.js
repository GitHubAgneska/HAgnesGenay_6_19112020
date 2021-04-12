

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
Left: 37
Up: 38
Right: 39
Down: 40 */


