
import { photographerPageModule } from '../modules/photographerPageModule';

export class DropdownTemplate extends HTMLElement {
    constructor() {
        super();

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
            <div class="dropdown-menu" id="dropdown-menu" aria-label="sort gallery by">
                <button id="toggle-dropdown-btn" class="open-dropdown-btn" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button">
                    popularité
                    <i class="fas fa-angle-down"></i>
                    <i class="fas fa-angle-up"></i>
                </button> 
                <ul id="exp-elem-list" tabindex="-1" role="listbox" aria-labelledby="exp_elem" class="hidden">
                    <li id="exp_elem_date" role="option">date</li>
                    <li id="exp_elem_title" role="option">titre</li>
                </ul>
            </div>
        `;

        // events for btns
        const toggleDropdownBtn = dropdownWrapper.querySelector('#toggle-dropdown-btn');
        toggleDropdownBtn.addEventListener('click', function(event){ toggleDropdown(event);}, false);

        const dropdownList = dropdownWrapper.querySelector('#exp-elem-list');
        
        function toggleDropdown(event){
            console.log(event.target); // = btn
            if ( dropdownList.hasAttribute('style', 'visibility:hidden') ){
                dropdownList.setAttribute('style', 'visibility:visible')
            }
            
        /*  if ( dropdownList.hasAttribute('class', 'hidden') ) {
                dropdownList.removeAttribute('class', 'hidden');
            } else {
                dropdownList.setAttribute('class', 'hidden');
            } */
        }

        const sortByDateBtn = dropdownWrapper.querySelector('#exp_elem_date');
        const sortByTitle = dropdownWrapper.querySelector('#exp_elem_title');

        // sortByDateBtn.onclick = () => { photographerPageModule. }
        




        // Attach stylesheet to component
        shadow3.appendChild(dropdownStyle);
        // Attach the created elements to the shadow dom
        shadow3.appendChild(dropdownWrapper);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('dropdown-component', DropdownTemplate);
