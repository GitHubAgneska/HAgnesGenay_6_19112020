// ----------------------------------------------------
// PHOTOGRAPHER INFOS CUSTOM HTML ELEMENT - PHOTOGRAPHER PAGE
// ----------------------------------------------------
import { NavTags } from './nav-tags';

export class PhotographerInfosTemplate extends HTMLElement {
    constructor(photog) {
        super();
        // retrieve photographer object from param
        let photographer = photog;

        // create a shadow root
        const shadow2 = this.attachShadow({mode: 'open'});

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
                <div class="photographer__text-infos">
                    <h1 class="photographer__name page" id="${photographer.name}">${photographer.name}</h1>
                    <h2 class="photographer__location page" id="${photographer.city}">${photographer.city}, ${photographer.country}</h2>
                    <h3 class="photographer__tagline page" id="${photographer.name}-tagline">${photographer.tagline}</h3>
                </div>
            `;

        // generate new tagslists custom element template (using Navtags custom html element)
        let photographerTagsList2 = new NavTags(photographer.tags);
        photographerInfosBlock.appendChild(photographerTagsList2);

        const block2 = document.createElement('div');
        block2.innerHTML =
            `
                <div class="photographer__bottom-infos" id="bottom-infos">
                    <h4 class="photographer__likes" id="${photographer.bottomLikes}">${photographer.bottomLikes}</h4>
                    <h4 class="photographer__price" id="${photographer.price}">${photographer.price}</h4>
                </div>
            `;
        photographerInfosBlock.insertAdjacentElement('beforeend', block2);

        // Attach stylesheet to component
        shadow2.appendChild(stylePage);
        // Attach the created elements to the shadow dom
        shadow2.appendChild(photographerInfosBlock);
        }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('photographer-component-page', PhotographerInfosTemplate);  

