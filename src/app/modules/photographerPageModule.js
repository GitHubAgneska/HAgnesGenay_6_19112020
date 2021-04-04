
import { homeModule } from './homeModule';
import { PhotographerInfosTemplate } from '../components/photographerInfosTemplate';
import { MediaItemTemplate } from '../../app/components/mediaItemTemplate';
import { DropdownTemplate } from '../components/dropdown-template';
import { Lightbox } from '../components/lightbox';

// MODULE PATTERN STRUCTURE
export const photographerPageModule = (function() {

    // private 
    // RETRIEVE ALL PHOTOGRAPHERS [] from homeModule
    function getAllData() { return homeModule.getAllData(); }

    function initPhotographerPageView(e, photographerId) {

        // e.stopPropagation();
        // e.preventDefault();
        const photogId = photographerId;
        console.log('id==',photogId );
        
        const myphotographers = getAllData();
        console.log('MY PHOTOGS==', myphotographers);

        // find photographer via passed id param
        myphotographers.forEach(photog => {
            if (photog.id === photogId ) {
                
                // generate new profile template
                photog.template = new PhotographerInfosTemplate(photog); // = INFOS SECTION

                // define where each generated photographer component will be rooted (= main (#photographersList))
                const main = document.querySelector('#photographer-content');
                // attach each new created photographer profile to this section
                main.appendChild(photog.template);
    
                let dropdown = new DropdownTemplate();
                main.appendChild(dropdown);

                // GALLERY BLOCK ======================================================================
                // create container SECTION for GALLERY
                const photographerGalleryBlock = document.createElement('section');
                // set GALLERY SECTION container +  attributes/properties
                photographerGalleryBlock.setAttribute('class', 'gallery-wrapper');
                photographerGalleryBlock.setAttribute('id', 'gallery-section-'+ photog.name);
                photographerGalleryBlock.setAttribute('aria-label', photog.name + ' gallery collection');

                function getPhotographerMedia() { return photog.photographerMedia }; // used by lightbox methods when called from mediaItem

                // set up media/gallery content for the photographer
                photog.photographerMedia.forEach( mediaItem => {
                    // console.log('mediaItem=', mediaItem);
                    mediaItem.photographerName = getName(); // necessary for imgs urls
                    mediaItem.template = new MediaItemTemplate(mediaItem);

                    // add event listener to open lightbox
                    mediaItem.template.addEventListener('click', function() {
                        openLightbox(mediaItem.id, getPhotographerMedia())
                    }, false);

                    // attach each photo item to gallery
                    photographerGalleryBlock.appendChild(mediaItem.template);
                })

                main.appendChild(photographerGalleryBlock);

                function getName() { return photog.name; } // necessary for imgs urls
            }
        })
    }

    function openLightbox (currentImg, currentGallery) {
        
        var currentImg = currentImg;
        var currentGallery = currentGallery;

        console.log('currentImg==', currentImg,'currentGallery==', currentGallery );
        var lightbox = new Lightbox();
        lightbox.init({currentImg, currentGallery, slidenav: true, animate: true, startAnimated: true});
    }

    //public 
    return {
        initPagePhotographer: initPhotographerPageView,
        run: initPhotographerPageView, // for router
    }
}());