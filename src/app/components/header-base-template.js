/*         

<div class="header-wrapper">
    <header class="header" role="banner" id="header">
        <div class="header__logo-wrapper">
            <a href="/" aria-label="Fisheye Home page"><img src="./assets/logo/logo.png" alt="Fisheye logo"></a>
        </div>
    </header>
</div> 

*/

/* ================================================== */
/* BASE TEMPLATE CONTEXT FOR HEADER */
/* ================================================== */

export class HeaderBaseTemplate extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = 
        `
        <div class="header-wrapper">
            <header class="header" role="banner" id="header">
                <div class="header__logo-wrapper">
                    <a href="/" aria-label="Fisheye Home page"><img src="./assets/logo/logo.png" alt="Fisheye logo"></a>
                </div>
            </header>
        </div> 

        `;

        // link component to main stylesheet
        const headerStyle = document.createElement('link');
        headerStyle.setAttribute('href', './main.css');
        headerStyle.setAttribute('type', 'text/css');
        headerStyle.setAttribute('rel', 'stylesheet');

        this.appendChild(headerStyle);
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('header-template-component', HeaderBaseTemplate);
