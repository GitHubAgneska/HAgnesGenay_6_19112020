
// document.activeElement = who has focus currently

// KEYBOARD NAV SUPPORT : before modal/confirmbox/lightbox/ open : all bg tabindex = -1
export function disableAllBgElements(bgTabbables){
    for (let node of bgTabbables) {
        if ( node.nodeName!== '#text' ) { 
            node.setAttribute('tabindex', '-1');
            node.setAttribute('isBgInactive', '');
        }
    }
}
export function enableAllBgElements(){
    let toReactivate = document.querySelectorAll('[isBgInactive]');
    for (let node of toReactivate) {
        if ( node.nodeName!== '#text' ) { 
            node.setAttribute('tabindex', '0');
            node.removeAttribute('isBgInactive', '');
        }
    }
}

// 'undirectAction' : tab focus on DIV parent =>  delegate focus and action to first child element
// 'directAction' : tab focus on element 
// export function keyAction(elem, actionType) {
export function keyAction(elem) {
    let el = elem;
    // let action = actionType;
    // let targetElem;
    el.addEventListener('keydown', function(event) {
        el = event.target;
        // console.log('concerned==', el);

        /* if ( action === 'undirectAction') {
            if ( event.key === 13 || event.key === 'Space') {
                let targetElem = event.target.firstElementChild;
                // targetElem = document.activeElement;
                targetElem.focus();
                keyAction(this, 'directAction');
            }
        }
        if ( action === 'directAction' ) { */
            // if elem press ENTER or SPACE =>  = click()
            if ( event.key === 'Enter' || event.key === 'Space') {
                el.click();
            }
            
            // if elem press RIGHT or DOWN => focus moves onto nextelem + listen to key
            if ( event.key === 'ArrowRight' || event.key === 'ArrowDown' ) { 
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
            if ( event.key === 'ArrowLeft' || event.key === 'ArrowUp' ) {
                if (el.previousElementSibling && el.previousElementSibling !== null) { // check the element exists
                    el.previousElementSibling.focus();
                    keyAction(el.previousElementSibling); 
                } else { // if no next sibling > focus goes back to parent
                    event.preventDefault(); // which is whole page scrolling ---- TO REVIEW : has any effect? + bg elements events = disabled anyway
                    el.blur();
                    el.parentNode.focus(); }
            }

            // if elem press LEFT => focus moves onto nextelem + listen to key
            if ( event.key === 'Escape' ) {
                el.parentNode.focus();
                // console.log('ESCAPED!');
            }
       //  }
    }, false);
}

