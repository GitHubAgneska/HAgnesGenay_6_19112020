// ---------------------------------------------------------------------------------------
// PHOTOGRAPHER CUSTOM HTML ELEMENT - HOME : how each photographer component is generated
// ---------------------------------------------------------------------------------------
import {NavTags} from './nav-tags';
import {photographerPageModule} from '../modules/photographerPageModule';
import {keyAction} from '../utils/accessibilitySupport';

export class PhotographerTemplateHome extends HTMLElement {
        constructor(photog) {
            super();
            // retrieve photographer object from param
            let photographer = photog;

            // create a shadow root
            // const shadow = this.attachShadow({mode: 'open'});
            this.setAttribute('style', 'flex:auto;flex-basis:30%;');  // ------- TO REVIEW 
            this.setAttribute('aria-label', photog.name + ' profile');
            this.setAttribute('tabindex', '0');


            // create photographer component main container div
            const photographerWrapperHome = document.createElement('div');

            // link component to main stylesheet (beware of content hash exported href in webpack)
           /*  const styleHome = document.createElement('link');
            styleHome.setAttribute('rel', 'stylesheet');
            styleHome.setAttribute('href', './main.css');
            styleHome.setAttribute('type', 'text/css'); */
            
            // set up which photogtapher is passed as param
            photographerWrapperHome.setAttribute('data', photographer);
            
            // set photographer main container div attributes/properties
            photographerWrapperHome.setAttribute('class', 'photographer photographer--home');
            photographerWrapperHome.setAttribute('id', 'photographer-'+ photographer.name); // + name

            photographerWrapperHome.setAttribute('tabindex', '0');
            photographerWrapperHome.setAttribute('aria-label', photographer.name + ' presentation');
            
            
            // create clickable photographer main presentation block (name+pic)
            const photographerMainBlock = photographerWrapperHome.appendChild(document.createElement('div'));
            photographerMainBlock.setAttribute('class', 'photographer__main-block');
            photographerMainBlock.setAttribute('tabindex', '0'); // make element tabbable
            photographerMainBlock.innerHTML = `
                <a aria-label="go to ${photographer.name} page">
                    <img class="photographer__pic home" src="./assets/img/portraits/S/${photographer.portrait}" alt="${photographer.name} presentation picture" id="${photographer.name}-pres-picture">
                    <h2 class="photographer__name home" id="${photographer.name}">${photographer.name}</h2>
                </a>
                `;

            // add event listener on this block, that calls the photographer page with id as param
            photographerMainBlock.addEventListener('click', function(event) { 
                photographerPageModule.initPagePhotographer(event, photographer.id);
            }, false);
            
            // KEYBOARD NAV SUPPORT
            // Focus on the whole photographer COMPONENT profile block ( necessary to get screenReader announce photographer name)
            this.addEventListener('keydown', function(event) {
                let componentBlock = event.target;
                let photogBlockInner1 = componentBlock.firstElementChild; // = photographerMainBlock
                
                // ENTER/TAB => enter profile tabbable inner elements
                if ( event.key === 'Enter' || event.key === 'Tab' ) {
                    photogBlockInner1.focus();
                    keyAction(photogBlockInner1);

                }
                // ARROW LR => go to next/prev profile
                if ( event.key === 'ArrowRight' ) { 
                    photogBlockInner1.nexElementSibling.focus();
                    keyAction(photogBlockInner1.nexElementSibling);
                }
                if ( event.key === 'ArrowLeft' && photogBlockInner1.previousElementSibling) { 
                    photogBlockInner1.previousElementSibling.focus();
                } 
            }, false);

            photographerMainBlock.addEventListener('keydown', function(event) {
                if ( event.key === 13 ) {
                    photographerPageModule.initPagePhotographer(event, photographer.id);
                }
            }, false);


            // create photographer infos block main presentation block
            const photographerInfosBlock = photographerWrapperHome.appendChild(document.createElement('div'));
            photographerInfosBlock.setAttribute('class', 'photographer__text-infos');
            photographerInfosBlock.setAttribute('aria-label', 'photographer infos');
            photographerInfosBlock.innerHTML = `
                        <h3 class="photographer__location home" id="${photographer.name}-location">${photographer.city}, ${photographer.country}</h3>
                        <h4 class="photographer__tagline home" id="${photographer.name}-tagline">${photographer.tagline}</h4>
                        <h5 class="photographer__price home" id="${photographer.name}-price">${photographer.price}€/jour</h5>
            `;

            // generate new tagslists custom element template (using Navtags custom html element)
            let parent = 'profile-home';
            const photographerTagsList = new NavTags(photographer.tags, parent);
            // inject data into it ====> done as attribute setting IN Navtag class

            // attach navtags component to photographer profile
            photographerWrapperHome.appendChild(photographerTagsList);

            // Attach stylesheet to component
            // shadow.appendChild(styleHome);

            // Attach the created elements to the shadow dom
            // shadow.appendChild(photographerWrapperHome);
            this.appendChild(photographerWrapperHome);
        }
    }

    // register custom element in the built-in CustomElementRegistry object
    customElements.define('photographer-component-home', PhotographerTemplateHome);

