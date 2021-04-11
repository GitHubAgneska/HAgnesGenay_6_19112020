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
    constructor(page) {
    // constructor(page) {
        super();

        page = page;

        this.innerHTML = 
        `
        <div id="header-wrapper" class="header-wrapper">
            <header class="header" role="banner" id="header">
                <div class="header__logo-wrapper">
                    <a href="/" aria-label="Fisheye Home page"><img src="./assets/logo/logo.png" alt="Fisheye logo"></a>
                </div>
            </header>
        </div> 
        `;

       /*  const wrapper = this.querySelector('#header-wrapper');
        if (page === 'home') { wrapper.setAttribute('class', 'header-wrapper home')}
        if (page === 'photogPage') { wrapper.setAttribute('class', 'header-wrapper page')} */
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('header-template-component', HeaderBaseTemplate);
