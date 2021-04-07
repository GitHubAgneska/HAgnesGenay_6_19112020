/* ================================================== */
/* PAGE TEMPLATE FOR ANY 'MAIN' CONTENT TO BE HOSTED  */
/* ================================================== */


/* BASE TEMPLATE CONTEXT FOR HOME PAGE */
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

            <section class="photographers" id="photographersList" aria-label="photographers presentation list">

            </section>

            <div class="nav-help" id="nav-help">
                <a href="" aria-label="go to main content"><span>passer au contenu</span></a>
            </div>
        `;

        // link component to main stylesheet
        const pageStyle = document.createElement('link');
        pageStyle.setAttribute('href', './main.css');
        pageStyle.setAttribute('type', 'text/css');
        pageStyle.setAttribute('rel', 'stylesheet');


       /*  if (pageRequest === 'photographerPage') {   // ----- + if (type..) Wont work atm ?
            main.setAttribute('id', 'photographer-content');
            main.setAttribute('class', 'photographer-content-wrapper');

            // set static base content for main
            main.innerHTML = `
                <div id="photographer-content" class="photographer-content-wrapper"></div>
            `;
        } */
        // attach style to main
        main.appendChild(pageStyle);
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('page-template-component', homePageTemplate);


/* BASE TEMPLATE CONTEXT FOR PHOTOGRAPHER PAGE */
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

        // set static base content for main
        main.innerHTML = `
            <div id="photographer-content" class="photographer-content-wrapper"></div>
        `;

        // link component to main stylesheet
        const pageStyle = document.createElement('link');
        pageStyle.setAttribute('href', './main.css');
        pageStyle.setAttribute('type', 'text/css');
        pageStyle.setAttribute('rel', 'stylesheet');

        // attach style to main
        main.appendChild(pageStyle);
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('photogpage-template-component', PagePhotogTemplateBase);
