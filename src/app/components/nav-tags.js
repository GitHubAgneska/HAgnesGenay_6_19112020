
import { updateHomePageView } from '../../index';
// ----------------------------------------------------
// CUSTOM ELEMENT TEMPLATE FOR NAVTAGS
// ----------------------------------------------------
export class NavTags extends HTMLElement {
    constructor(navtags) {
        super();

        const shadowRoot = this.attachShadow({mode:'open'});

        // create nav section
        const navTagsTemplate = document.createElement('nav');
        navTagsTemplate.setAttribute('class', 'header__nav tags-list home');

        // IF navTags component is generated to populate HOME MAIN NAV
        // param navtags = mainListNavtags
        // ELSE IF navTags component is generated to populate PHOTOGRAPHER TAGS LIST
        // navTags = photographer.tags;
        let navTags = navtags;

        // attach data attributes passed in params ----------------------------- * 
        navTagsTemplate.setAttribute('data', navTags);

        // link component to main stylesheet  ============> ! does not work in webpack
        const navstyle = document.createElement('link');
        navstyle.setAttribute('rel', 'stylesheet');
        navstyle.setAttribute('href', './main.css');
        navstyle.setAttribute('type', 'text/css');

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
            navTagItem.addEventListener('click', function() { updateHomePageView(navTags[i])}, false);
            
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
        // Attach stylesheet to component
        shadowRoot.appendChild(navstyle);
        // Attach the created elements to the shadow dom
        shadowRoot.appendChild(navTagsTemplate); 
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('nav-tags-component', NavTags);


