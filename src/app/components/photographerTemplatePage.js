// ----------------------------------------------------
// PHOTOGRAPHER INFOS CUSTOM HTML ELEMENT - PHOTOGRAPHER PAGE
// ----------------------------------------------------
import { NavTags } from './nav-tags';

export class PhotographerTemplatePage extends HTMLElement {
    constructor(photog) {
        super();

        let photographer = photog;

        // link component to main stylesheet  ============> does not work in webpack
        const stylePage = document.createElement('link');
        stylePage.setAttribute('rel', 'stylesheet');
        stylePage.setAttribute('href', './css/style.css');

        // create a shadow root
        const shadow2 = this.attachShadow({mode: 'open'});

        // INFOS BLOCK
        // const photographerWrapperPageinfos = document.createElement('section');
        const photographerWrapperPage = document.createElement('div'); // test
        // set up which photogtapher is passed as param
        photographerWrapperPage.setAttribute('data', photographer);

        // set main SECTION container +  attributes/properties
        photographerWrapperPage.setAttribute('class', 'photographer photographer--page');
        photographerWrapperPage.setAttribute('id', 'photographer-'+ photographer.name); // + name
        photographerWrapperPage.setAttribute('aria-label', photographer.name + ' presentation');



        // create photographer main presentation block (top infos + bottom likes / price)
        photographerWrapperPage.innerHTML = `
            <img class="photographer__pic page" src="" alt="${photographer.name} presentation picture" id="${photographer.name}-pres-picture">
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

        const photographerTagsList2 = new NavTags(photographer.tags);
        photographerWrapperPage.appendChild(photographerTagsList2);

        // GALLERY BLOCK
        // create component container SECTION for GALLERY
        const galleryWrapper = document.createElement('section');
        // set GALLERY SECTION container +  attributes/properties
        galleryWrapper.setAttribute('class', 'gallery-wrapper');
        galleryWrapper.setAttribute('id', 'gallery-section-'+ photographer.name);
        galleryWrapper.setAttribute('aria-label', photographer.name + ' gallery collection');


        //  HERE: APPEND PHOTO-LIST LI ELEMENTS (GALLERY = list of imgs) / 
        // call to initiate photographer media + templates
        // fetchMedia(newPhotographer.id, newPhotographer.name);
    
        // Attach stylesheet to component
        shadow2.appendChild(stylePage);
        // Attach the created elements to the shadow dom
        shadow2.appendChild(photographerWrapperPage);
        shadow2.appendChild(galleryWrapper);

        }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('photographer-component-page', PhotographerTemplatePage);  


