
import { homeModule } from './homeModule';
import { PagePhotogTemplateBase } from '../components/base-page-template';
import { HeaderBaseTemplate } from '../components/header-base-template';
import { PhotographerInfosTemplate } from '../components/photographerInfosTemplate';
import { MediaItemTemplate } from '../../app/components/mediaItemTemplate';
import { DropdownTemplate } from '../components/dropdown-template';
import { Lightbox } from '../components/lightbox';
import { ModalContact } from '../components/modal-contact';
import { ConfirmBox } from '../components/confirm-box';
import { validateFormInputs } from '../utils/validateFormInputs';
import { processTitle } from '../../app/utils/processApiTitles';
import { destroyView } from '../../app/utils/destroyView';
import { sortBy } from '../../app/utils/sortBy';
import { root } from 'postcss';


// MODULE PATTERN STRUCTURE
export const photographerPageModule = (function() {

    // private part of module

    // RETRIEVE ALL PHOTOGRAPHERS [] from homeModule
    function getAllData() { return homeModule.getAllData(); }


    // CREATE BASE HTML CONTEXT TO HOST PAGE CONTENT + retrieve data
    // -------------------------------------------------------------------------------
    function initPhotographerPageView(e, photographerId) {
        // e.stopPropagation();  ------------------------- = event calling this method, from clicking homepage photog profile

        // where any 'main' content will be hosted
        const root = document.querySelector('#root');
        // destroy previous view ------------------------- SHOULD VERY PROBABLY BE ELSEWHERE OUTSIDE FROM THIS MODULE
        destroyView(root);
        const header = new HeaderBaseTemplate();
       //  const header = new HeaderBaseTemplate('page');
        root.appendChild(header);
        const photogPage = new PagePhotogTemplateBase();
        root.appendChild(photogPage);

        const myphotographers = getAllData();  //  ------------------------- instead : retrieve photographer object as param ?

        initPhotog(myphotographers, photographerId);
    }

    // INIT ELEMENTS FOR PHOTOGRAPHER WITH ID
    // -------------------------------------------------------------------------------
    function initPhotog(myphotographers, photographerId) {
        const photogId = photographerId;
        location.hash = '#/photographer/' + photogId;

        // find photographer via passed id param
        myphotographers.forEach(photog => {
            if (photog.id === photogId ) {
            // INFOS BLOCK ======================================================================
                // generate new profile template
                photog.template = new PhotographerInfosTemplate(photog); // = INFOS SECTION

                // define where each generated photographer component will be rooted (= main (#photographersList))
                const main = document.querySelector('#photographer-content');
                // attach each new created photographer profile to this section
                main.appendChild(photog.template);
    
                let dropdown = new DropdownTemplate(photog);
                main.appendChild(dropdown);

            // GALLERY BLOCK ======================================================================
                // create container SECTION for GALLERY
                const photographerGalleryBlock = document.createElement('section');
                // set GALLERY SECTION container +  attributes/properties
                photographerGalleryBlock.setAttribute('class', 'gallery-wrapper');
                photographerGalleryBlock.setAttribute('id', 'gallery-section-'+ photog.name);
                photographerGalleryBlock.setAttribute('aria-label', photog.name + ' gallery collection');

                
                function getName() { return photog.name; } // necessary for gallery imgs urls

                // EACH PIC OF GALLERY BLOCK ======================================================================
                // set up media/gallery content for the photographer
                photog.photographerMedia.forEach( mediaItem => {
                        // correct manually a few api typos preventing mediaItem to be displayed
                        if ( mediaItem.id === 9275938 ) { mediaItem.image = 'Event_WeddingGazebo.jpg'; }
                        if ( mediaItem.id === 95234343 ) { mediaItem.image = 'Animals_Rainbow.jpg'; }
                        if ( mediaItem.id === 725639493 ) { mediaItem.image = 'Event_ProductPitch.jpg'; }

                        mediaItem.photographerName = getName(); // necessary for imgs urls
                        // use method to format images names to be displayed
                        let title =  processTitle(mediaItem.image, mediaItem.tags[0]) || processTitle(mediaItem.video, mediaItem.tags[0]);
                        mediaItem.title = title;
                        
                        const currentGallery = getPhotographerMedia(); // pass it through mediaItem template so it can pass it back to 'openLightbox()' below --- ...
                        mediaItem.template = new MediaItemTemplate(mediaItem, currentGallery);

                });
                function getPhotographerMedia() { return photog.photographerMedia }; // used by lightbox methods when called from mediaItem

                renderSortedView(photographerGalleryBlock, photog, 'likes');
            } // ( end of if photog.id  ) 
        })  // ( end of forEach(photog) )
    } // ( end of initPhotog() )
    
    // SORTING MEDIA ITEMS ==========================================================
    function renderSortedView(photographerGalleryBlock, photog, type) {  

        photographerGalleryBlock = photographerGalleryBlock  || document.querySelector('.gallery-wrapper');
        let id = id || photog.id;
        // console.log('photog====', photog);
        let allMediaOfPhotog = photog.photographerMedia;
        if ( !type) { type = 'likes'} else { type = type; } // default view = sorted by popularity (likes)

        const mediaSortedBy = sortBy(allMediaOfPhotog, type);
        mediaSortedBy.forEach(item => { photographerGalleryBlock.appendChild(item.template) });

        const main = document.querySelector('#photographer-content');
        main.appendChild(photographerGalleryBlock);
    }
    

    // LIGHTBOX ======================================================================

    function openLightbox (event, currentImgId, currentImg, currentGallery) {

        var currentImgId = currentImgId;
        var currentImg = currentImg;
        var currentGallery = currentGallery;   // --------- TO REVIEW : currentGallery order = api images order => ≠ sortedBy : BUG at lightbox opening
        // console.log('currentImg==', currentImg,'currentGallery==', currentGallery );
        
        new Lightbox().init({currentImgId:currentImgId, currentImg:currentImg, currentGallery:currentGallery, slidenav: true, animate: false, startAnimated: false});
    }

    function closeLightbox(lightboxWrapper) {
        // destroyView(lightboxWrapper);
        const root = document.querySelector('#root');
        root.removeChild(root.lastChild);
    }

    // CONTACT MODAL FORM  ===========================================================
    function openContactForm(currentPhotographer) {

        const root = document.querySelector('#photographer-content');
        currentPhotographer = currentPhotographer;
        let contactModal = new ModalContact(currentPhotographer);
        // contactModal.focus();
        root.appendChild(contactModal);
    }


    function closeModal(event, inputsTouched, modal) {
        event.stopPropagation();
        let mainModalWrapper = document.querySelector('#modal-contact');
        modal = modal;
        // check inputs touched => confirmation box
        if (inputsTouched) { 
            let confirmBox = new ConfirmBox('cancelModal');
            mainModalWrapper.appendChild(confirmBox);
            
        } else { // untouched => destruct view
        mainModalWrapper.parentNode.removeChild(mainModalWrapper);
        }
    }

    function closeConfirmBox(event, elParent, elToRemove) {
        elParent.removeChild(elToRemove);
    }

    function submitForm(event, photog, form, formInputs) {
        let inputElements = formInputs;
        let newContactRequest = [];
        photog = photog;
        let photogCurrentContactRequests = photog.contactRequests;

        let isFormValid = validateFormInputs(form,inputElements);

        if ( !isFormValid ) {
            event.preventDefault(); // Prevent the form being submitted;
            return;
        } else {
            // create new requestContact object for photographer
            // ( = making object out of each of 4 first inputs)
            for ( let i = 0 ; i < 4; i++ ) {
                var newInputObject = new Object();
                /* each field name becomes object key */
                newInputObject.fieldName = inputElements[i].name;
                /* each text input value becomes object value */
                newInputObject.value = inputElements[i].value;
                newContactRequest.push(newInputObject);
            }
            // push new object to contactRequests array 
            photogCurrentContactRequests.push(newContactRequest);
            console.log('newcontact=', newContactRequest);
            console.log('photogCurrentContactRequests=', photogCurrentContactRequests);

            // display submitted confirmation message + terminate
            confirmSubmitted();
        }
    }
    // display submitted confirmation message + terminate
    function confirmSubmitted() {
        // define parent container
        let parent = document.querySelector('.fields-wrapper');
        // destruct modal content
        destroyView(parent);
        // generate new content (confirm message)
        let confirmMessage = new ConfirmBox('closeModalAfterSubmitted');
        // place new content into parent
        parent.appendChild(confirmMessage);
    }

    //public part of module
    return {
        initPagePhotographer: initPhotographerPageView,
        openContactForm: openContactForm,
        closeModal: closeModal,
        submitForm:submitForm,
        confirmSubmitted:confirmSubmitted,
        openLightbox: openLightbox,
        closeLightbox: closeLightbox,
        closeConfirmBox:closeConfirmBox,
        renderSortedView: renderSortedView,
        run: initPhotographerPageView, // for router
    }
}());
