
import { homeModule } from './homeModule';

import { NavTags } from '../../app/components/nav-tags';

import { PhotographerFactory } from '../../app/utils/photographerFactory';
import { Photographer } from '../../app/utils/photographer-model';
import { PhotographerTemplateHome } from '../../app/components/photographerTemplate';
import { PhotographerTemplatePage } from '../../app/components/photographerTemplatePage';

import { MediaItemFactory } from '../../app/utils/mediaItem-factory';
import { MediaItem } from '../../app/utils/mediaItem-model';
import { MediaItemTemplate } from '../../app/components/mediaItemTemplate';

//API apiUrl
const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
const mediaAssetsPath = './app/assets/img/';
const portraitAssetsPath = './assets/img/portraits/S/';





// MODULE PATTERN STRUCTURE
export const photographerPageModule = (function() {


    //private 
    function initPhotographerPageView(e, photographerId) {
        // RETRIEVE ALL DATA fetched by homeModule
        let myphotographers = homeModule.getAllData();
        // e.stopPropagation();
        // e.preventDefault();
        console.log('id==',photographerId );
        // find photographer via passed id param
        myphotographers.forEach(photog => {
            if (photog.id === photographerId ) {
                // console.log('photog========', photog)
                
                // generate new profile template
                photog.template = new PhotographerTemplatePage(photog);

                // define where each generated photographer component will be rooted (= section #photographersList)
                const photographerInfosContainer = document.querySelector('#photographer-content');
                // attach each new created photographer profile to this section
                photographerInfosContainer.appendChild(photog.template);
    
                function getName() { return photog.name; }
    
                function setUpGallery(photog) {
                    // set up media/gallery section for the photographer
                    photog.photographerMedia.forEach( mediaItem => {
                        // console.log('mediaItem=', mediaItem);
                        mediaItem.photographerName = getName();
                        mediaItem.template = new MediaItemTemplate(mediaItem);
                        //const galleryWrapperSection = document.querySelector('#gallery-collection');
                        // attach each photo item to gallery
                        // galleryWrapperSection.appendChild(mediaItem.template);
                    })
                }
            }
        })
    }// end of initPhotographerPageView

    //public 
    return {
        initPagePhotographer: initPhotographerPageView,
        run: initPhotographerPageView // for router
    }


}());