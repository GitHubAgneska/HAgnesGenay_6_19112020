/* ================================================== */
/* PAGE TEMPLATE FOR ANY 'MAIN' CONTENT TO BE HOSTED  */
/* ================================================== */
// the process using params to generate a specific page view
// does not work atm, so instead, using custom components
// specific to views

/* ================================================== */
/* BASE TEMPLATE CONTEXT FOR HOME PAGE */
/* ================================================== */
export class homePageTemplate extends HTMLElement {
    constructor() { // constructor(pageType) {
        super();

        // generate 'main'
        const main = document.createElement('main');
        this.appendChild(main);

        // const pageRequest = pageType;  // ----- + if (type..) Wont work atm ?
        // console.log('pagerequest==', pageRequest);

        main.setAttribute('id', 'homepage-content');
        main.setAttribute('class', 'homepage-content');

        // set static base content for main
        main.innerHTML = `
            <div class="homepage-title">
                <h1>Nos photographes</h1>
            </div>

            <section class="photographers" id="photographersList" aria-label="Photographers presentation list">
            </section>

            <div class="nav-help visuallyHidden" id="nav-help" tabindex="0" role="navigation">
                <a aria-label="go to main content"><span>passer au contenu</span></a>
            </div>
        `;

        const navHelp = main.querySelector('#nav-help');

        // KEYBOARD NAV SUPPORT
        navHelp.addEventListener('focus', function(event){
            let help = event.target;
            if ( help == document.activeElement) {
                help.classList.toggle('visuallyHidden');
            }
        }, false);

        // As kb nav arrives on section, ENTER redirects focus on first tabbable child
        const mainSection = main.querySelector('#photographersList');
        mainSection.addEventListener('keydown', function(event){
            let firstChild = this.firstElementChild;
            firstChild = event.target;
            if (event.key === 'Tab' || event.key === 'Enter') {
                this.blur();
                firstChild.focus();
            }
        }, false);


        /*  
       if (pageRequest === 'photographerPage') {   // ----- + if (type..) Wont work atm ?
            main.setAttribute('id', 'photographer-content');
            main.setAttribute('class', 'photographer-content-wrapper');

            // set static base content for main
            main.innerHTML = `
                <div id="photographer-content" class="photographer-content-wrapper"></div>
            `;
        } */
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('page-template-component', homePageTemplate);



/* ================================================== */
/* BASE TEMPLATE CONTEXT FOR PHOTOGRAPHER PAGE */
/* ================================================== */
export class PagePhotogTemplateBase extends HTMLElement {

    constructor() { // constructor(pageType) {
        super();

        // generate 'main'
        const main = document.createElement('main');
        this.appendChild(main);

        // const pageRequest = pageType;  // ----- + if (type..) Wont work atm ?
        // console.log('pagerequest==', pageRequest);

        main.setAttribute('id', 'photographer-content');
        main.setAttribute('class', 'photographer-content-wrapper');
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('photogpage-template-component', PagePhotogTemplateBase);
