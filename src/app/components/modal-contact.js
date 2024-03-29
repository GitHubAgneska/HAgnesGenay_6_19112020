// ----------------------------------------------------
// CUSTOM ELEMENT TEMPLATE FORM MODAL
// ----------------------------------------------------
import { photographerPageModule } from '../modules/photographerPageModule';

export class ModalContact extends HTMLElement {
    constructor(photog){
        super();

        let inputsTouched = false;
    
        // MODAL MAIN WRAPPER ======================================================================
        // create modal main wrapper
        const mainModalWrapper = document.createElement('div');
        mainModalWrapper.setAttribute('id', 'modal-contact');
        mainModalWrapper.setAttribute('class', 'contact-modal__main-wrapper');
        
        // retrieve photographer object from param
        let photographer = photog;
        mainModalWrapper.setAttribute('data', photographer);

        // MODAL CONTENT ======================================================================
        //accessibility modal intro info
        const accessibilityDiv = document.createElement('div');
        accessibilityDiv.setAttribute('role','dialog');
        accessibilityDiv.setAttribute('aria-labelledby','dialog_label');
        accessibilityDiv.setAttribute('aria-modal','true');
        accessibilityDiv.setAttribute('class','visuallyHidden');

        mainModalWrapper.appendChild(accessibilityDiv);

        // Modal inner content
        const modalInnerWrapper = document.createElement('div');
        modalInnerWrapper.setAttribute('class', 'contact-modal__inner-wrapper');

        modalInnerWrapper.innerHTML = 
            `
            <div class="fields-wrapper" tabindex="0">

                <div tabindex="0" id="cancelModalBtn" class="cancelModalBtn" role="button" aria-label="close modal">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </div>

                <h1 tabindex="-1">Contactez-moi<br>${photographer.name}</h1>

                <form id="contact-form" method="" action="">
                    <div class="field">
                        <label for="field-firstname" id="firstnameLabel">prénom</label>
                        <input type="text" name="firstName" id="firstName" aria-labelledby="firstnameLabel firstnameDescription" required aria-required="true">
                        <span class="requirements visuallyHidden" id="firstnameDescription" aria-live="assertive">Firstname must be at least 2 characters</span>
                    </div>

                    <div class="field">
                        <label for="lastName" id="lastnameLabel">nom</label>
                        <input type="text" name="lastName" id="lastName" aria-labelledby="lastnameLabel lastnameDescription" required aria-required="true">
                        <span class="requirements visuallyHidden" id="lastnameDescription" aria-live="assertive">Lastname must be at least 2 characters</span>
                    </div>

                    <div class="field">
                        <label for="email" id="emailLabel">email</label>
                        <input type="email" name="email" id="email" aria-labelledby="emailLabel emailDescription" required aria-required="true">
                        <span class="requirements visuallyHidden" id="emailDescription" aria-live="assertive">Please enter a valid email address</span>
                    </div>

                    <div class="field">
                        <label for="message" id="txtareaLabel">votre message</label>
                        <input type="textarea" name="message" id="message" aria-labelledby="txtareaLabel">
                    </div>

                    <input id="submitBtn" type="submit" class="main-btn" value="envoyer" role="button">
                </form>

            </div>
        `;
    
        // add event listener on form to check if touched before cancel
        modalInnerWrapper.addEventListener('input', function(event) {
            // event.target = input elements
            event.stopPropagation();
            inputsTouched = true;
            console.log('Some fields have been touched!');
        });


        // add event on contact btn to call modal contact
        const cancelModalBtn = modalInnerWrapper.querySelector('#cancelModalBtn');
        // const modal = this;

        cancelModalBtn.addEventListener('click', function(event){
            photographerPageModule.closeModal(event, mainModalWrapper, inputsTouched); }, false);
        
        // retrieve all inputs from form
        const form = modalInnerWrapper.querySelector('#contact-form');
        const formInputs = modalInnerWrapper.querySelector('#contact-form').elements;  // = object

        // add event listener on submit input btn, to send all data input to parent module
        const submitBtn = modalInnerWrapper.querySelector('#submitBtn');
        submitBtn.addEventListener('click', function(event) {
            photographerPageModule.submitForm(event, photog, form, formInputs);
        });

        // KEYBOARD SUPPORT
        // CANCEL btn -> 'enter'
        cancelModalBtn.addEventListener('keydown', function(event){ 
            if ( event.code === 'Enter' || event.code === 'Space') {
                cancelModalBtn.click(); }
            }, false);

        // 'escape' => close
        modalInnerWrapper.addEventListener('keydown', function(event){
            if ( event.code === 'Escape' ) { cancelModalBtn.click(); } 
        }, false);

        // tab on last tabbable element (submit btn) -> focus back on 1st input
        const firstInput = modalInnerWrapper.querySelector('#firstName');
        submitBtn.addEventListener('keydown', function(event) {
            if ( event.code === 'Tab' ) {
                firstInput.focus();
            }
        }, false);

        // attach modal inner content to modal main wrapper
        mainModalWrapper.appendChild(modalInnerWrapper);

        // Attach the created elements to parent
        this.appendChild(mainModalWrapper);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('modal-contact-component', ModalContact);

