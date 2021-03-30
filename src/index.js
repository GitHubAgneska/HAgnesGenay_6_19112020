
import "./main.scss";

import { homeModule } from './app/modules/homeModule';

import { NavTags } from './app/components/nav-tags';

import { PhotographerFactory } from './app/utils/photographerFactory';
import { Photographer } from './app/utils/photographer-model';
import { PhotographerTemplateHome } from './app/components/photographerTemplate';
import { PhotographerTemplatePage } from './app/components/photographerTemplatePage';

import { MediaItemFactory } from './app/utils/mediaItem-factory';
import { MediaItem } from './app/utils/mediaItem-model';
import { MediaItemTemplate } from './app/components/mediaItemTemplate';

//API apiUrl
const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
const mediaAssetsPath = './app/assets/img/';
const portraitAssetsPath = './assets/img/portraits/S/';


// START HOMEPAGE
homeModule.startHome();


// RETRIEVE ALL DATA fetched by homeModule
let myphotographers = homeModule.getAllData();
// console.log('HERE', myphotographers);


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
        homeModule.useSetUpTemplates(filtered);
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
            // generate new navtags html template and inject data
            photog.tagsTemplate = new NavTags(photog.tags);
            // define where each generated photographer component will be rooted (= section #photographersList)
            const photographerInfosContainer = document.querySelector('#photographer-content');
            // attach each new created components to this section
            photographerInfosContainer.appendChild(photog.template);

            // set up media/gallery section for the photographer
            photog.photographerMedia.forEach( mediaItem => {
                let myMediaItem = new MediaItem();
                myMediaItem.mediaId = mediaItem.id;
                myMediaItem.photograperId = photographerId; /* mediaItem.photograperId; */
                myMediaItem.name = mediaItem.image;
                myMediaItem.imageSrc = mediaAssetsPath + myMediaItem.name;
                
                myMediaItem.photographerName = photog.name; //necessary for url
                // myMediaItem.localPath = localPathToMediaFolder + '/S/' + myMediaItem.imageName;

                // myMediaItem.imageTitle = myMediaItem.imageName;
                // myMediaItem.imageTitle = myMediaItem.extractImageTitle(myMediaItem.imageName);
                myMediaItem.imageLikes = mediaItem.likes;
                myMediaItem.date = mediaItem.date;
                myMediaItem.price = mediaItem.price;
                myMediaItem.imageTags = mediaItem.tags;

                myMediaItem.template = new MediaItemTemplate(mediaItem);

                const galleryWrapperSection = document.querySelector('#gallery-collection');
                // attach each photo item to gallery
                galleryWrapperSection.appendChild(myMediaItem.template);
            })
        }
    })

}







// router
const routes = [
    { path: '/', component: homeModule },
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

