// PHOTOGRAPHER CUSTOM HTML ELEMENT

class Photographer extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // create component main container
        const photographerWrapper = document.createElement('div');

        // retrieve data
        const photographerName = 'test'

        photographerWrapper.setAttribute('class', 'photographer photographer--home');
        photographerWrapper.setAttribute('id', 'photographer-'+ photographerName); // + name

        photographerWrapper.setAttribute('aria-label', photographerName + ' presentation');

        // Attach the created elements to the shadow dom
        shadow.appendChild(photographerWrapper);

    }
}


// register custom element in the built-in CustomElementRegistry object
customElements.define('photographer-component', Photographer);