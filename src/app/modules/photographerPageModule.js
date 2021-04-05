
import { homeModule } from './homeModule';
import { PhotographerInfosTemplate } from '../components/photographerInfosTemplate';
import { MediaItemTemplate } from '../../app/components/mediaItemTemplate';
import { DropdownTemplate } from '../components/dropdown-template';
import { Lightbox } from '../components/lightbox';
import { ModalContact } from '../components/modal-contact';
import { ConfirmBox } from '../components/confirm-box';
import { validateFormInputs } from '../utils/validateFormInputs';

// MODULE PATTERN STRUCTURE
export const photographerPageModule = (function() {

    // private 
    // RETRIEVE ALL PHOTOGRAPHERS [] from homeModule
    function getAllData() { return homeModule.getAllData(); }

    function initPhotographerPageView(e, photographerId) {
        // e.stopPropagation();
        // e.preventDefault();
        const photogId = photographerId;
        const myphotographers = getAllData();  // instead : retrieve photographer object as param

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
                    mediaItem.template.addEventListener('click', function(event) {
                        mediaItem.id = event.target;
                        openLightbox(mediaItem.id, mediaItem, getPhotographerMedia()) // pass mediaItem ID + mediaItem Object + media array to lightbox
                    }, false);

                    // attach each photo item to gallery
                    photographerGalleryBlock.appendChild(mediaItem.template);
                })

                main.appendChild(photographerGalleryBlock);
                function getName() { return photog.name; } // necessary for gallery imgs urls
            }
        })
    } // ( end of init() )

    // LIGHTBOX ======================================================================
    function openLightbox (currentImgId, currentImg, currentGallery) { 
        var currentImgId = currentImgId;
        var currentImg = currentImg;
        var currentGallery = currentGallery;

        console.log('currentImg==', currentImg,'currentGallery==', currentGallery );
        var lightbox = new Lightbox();
        lightbox.init({currentImgId:currentImgId, currentImg:currentImg, currentGallery:currentGallery, slidenav: true, animate: true, startAnimated: true});
    }

    // CONTACT MODAL FORM  ===========================================================
    function openContactForm(currentPhotographer) {
        var currentPhotographer = currentPhotographer;
        var contactModal = new ModalContact(currentPhotographer);
        var root = document.querySelector('#photographer-content');  //  TEMPORARY : IMPLEMENT 'DESTRUCT PREVIOUS VIEW' UTIL FUNCTION
        root.appendChild(contactModal);
    }
    function closeModal(event, mainModalWrapper, inputsTouched) {
        // check inputs touched => confirmation box
        if (inputsTouched) { 
            var confirmBox = new ConfirmBox('cancelModal');
            mainModalWrapper.appendChild(confirmBox);
            
        } else { // untouched => destruct view
            mainModalWrapper.style.display='none'; //test OK
        }
    }

    function submitForm(photog, modalInnerWrapper,inputElements) {

        let isFormValid = validateFormInputs(modalInnerWrapper,inputElements);
        // If the form did not validate, prevent it being submitted
        if (! isFormValid) { // isFormValid = false
            // event.preventDefault(); // Prevent the form being submitted;
            return;
        } else {
        // create new requestContact object for photographer
        // ( = making object out of each of input value )
        for ( let i = 0 ; i < inputElements.length; i++ ) {
            console.log('input[i] ==',inputs[i] );
            console.log('input[i].value==',inputs[i].value );
            var newInputObject = new Object();
            /* each field name becomes object key */
            newInputObject.fieldName = inputs[i].name;
            /* each text input value becomes object value */
            newInputObject.value = inputs[i].value;
            newContactRequest.push(newInputObject);
        }
        console.log('newContactRequest==', newContactRequest);
        // push new object to contactRequests array 
        photog.contactRequests.push(newContactRequest);
        // display submitted confirmation message + terminate
        const confirmMessage = new ConfirmBox('closeModalAfterSubmitOk');
        } 
    }

    //public 
    return {
        initPagePhotographer: initPhotographerPageView,
        openContactForm: openContactForm,
        closeModal: closeModal,
        submitForm:submitForm,
        run: initPhotographerPageView, // for router
    }
}());