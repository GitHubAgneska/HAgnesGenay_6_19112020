

export class DropdownTemplate extends HTMLElement {
    constructor() {
        super();

        // link component to main stylesheet
        const dropdownStyle = document.createElement('link');
        dropdownStyle.setAttribute('type', 'text/css');
        dropdownStyle.setAttribute('href', './main.css');

        // create a shadow root
        const shadow3 = this.attachShadow({mode: 'open'});

        // create component main container div
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.setAttribute('class', 'dropdown-wrapper');
        dropdownWrapper.setAttribute('aria-label', 'dropdown navigation container');

        // set dropdow wrapper content
        dropdownWrapper.innerHTML = `
        
        <p class="dropdown-menu-title">trier par</p>
        <nav class="gallery-nav" id="gallery-nav" aria-label="gallery navigation">
            <ul id="menubar" role="menubar" aria-label="gallery navigation">
                <li>
                    <a role="menuitem" aria-haspopup="true" aria-expanded="false" href="" tabindex="0">popularité</a>
                </li>
                <li>
                    <a role="menuitem" aria-haspopup="true" aria-expanded="false" href="" tabindex="0">date</a>
                </li>
                <li>
                    <a role="menuitem" aria-haspopup="true" aria-expanded="false" href="" tabindex="0">titre</a>
                </li>
            </ul>
        </nav>
        `;

        // Attach stylesheet to component
        shadow3.appendChild(dropdownStyle);
        // Attach the created elements to the shadow dom
        shadow3.appendChild(dropdownWrapper);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('dropdown-component', DropdownTemplate);
