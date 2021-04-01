
import { homeModule } from './homeModule';
import { PhotographerInfosTemplate } from '../components/photographerInfosTemplate';
import { MediaItemTemplate } from '../../app/components/mediaItemTemplate';
import { DropdownTemplate } from '../components/dropdown-template';

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


                // set up media/gallery content for the photographer
                photog.photographerMedia.forEach( mediaItem => {
                    // console.log('mediaItem=', mediaItem);
                    mediaItem.photographerName = getName();
                    mediaItem.template = new MediaItemTemplate(mediaItem);
                    // attach each photo item to gallery
                    photographerGalleryBlock.appendChild(mediaItem.template);
                })

                main.appendChild(photographerGalleryBlock);

                function getName() { return photog.name; }
            }
        })
    }
    //public 
    return {
        initPagePhotographer: initPhotographerPageView,
        run: initPhotographerPageView // for router
    }
}());