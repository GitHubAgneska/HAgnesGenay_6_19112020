
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

        let currentTitle = 'popularité';

        // set dropdow wrapper content
        dropdownWrapper.innerHTML = 
            ` <p class="dropdown-menu-title">trier par</p>

                <div tabindex="0" id="dropdown-menu" class="dropdown-menu hide" aria-label="sort gallery by">
                    <button type="button" tabindex="0" id="sortBy-likes" class="open-dropdown-btn" aria-haspopup="listbox" aria-labelledby="sortBylikes button">
                        ${currentTitle}
                    </button> 
                    <img tabindex="3" id="open" src="./assets/icons/caret.png" alt="logo open" alt="open menu logo">
                    <ul id="sortBy" role="listbox" aria-labelledby="sortBy">
                        <li tabindex="4" id="sortBy-date" role="option">date</li>
                        <li tabindex="5" id="sortBy-title" role="option">titre</li>
                    </ul>
                </div>
            `;

        const dropdownMenu = dropdownWrapper.querySelector('#dropdown-menu');
        let dropdownOpen = false; // default
        
        const sortByLikesBtn = dropdownWrapper.querySelector('#sortBy-likes');
        const sortByDateBtn = dropdownWrapper.querySelector('#sortBy-date');
        const sortByTitleBtn = dropdownWrapper.querySelector('#sortBy-title');

        // events for btns
        const toggleOpenBtn = dropdownWrapper.querySelector('#open'); // CARET
        toggleOpenBtn.addEventListener('click' , function(event){ toggleDropdown(event, currentTitle);}, false);// CARET event toggle menu
        
        
        // open/close Dropdown
        function toggleDropdown(event, currentTitle){

            let caret = event.target;
            let targetedElement = event.target.parentNode; // div parent
            
            if ( targetedElement.classList.contains('hide') ){
                targetedElement.classList.remove('hide');
                dropdownOpen = true;
                currentTitle = 'popularité';
                sortByLikesBtn.textContent = currentTitle; // update btn title
                console.log('dropdownOpen==', dropdownOpen);
                caret.classList.add('down'); // caret points downwards when dropdown is open
            
            } else if ( !targetedElement.classList.contains('hide') ) {
                targetedElement.classList.add('hide');
                dropdownOpen = false;
                console.log('dropdownOpen==', dropdownOpen);
                sortByLikesBtn.textContent = currentTitle; // update btn title
                caret.classList.remove('down'); // caret points upwards when dropdown is closed
            }
        }

        const photographerGalleryBlock = document.querySelector('.gallery-wrapper');
        
        sortByDateBtn.addEventListener('click', function(){ 
            let type = 'date';
            currentTitle = type;
            photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type);
        }, false);

        sortByTitleBtn.addEventListener('click', function(){ 
            let type = 'title';
            currentTitle = type;
            photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type);}, false);

        sortByLikesBtn.addEventListener('click', function(){ 
            let type = 'likes';
            currentTitle ='popularité';
            photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type);}, false );


        // KEYBOARD NAV SUPPORT
        // DROPDOWN FOCUS is default when tabbing nav
        dropdownMenu.addEventListener('keydown' , function(event){
            if ( event.code === 'Enter'|| event.code === 'Space') {

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

            if ( event.code === 'Escape' ) {
                this.blur();
                this.parentNode.focus();
                toggleOpenBtn.click();
            }
        }, false);

        this.appendChild(dropdownWrapper);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('dropdown-component', DropdownTemplate);
