
import "./main.scss";

import { NavTags } from './app/components/nav-tags';

import { PhotographerFactory } from './app/utils/photographerFactory';
import { Photographer } from './app/utils/photographer-model';
import { PhotographerTemplateHome } from './app/components/photographerTemplate';
import { PhotographerTemplatePage } from './app/components/photographerTemplatePage';

import { MediaItemFactory } from './app/utils/mediaItem-factory';
import { MediaItem } from './app/utils/mediaItem-model';


//API url
const url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
const mediaAssetsPath = './app/assets/img/';
const portraitAssetsPath = './assets/img/portraits/S/';



// -------------------------------------------------------------------------------
// AT HOMEPAGE OPENING, FETCH RETRIEVES ALL DATA FROM API (PHOTOGRAPHERS DATA ARRAY ONLY) 
// & triggers creation of photographers list
// -------------------------------------------------------------------------------
fetch(url)
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
// that triggers a new view : the photographer own page
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

