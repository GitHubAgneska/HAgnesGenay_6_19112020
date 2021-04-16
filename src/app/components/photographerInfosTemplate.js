// ----------------------------------------------------
// PHOTOGRAPHER INFOS CUSTOM HTML ELEMENT - PHOTOGRAPHER PAGE
// ----------------------------------------------------
import { NavTags } from './nav-tags';
import { photographerPageModule } from '../modules/photographerPageModule';

export class PhotographerInfosTemplate extends HTMLElement {
    constructor(photog) {
        super();
        // retrieve photographer object from param
        let photographer = photog;
        let modalContactOpen = false;

        // create a shadow root
        // const shadow2 = this.attachShadow({mode: 'open'});

        // INFOS BLOCK ======================================================================
        // create photographer main presentation block (top infos + bottom likes / price)
        const photographerInfosBlock = document.createElement('section');
        // link component to main stylesheet
        const stylePage = document.createElement('link');
        stylePage.setAttribute('rel', 'stylesheet');
        stylePage.setAttribute('href', './main.css');
        stylePage.setAttribute('type', 'text/css');
        
        // set up which photographer is passed as param
        photographerInfosBlock.setAttribute('data', photographer);
        photographerInfosBlock.setAttribute('class', 'photographer photographer--page');
        photographerInfosBlock.setAttribute('id', 'photographer-'+ photographer.name); // + name
        photographerInfosBlock.setAttribute('aria-label', photographer.name + ' presentation');

        photographerInfosBlock.innerHTML = 
            `
                <img class="photographer__pic page" src="./assets/img/portraits/S/${photographer.portrait}" alt="${photographer.name} presentation picture" id="${photographer.name}-pres-picture">
                <div class="photographer__text-infos page">
                    <h1 class="photographer__name page" id="${photographer.name}">${photographer.name}</h1>
                    <button tabindex="2" id="contact-btn" class="main-btn main-btn--contact">contactez-moi</button>
                    <h2 class="photographer__location page" id="${photographer.city}">${photographer.city}, ${photographer.country}</h2>
                    <h3 class="photographer__tagline page" id="${photographer.name}-tagline">${photographer.tagline}</h3>
                </div>
            `;

        // add event on contact btn to call modal contact
        const contactBtn = photographerInfosBlock.querySelector('#contact-btn');

        contactBtn.addEventListener('click', function(){
            photographerPageModule.openContactForm(photographer)
        }, false); //passes current photographer object as param
    

        const whereToStickNavtag = photographerInfosBlock.querySelector('.photographer__text-infos');
        // generate new tagslists custom element template (using Navtags custom html element)
        let parent = 'profile-page';
        let photographerTagsList2 = new NavTags(photographer.tags, parent);
        whereToStickNavtag.appendChild(photographerTagsList2);

        const block2 = document.createElement('div');
        block2.innerHTML =
            `
                <div class="photographer__bottom-infos" id="bottom-infos">
                    <div class="photographer__likes" id="${photographer.bottomLikes}">
                        <h4>${photographer.bottomLikes}</h4>
                        <img id="photographer-likes-icon" class="heart-icon" src="./assets/icons/heart-icon.png">
                    </div>
                    <h4 class="photographer__price" id="photographer-price">${photographer.price}€/jour</h4>
                </div>
            `;
        photographerInfosBlock.insertAdjacentElement('beforeend', block2);

        // Attach stylesheet to component
        // shadow2.appendChild(stylePage);
        // Attach the created elements to the shadow dom
        // shadow2.appendChild(photographerInfosBlock);
        this.appendChild(photographerInfosBlock);
        }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('photographer-component-page', PhotographerInfosTemplate);  

