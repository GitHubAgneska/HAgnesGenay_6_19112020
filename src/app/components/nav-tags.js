
import { homeModule } from '../modules/homeModule';

// ----------------------------------------------------
// CUSTOM ELEMENT TEMPLATE FOR NAVTAGS
// ----------------------------------------------------
export class NavTags extends HTMLElement {
    constructor(navtags, parent) {
        super();

        // create nav section
        const navTagsTemplate = document.createElement('nav');

        // IF navTags component is generated to populate HOME MAIN NAV
        // param navtags = mainListNavtags
        // ELSE IF navTags component is generated to populate PHOTOGRAPHER TAGS LIST
        // navTags = photographer.tags;
        let navTags = navtags;

        // attach data attributes passed in params ----------------------------- * 
        navTagsTemplate.setAttribute('data', navTags);

        if (parent === 'header') {
            navTagsTemplate.setAttribute('class', 'header__nav tags-list home');
        }
        if (parent === 'profile-home') {
            navTagsTemplate.setAttribute('class', 'tags-list home');
        }
        if (parent === 'profile-page') {
            navTagsTemplate.setAttribute('class', 'tags-list page');
        }

        // populate nav section with tags, list depending on context :
        // (home nav or photographer profile tags nav)
        for (let i = 0; i < navTags.length; i++)  {
            var navTagItem = document.createElement('a');
            navTagItem.setAttribute('class', 'nav-tag');
            navTagItem.setAttribute('id', navTags[i]+'-nav-tag');
            // navTagItem.setAttribute('href', "");

            // ADD to <a> tag :
            // event listener click => will call updateView function,
            // & passing name of tag as parameter (example : 'portrait')
            navTagItem.addEventListener('click', function() { homeModule.updateSortedHome(navTags[i])}, false);
            
            var navTagItemContent = document.createTextNode('#' + navTags[i]);
            navTagItem.appendChild(navTagItemContent);

            // ADD to <a> tag : span element for accessibility ( visually hidden )
            var spanAccessibility = document.createElement('span');
            spanAccessibility.setAttribute('class', 'visuallyHidden') // => TO REVIEW : not necessary if 'visuallyHidden' is a mixin 
            var spanAccessibilityContent = document.createTextNode(navTags[i]); // attach navTag name to span
            spanAccessibility.appendChild(spanAccessibilityContent);

            //attach span to navtag
            navTagItem.appendChild(spanAccessibility);

            navTagsTemplate.appendChild(navTagItem);
        };
        this.appendChild(navTagsTemplate); 
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('nav-tags-component', NavTags);


