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
                <div id="header__logo-wrapper" class="header__logo-wrapper" tabindex="0">
                    <a href="" aria-label="Fisheye Home page"><img src="./assets/logo/logo.png" alt="Fisheye logo"></a>
                </div>
            </header>
        </div> 
        `;

        // KEYBOARD NAV SUPPORT
        const logoDiv = this.querySelector('#header__logo-wrapper');
        logoDiv.addEventListener('focus', function(event){
            let logo = event.target;
            if (logo == document.activeElement) {
                logo.addEventListener('keydown', function(event){
                    // on logo press enter =>  = click() child a
                    if ( event.keyCode === 13 ) {
                        logo.firstElementChild.click();}
                }, false);
            }
        }, false)
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('header-template-component', HeaderBaseTemplate);
