// import { startInitHomePage } from './app/app';
import "./main.scss";

import { NavTags } from './app/components/nav-tags';

import { PhotographerFactory } from './app/utils/photographerFactory';
import { Photographer } from './app/utils/photographer-model';
import { PhotographerTemplateHome } from './app/components/photographerTemplate';

import { MediaItemFactory } from './app/utils/mediaItem-factory';
import { MediaItem } from './app/utils/mediaItem-model';


//API url
const url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
const mediaAssetsPath = './app/assets/img/';
const portraitAssetsPath = './app/assets/img/portraits/S/';



// -------------------------------------------------------------------------------
// AT HOMEPAGE OPENING, FETCH RETRIEVES ALL DATA FROM API (PHOTOGRAPHERS DATA ARRAY ONLY) 
// & triggers creation of photographers list
// -------------------------------------------------------------------------------
fetch(url)
    .then(response => response.json())
    .then(json => {
        let photographers = json.photographers;
        let media = json.media;
        initializeApp(photographers, media);
        initializeMainNav(tagslistMainNav)
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

// Call init main nav
// ( this method only works if page = loaded, otherwise, mainNavContainer = null
// window.onload = () => initializeMainNav(tagslistMainNav);


// -------------------------------------------------------------------------------
// INIT PHOTOGRAPHERS LIST + ThEIR MEDIA
// -------------------------------------------------------------------------------
let myphotographers = [];
let mymedias= [];

function initializeApp(photographers, media) {

    let photographerFactory = new PhotographerFactory();
    let mediaItemFactory = new MediaItemFactory();

    photographers.forEach( photographer => {

        photographerFactory.create(
            photographer.id,
            photographer.name,
            photographer.tagline,
            photographer.portraitName,
            photographer.portraitSrc,
            photographer.url,
            photographer.city, photographer.country,
            photographer.price,
            photographer.bottomLikes,
            photographer.tags, photographer.tagsTemplate,
            photographer.template = new PhotographerTemplateHome(photographer.id),
            photographer.photographerMedia = []
        );
        myphotographers.push(photographer);
    });
    // console.log('myphotographers=',myphotographers);


    media.forEach(mediaItem => { 

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
    // console.log('mymedias==', mymedias);

    myphotographers.forEach(photog => { 
        mymedias.forEach(med => { 
            if (photog.id === med.photographerId) {
                photog.photographerMedia.push(med);
            }
        })
    })
    console.log('myphotographers=',myphotographers);

}