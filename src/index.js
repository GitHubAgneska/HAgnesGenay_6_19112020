
import "./main.scss";

import { homeModuleTest2 } from './app/modules/homeModule';

import { NavTags } from './app/components/nav-tags';

import { PhotographerFactory } from './app/utils/photographerFactory';
import { Photographer } from './app/utils/photographer-model';
import { PhotographerTemplateHome } from './app/components/photographerTemplate';
import { PhotographerTemplatePage } from './app/components/photographerTemplatePage';

import { MediaItemFactory } from './app/utils/mediaItem-factory';
import { MediaItem } from './app/utils/mediaItem-model';

//API apiUrl
const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
const mediaAssetsPath = './app/assets/img/';
const portraitAssetsPath = './assets/img/portraits/S/';


homeModuleTest2.startHome();

/* export const HomeComponent =  {
    
run : () => {

// -------------------------------------------------------------------------------
// AT HOMEPAGE OPENING, FETCH RETRIEVES ALL DATA FROM API (PHOTOGRAPHERS DATA ARRAY ONLY) 
// & triggers creation of photographers list
// -------------------------------------------------------------------------------
fetch(apiUrl)
    .then(response => response.json())
    .then(json => {
        let photographers = json.photographers;
        let media = json.media;
        initializeData(photographers, media);
        initializeMainNav(tagslistMainNav);
});


// -------------------------------------------------------------------------------
// AT HOMEPAGE OPENING, THE MAIN NAVIGATION WITH TAGS IS GENERATED
// -------------------------------------------------------------------------------
function initializeMainNav(tagslistMainNav) {
    // define parent container (header)
    const mainNavContainer = document.querySelector('#header');
    // generate new navtag from navTags custom html element, with whole tags list as param
    var headerNav = new NavTags(tagslistMainNav);
    // attach component to parent
    mainNavContainer.appendChild(headerNav);
}

//  FYI : Call init main nav outside of fetch =
// ( this method only works if page = loaded, otherwise, mainNavContainer = null
// window.onload = () => initializeMainNav(tagslistMainNav);


// -------------------------------------------------------------------------------
// INIT PHOTOGRAPHERS LIST + ThEIR MEDIA
// -------------------------------------------------------------------------------
let myphotographers = [];
let mymedias= [];

function initializeData(photographers, media) {

    let photographerFactory = new PhotographerFactory();
    let mediaItemFactory = new MediaItemFactory();

    photographers.forEach( photographer => {

        photographerFactory.create(
            photographer.id,
            photographer.name,
            photographer.tagline,
            photographer.portrait,
            photographer.url,
            photographer.city, photographer.country,
            photographer.price,
            photographer.bottomLikes,
            photographer.tags, photographer.tagsTemplate,
            photographer.photographerMedia = [],
            photographer.template,
        );
        myphotographers.push(photographer);
    });


    media.forEach( mediaItem => { 

        mediaItemFactory.create(
            mediaItem.id,
            mediaItem.photographerId,
            mediaItem.likes,
            mediaItem.date,
            mediaItem.price,
            mediaItem.tags
        );

        mymedias.push(mediaItem);
    });

    // Once all photographers array data + media array data have been retrieved, 
    // reconnect each photographer with its own media
    myphotographers.forEach( photog => { 
        mymedias.forEach(med => { 
            if (photog.id === med.photographerId) {
                photog.photographerMedia.push(med); }})
    })

    setUpTemplates(myphotographers);
    return myphotographers; // get data out
}


// initialize photographers templates (param is either all photographers or a filtered by tag list)
function setUpTemplates(myphotographers) {

    myphotographers.forEach(photog => {
        // generate html template block for homepage
        photog.template = new PhotographerTemplateHome(photog);
        // define where each generated photographer component will be rooted (= section #photographersList)
        const photographerContainer = document.querySelector('#photographersList');
        // attach each new created component to this section
        photographerContainer.appendChild(photog.template);
    })
}


}, // end of run()

// getPhotographers : () => {return myphotographers; } ==> NOPE

} // end of component

 */

// console.log('myphotoafter component==', HomeComponent.getPhotographers()); ==> NOPE


// function used by 'navtags component' as an event listener on each navtag item
export function updateHomePageView(navTag) {
    // store tag name for sorting
    var sortingTerm = navTag;

    // define homepage content
    const photographersList = document.querySelector('.photographers');
    // remove eveything that's displayed by default
    while (photographersList.firstChild) {photographersList.removeChild(photographersList.firstChild)}

    filterPhotographers(myphotographers, sortingTerm);
}

function filterPhotographers(myphotographers, sortingTerm){ 
        var filtered = myphotographers.filter(x => x.tags.includes(sortingTerm));
        setUpTemplates(filtered);
}


// --------------------------------------------------------------------------------------------------------
// ON HOMEPAGE : when user clicks on a photographer profile, 
// that triggers a new view + new URL : the photographer own page
// --------------------------------------------------------------------------------------------------------
export function initPhotographerPageView(e, photographerId) {

    e.stopPropagation();
    e.preventDefault();

    console.log('id==',photographerId );

    myphotographers.forEach(photog => {
        if (photog.id === photographerId ) {
            console.log('photog========', photog)
            photog.template = new PhotographerTemplatePage(photog);
        }
    })

}



const SortedComponent =  {
    run : () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(json => {
                let photographers = json.photographers;
                console.log('PHOTOG====', photographers);
        });
    }
}


    // REVEALING MODULE PATTERN EXAMPLE
    export const moduleTest = (function() {
        // private
        let privateVar = 'in the depths of javascript';
        function privateFunction() { console.log('i am' + privateVar); }
        function publicRevealPrivateVar() {privateFunction(); }
        // public
        return {
            saySomething: publicRevealPrivateVar
        }
    }());

    moduleTest.saySomething();

    // -----------------------------------------
    
    // MODULE PATTERN EXAMPLE
    export const basketModule = (function() {

        //private
        let basket = [];
        function doSomethingPrivate(){ console.log('i am a private function'); }

        // public
        return {
            addItem: function(values){
                basket.push(values);
            },

            getItemsCount: function() {
                return basket.length;
            },
            exposePrivateMethod: doSomethingPrivate,

            getTotal: function() { 
                let itemCount = this.getItemsCount(),
                total = 0;
                while (itemCount--) { total += basket[itemCount].price; }
                return total;
            }
        }
    }());

    basketModule.addItem({item: "bread", price: 4 });


    export const homeModuleTest = (function() {

        // private
        let photogs = [];
        function initData() { 
            fetch(apiUrl)
                .then(response => response.json())
                .then(json => { photogs = json.photographers;console.log(photogs); });
        }
        //public
        return {
            exposeData: initData,
        }
    }());
    // homeModuleTest.exposeData();



// router
const routes = [
    { path: '/', component: HomeComponent2 },
    { path: '#/sorted', component: SortedComponent },  //ex: /home/portrait
]


const router = () => {
    // Find the component based on the current path
    const path = parseLocation(); console.log('LOCATION==', path);
    // If there's no matching route, get the "Error" component
    const { component = HomeComponent } = findComponentByPath(path, routes) || {};
    // const { component = SortedComponent } = findComponentByPath(path, routes) || {};
    // Render the component in the "app" placeholder
    component.run();
};

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`))) || undefined;

window.addEventListener('hashchange', router);
window.addEventListener('load', router);