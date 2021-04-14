
import { photographerPageModule } from '../modules/photographerPageModule';
import { keyAction } from '../utils/accessibilitySupport';

export class DropdownTemplate extends HTMLElement {
    constructor(photog) {
        super();

        this.photog = photog;

        // create component main container div
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.setAttribute('class', 'listbox-area');
        dropdownWrapper.setAttribute('aria-label', 'dropdown navigation container');

        // link component to main stylesheet
        const dropdownStyle = document.createElement('link');
        dropdownStyle.setAttribute('href', './main.css');
        dropdownStyle.setAttribute('type', 'text/css');
        dropdownStyle.setAttribute('rel', 'stylesheet');

        // set dropdow wrapper content
        dropdownWrapper.innerHTML = `
        
            <p class="dropdown-menu-title">trier par</p>

            <div tabindex="0" id="dropdown-menu" class="dropdown-menu hide" aria-label="sort gallery by">
                <button id="sortBy-likes" class="open-dropdown-btn" aria-haspopup="listbox" aria-labelledby="sortBy-likes-btn">
                    popularité
                    <img tabindex="1" id="open" src="./assets/icons/caret.png" alt="logo open" aria-hidden="true">
                </button> 
                <ul id="sortBy" role="listbox" aria-labelledby="sortBy">
                    <li tabindex="2" id="sortBy-date" role="option">date</li>
                    <li tabindex="3" id="sortBy-title" role="option">titre</li>
                </ul>
            </div>
        `;

        // events for btns
        const toggleOpenBtn = dropdownWrapper.querySelector('#open');
        toggleOpenBtn.addEventListener('click' , function(event){ toggleDropdownOpen(event);}, false);
        
        function toggleDropdownOpen(event){ 
            let targetedElement = event.target.parentNode.parentNode; // event on CARET logo img -> effect on div parent
            targetedElement.classList.toggle('hide');
            console.log('ACTIVE HERE ==', document.activeElement); // keyboard check
        }
        
        const sortByDateBtn = dropdownWrapper.querySelector('#sortBy-date');
        const sortByTitleBtn = dropdownWrapper.querySelector('#sortBy-title');
        const sortByLikesBtn = dropdownWrapper.querySelector('#sortBy-likes');
        
        sortByDateBtn.onclick = (event) => {
            console.log('I AM DATE TARGET=', event.target)
            let type = 'date';
            let photographerGalleryBlock = document.querySelector('.gallery-wrapper');
            photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type); }
            
            sortByTitleBtn.onclick = () => { 
                let type = 'title';
                let photographerGalleryBlock = document.querySelector('.gallery-wrapper');
                photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type); }
                
                sortByLikesBtn.onclick = () => { 
                    let type = 'likes';
                    let photographerGalleryBlock = document.querySelector('.gallery-wrapper');
                    photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type); }
                    
                    
        // KEYBOARD NAV SUPPORT
        // default tab = on dropdown-menu DIV
        const dropdownMenu = dropdownWrapper.querySelector('#dropdown-menu');
        let dropdownOpened = false;
                // elements = 
                    // DIV #dropdown-menu - 1
                        // sortByLikesBtn #sortBy-likes BTN
                            // CARET #open IMG  - 2
                    // ul
                        // sortByDateBtn #sortBy-date LI  - 3
                        // sortByTitleBtn #sortBy-title LI - 4

        // DROPDOWN FOCUS is default when tabbing nav
        dropdownMenu.addEventListener('keydown' , function(event){
            if ( event.code === 'Enter'|| event.code === 'Space') {

                let menuDiv = event.target; // default tabbing on parent
                let caret = document.getElementById('open');
                
                // FOCUS IS ON CARET
                caret.focus(); // focus goes to caret icon
                // pass event to CARET
                caret.addEventListener('keydown', function(event) {
                    caret = event.target;
                    // CARET KEYBOARD ACTIONS
                    // ENTER : open dropdown
                    if ( event.code === 'Enter' || event.code === 'Space') { 
                        caret.click();
                        dropdownOpened = true;
                    }
                    // ONCE DROPDOWN = OPEN
                    // RIGHT or DOWN => focus goes to FIRST LI
                    if ( event.code === 'ArrowRight' || event.code === 'ArrowDown' ) {

                        event.preventDefault(); // which is whole page scrolling
                        let liOne = document.getElementById('sortBy-date');
                        caret.blur(); // ----------------------------------------- THIS ONE !!!
                        
                        liOne.focus();
                        console.log('FOCUS on liOne', document.activeElement);
                        
                        // pass action to LI
                        keyAction(liOne);  
                    }
                }, false);
            }
        }, false);

        this.appendChild(dropdownWrapper);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('dropdown-component', DropdownTemplate);
