
import { photographerPageModule } from '../modules/photographerPageModule';
import { keyAction } from '../utils/accessibilitySupport';

export class DropdownTemplate extends HTMLElement {
    constructor(photog) {
        super();

        this.photog = photog;

        // create a shadow root
        const shadow3 = this.attachShadow({mode: 'open'});

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

            <div tabindex="3" class="dropdown-menu hide" id="dropdown-menu" aria-label="sort gallery by">
                <button id="exp_elem_likes" class="open-dropdown-btn" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button">
                    popularité
                    <img tabindex="4" src="./assets/icons/caret.png" id="open" alt="logo open" aria-hidden="true">
                </button> 
                <ul id="exp-elem-list" role="listbox" aria-labelledby="exp_elem">
                    <li tabindex="4" id="exp_elem_date" role="option">date</li>
                    <li tabindex="5" id="exp_elem_title" role="option">titre</li>
                </ul>
            </div>
        `;

        // events for btns
        const toggleOpenBtn = dropdownWrapper.querySelector('#open');
        toggleOpenBtn.addEventListener('click' , function(event){ toggleDropdownOpen(event);}, false);
        
        function toggleDropdownOpen(event){ 
            let targetedElement = event.target.parentNode.parentNode; // event on logo img -> effect on div parent
            targetedElement.classList.toggle('hide');
        }
        
        const sortByDateBtn = dropdownWrapper.querySelector('#exp_elem_date');
        const sortByTitleBtn = dropdownWrapper.querySelector('#exp_elem_title');
        const sortByLikesBtn = dropdownWrapper.querySelector('#exp_elem_likes');
        
        sortByDateBtn.onclick = () => { 
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
        // elements = DIV#dropdown-menu, CARET #open, 3-BTN#exp_elem_likes btn, 
        // ( #exp-elem-list UL) , #exp_elem_date LI, #exp_elem_title LI

        dropdownMenu.addEventListener('keydown' , function(event){
            toggleOpenBtn.focus(); // focus goes to caret icon
            toggleOpenBtn.addEventListener('keydown', function(event) { // listen to CARET keyboard event
                if ( event.keyCode === 13 || event.code === 'Space') { // if caret ENTER
                    this.click(); // dropdown opens
                    let sortByDate = event.target.parentNode.parentNode.querySelector('ul').firstElementChild; // first LI
                    // console.log('sortbydate==', sortByDate);
                    sortByDate.focus(); // pass action back to parent btn (popularité)
                    
                    sortByDate.addEventListener('focus', function(event){ 
                        sortByDate.style.border = '2px solid white';
                        keyAction(this);
                        // sortByDate.click();
                    }, false);
                }
            }, false);
        }, false);


        // Attach stylesheet to component
        shadow3.appendChild(dropdownStyle);
        // Attach the created elements to the shadow dom
        shadow3.appendChild(dropdownWrapper);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('dropdown-component', DropdownTemplate);
