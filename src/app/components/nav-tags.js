
import { homeModule } from '../modules/homeModule';
import { keyAction } from '../utils/accessibilitySupport';

// ----------------------------------------------------
// CUSTOM ELEMENT TEMPLATE FOR NAVTAGS
// ----------------------------------------------------
export class NavTags extends HTMLElement {
    constructor(navtags, parent) {
        super();

        // create nav section
        const navTagsTemplate = document.createElement('nav');
        
        // IF navTags component is generated to populate HOME MAIN NAV : param navtags = mainListNavtags
        // ELSE IF navTags component is generated to populate PHOTOGRAPHER TAGS LIST : navTags = photographer.tags;
        let navTags = navtags;
        // attach data attributes passed in params ----------------------------- * 
        navTagsTemplate.setAttribute('data', navTags);
        
        if (parent === 'header') {
            navTagsTemplate.setAttribute('id', 'header-nav');   
            navTagsTemplate.setAttribute('class', 'header__nav tags-list header home');
            navTagsTemplate.setAttribute('aria-label', 'main-navigation');

            navTagsTemplate.setAttribute('tabindex', '0'); // make nav tabbable - only on homepage
        }
        if (parent === 'profile-home') {
            navTagsTemplate.setAttribute('id', 'profile-nav'); // ------------------ TO REVIEW : multiple ID ( role of this ID anyway ?)
            navTagsTemplate.setAttribute('class', 'tags-list home');
            navTagsTemplate.setAttribute('aria-label', 'secondary-navigation');

            navTagsTemplate.setAttribute('tabindex', '0'); // make nav tabbable  - only on homepage
        }
        if (parent === 'profile-page') {
            navTagsTemplate.setAttribute('class', 'tags-list page');
        }

        // populate nav section with tags (tags list depending on context : (home nav or photographer profile tags nav)
        for (let i = 0; i < navTags.length; i++)  {
            var navTagItem = document.createElement('a');
            navTagItem.setAttribute('class', 'nav-tag');
            navTagItem.setAttribute('id', navTags[i]+'-nav-tag');
            navTagItem.setAttribute('tabindex', '0'); // make tag tabbable

            // ADD to <a> tag :
            // event listener click => will call updateView function,
            // & passing name of tag as parameter (example : 'portrait')
            navTagItem.addEventListener('click', function() { homeModule.updateSortedHome(navTags[i]); }, false);

            var navTagItemContent = document.createTextNode('#' + navTags[i]);
            navTagItem.appendChild(navTagItemContent);

            // ADD to <a> tag : span element for accessibility ( visually hidden )
            var spanAccessibility = document.createElement('span');
            spanAccessibility.setAttribute('class', 'visuallyHidden'); // => TO REVIEW : not necessary if 'visuallyHidden' is a mixin 
            var spanAccessibilityContent = document.createTextNode(navTags[i]); // attach navTag name to span
            spanAccessibility.appendChild(spanAccessibilityContent);

            //attach span to navtag
            navTagItem.appendChild(spanAccessibility);
            //attach tag to nav
            navTagsTemplate.appendChild(navTagItem);
        }

        // KEYBOARD NAV SUPPORT        
            // let actionType = 'undirectAction';
            // keyAction(navTagsTemplate, actionType);
            // keyAction(navTagsTemplate, actionType);

        // on NAV FOCUSED, listen to key down
        navTagsTemplate.addEventListener('keydown', function(event){
            
            // if NAV press enter
            if ( event.keyCode === 13 || event.keyIdentifier === 'Space') { // Enter/Return key)
                // focus goes on first tag element
                let navItem = event.target.firstElementChild;
                navItem.focus(); // place focus on first tag 
                keyAction(navItem); // determine possible key actions
            }
        }, false);

        this.appendChild(navTagsTemplate); 
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('nav-tags-component', NavTags);


