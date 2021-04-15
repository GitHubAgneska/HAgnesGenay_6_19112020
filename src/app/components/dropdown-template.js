
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

        let currentTitle = 'popularité';

        // set dropdow wrapper content
        dropdownWrapper.innerHTML = 
            ` <p class="dropdown-menu-title">trier par</p>

                <div tabindex="0" id="dropdown-menu" class="dropdown-menu hide" aria-label="sort gallery by">
                    <button type="button" tabindex="4" id="sortBy-likes" class="open-dropdown-btn" aria-haspopup="listbox" aria-labelledby="sortBy-likes-btn">
                        ${currentTitle}
                    </button> 
                    <img tabindex="1" id="open" src="./assets/icons/caret.png" alt="logo open" aria-hidden="true">
                    <ul id="sortBy" role="listbox" aria-labelledby="sortBy">
                        <li tabindex="2" id="sortBy-date" role="option">date</li>
                        <li tabindex="3" id="sortBy-title" role="option">titre</li>
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
            let btnToUpdate = caret.parentNode.firstElementChild;
            let targetedElement = event.target.parentNode; // div parent
            
            if ( targetedElement.classList.contains('hide') ){
                targetedElement.classList.remove('hide');
                dropdownOpen = true;
                console.log('dropdownOpen==', dropdownOpen);
                caret.classList.add('down'); // caret points downwards when dropdown is open
            
            } else if ( !targetedElement.classList.contains('hide') ) {
                targetedElement.classList.add('hide');

                dropdownOpen = false;
                console.log('dropdownOpen==', dropdownOpen);
                sortByLikesBtn.textContent = currentTitle;
                caret.classList.remove('down'); // caret points upwards when dropdown is closed
            }
        }

        function updateBtnSortTerm(currentTitle) {
            sortByLikesBtn.textContent = currentTitle;
        }


        const photographerGalleryBlock = document.querySelector('.gallery-wrapper');
        
        sortByDateBtn.addEventListener('click', function(event){ 
            let type = 'date';
            currentTitle = type;
            photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type);
        }, false);

        sortByTitleBtn.addEventListener('click', function(event){ 
            let type = 'title';
            currentTitle = type;
            photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type);}, false);

        sortByLikesBtn.addEventListener('click', function(event){ 
            let btn = event.currentTarget;
            let type = 'likes';
            currentTitle ='popularité';
            photographerPageModule.renderSortedView(photographerGalleryBlock, photog, type);}, false );
                    

        this.appendChild(dropdownWrapper);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('dropdown-component', DropdownTemplate);
