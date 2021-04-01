// ----------------------------------------------------
// PHOTOGRAPHER INFOS CUSTOM HTML ELEMENT - PHOTOGRAPHER PAGE
// ----------------------------------------------------
import { NavTags } from './nav-tags';

export class PhotographerTemplatePage extends HTMLElement {
    constructor(photog) {
        super();
        // retrieve photographer object from param
        let photographer = photog;

        // create a shadow root
        const shadow2 = this.attachShadow({mode: 'open'});

        const photographerWrapperPage = document.createElement('section');
        // link component to main stylesheet
        const stylePage = document.createElement('link');
        stylePage.setAttribute('rel', 'stylesheet');
        stylePage.setAttribute('href', './main.css');
        stylePage.setAttribute('type', 'text/css');
        
        // set up which photogtapher is passed as param
        photographerWrapperPage.setAttribute('data', photographer);
        

        // INFOS BLOCK ======================================================================
        
        // create photographer main presentation block (top infos + bottom likes / price)
        const photographerPageInfos = document.createElement('div');
        photographerPageInfos.setAttribute('class', 'photographer photographer--page');
        photographerPageInfos.setAttribute('id', 'photographer-'+ photographer.name); // + name
        photographerPageInfos.setAttribute('aria-label', photographer.name + ' presentation');

        photographerPageInfos.innerHTML = `
            <img class="photographer__pic page" src="./assets/img/portraits/S/${photographer.portrait}" alt="${photographer.name} presentation picture" id="${photographer.name}-pres-picture">
            <div class="photographer__text-infos">
                <h1 class="photographer__name page" id="${photographer.name}">${photographer.name}</h1>
                <h2 class="photographer__location page" id="${photographer.city}">${photographer.city}, ${photographer.country}</h2>
                <h3 class="photographer__tagline page" id="${photographer.name}-tagline">${photographer.tagline}</h3>
                <div class="photographer__tags-list tags-list page" id="${photographer.tags}"></div>
            </div>

            <div class="photographer__bottom-infos" id="bottom-infos">
                <h4 class="photographer__likes" id="${photographer.bottomLikes}">${photographer.bottomLikes}</h4>
                <h4 class="photographer__price" id="${photographer.price}">${photographer.price}</h4>
            </div>
        `;
        // generate new tagslists custom element template (using Navtags custom html element)
        const photographerTagsList2 = new NavTags(photographer.tags);
        
        photographerPageInfos.appendChild(photographerTagsList2); // =====> TO REVIEW : NOT where it should be

        // attach infos block to photographerWrapperPage
        photographerWrapperPage.insertAdjacentElement("afterbegin",photographerPageInfos);


        // GALLERY BLOCK ======================================================================
        // create component container SECTION for GALLERY
        const galleryWrapper = document.createElement('div');
        // set GALLERY SECTION container +  attributes/properties
        galleryWrapper.setAttribute('class', 'gallery-wrapper');
        galleryWrapper.setAttribute('id', 'gallery-section-'+ photographer.name);
        galleryWrapper.setAttribute('aria-label', photographer.name + ' gallery collection');


        // attach gallery block to photographerWrapperPage in last position
        photographerWrapperPage.insertAdjacentElement("beforeend", galleryWrapper);

        //  HERE: APPEND PHOTO-LIST LI ELEMENTS (GALLERY = list of imgs)
    
        // Attach stylesheet to component
        shadow2.appendChild(stylePage);
        // Attach the created elements to the shadow dom
        shadow2.appendChild(photographerWrapperPage);
        }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('photographer-component-page', PhotographerTemplatePage);  


