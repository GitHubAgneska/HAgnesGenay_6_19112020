import { homePageTemplate } from '../components/base-page-template';
import { HeaderBaseTemplate } from '../components/header-base-template';
import { NavTags } from '../../app/components/nav-tags';
import { PhotographerFactory } from '../../app/utils/photographerFactory';
import { PhotographerTemplateHome } from '../../app/components/photographerTemplate';
import { MediaItemFactory } from '../../app/utils/mediaItem-factory';

const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  


// MODULE PATTERN STRUCTURE
export const homeModule = (function() {

    // private part of module

    // -------------------------------------------------------------------------------
    // CREATE BASE HTML CONTEXT TO HOST ALL FOLLOWING ELEMENTS
    // -------------------------------------------------------------------------------
    // const pageType = 'homepage';
    // where 'main' content will be hosted
    const root = document.querySelector('#root');
    const header = new HeaderBaseTemplate();
    // const header = new HeaderBaseTemplate('home');
    root.appendChild(header);
    const homepage = new homePageTemplate();
    root.appendChild(homepage);


    const myHeaders = new Headers();
    const myRequest = new Request( apiUrl, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors', //  mode: 'no-cors' ? 
        cache: 'default',
        credentials: "include"
    });

    function initData() { 
        fetch(myRequest)
        .then(response => response.json())
        .then(json => {
            let photographers = json.photographers;
            let media = json.media;
            initializeData(photographers, media);
            initializeMainNav(tagslistMainNav);
        });
    }

    // -------------------------------------------------------------------------------
    // AT HOMEPAGE OPENING, THE MAIN NAVIGATION WITH TAGS IS GENERATED
    // -------------------------------------------------------------------------------
    function initializeMainNav(tagslistMainNav) {
        // define parent container (header)
        const mainNavContainer = document.querySelector('#header');
        // generate new navtag from navTags custom html element, with whole tags list as param
        let parent = 'header';
        var headerNav = new NavTags(tagslistMainNav, parent);
        // attach component to parent
        mainNavContainer.appendChild(headerNav);
    }

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
                photographer.bottomLikes = 9918,
                photographer.tags, photographer.tagsTemplate,
                photographer.photographerMedia = [],
                photographer.template,
                photographer.contactRequests = []
            );
            myphotographers.push(photographer);
        });
        media.forEach( mediaItem => { 

            mediaItemFactory.create(
                mediaItem.id,
                mediaItem.photographerId,
                mediaItem.tags,
                mediaItem.likes,
                mediaItem.date,
                mediaItem.price,
                mediaItem.title
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
    } // end of initializeData()

     // initialize photographers templates (param is either all photographers or a list filtered by tag)
    function setUpTemplates(myphotographers) {
        
        myphotographers.forEach(photog => {
            // generate html template block for homepage
            photog.template = new PhotographerTemplateHome(photog);
            // define where each generated photographer component will be rooted (= section #photographersList)
            const photographerContainer = document.querySelector('#photographersList');
            // attach each new created component to this section
            photographerContainer.appendChild(photog.template);
            location.hash = '#/home';
        })
    }

    // function used by 'navtags component' as an event listener on each navtag item
    function updateHomePageView(navTag) {

        // store tag name for sorting
        var sortingTerm = navTag;
        // define homepage content
        const photographersList = document.querySelector('.photographers');
        // remove eveything that's displayed by default
        while (photographersList.firstChild) {photographersList.removeChild(photographersList.firstChild)}
        filterPhotographers(myphotographers, sortingTerm);
        location.hash = '#/view/' + sortingTerm;
    }

    function filterPhotographers(myphotographers, sortingTerm){
            var filtered = myphotographers.filter(x => x.tags.includes(sortingTerm));
            setUpTemplates(filtered);
    }

    function getPhotographers(){ return myphotographers}; // make all data public

    // public part of module (these methods can be used outside of this module)
    return {
        startHome: initData,
        getAllData: getPhotographers,
        useSetUpTemplates: setUpTemplates,
        updateSortedHome: updateHomePageView,
        run: initData// for router
    }
}());



