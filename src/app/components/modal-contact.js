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

        // modal style
        const modalStyle = document.createElement('link');
        modalStyle.setAttribute('href', './main.css');
        modalStyle.setAttribute('rel', 'stylesheet');
        modalStyle.setAttribute('type', 'text/css');


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
            <div class="fields-wrapper">

                <div id="cancelModalBtn" class="cancelModalBtn" role="button" aria-label="close modal">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </div>

                <h1>Contactez-moi<br>${photographer.name}</h1>

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
            event.stopPropagation();
            inputsTouched = true;
            console.log('Some fields have been touched!');
        });

        // add event on contact btn to call modal contact
        const cancelModalBtn = modalInnerWrapper.querySelector('#cancelModalBtn');
        cancelModalBtn.addEventListener('click', function(event){ photographerPageModule.closeModal(event, mainModalWrapper, inputsTouched) }, false);

        // retrieve all inputs from form
        const form = modalInnerWrapper.querySelector('#contact-form');
        const formInputs = modalInnerWrapper.querySelector('#contact-form').elements;  // = object

        // add event listener on submit input btn, to send all data input to parent module
        const submitBtn = modalInnerWrapper.querySelector('#submitBtn');
        submitBtn.addEventListener('click', function(event){ photographerPageModule.submitForm(event, photog, form, formInputs)});

        // attach modal inner content to modal main wrapper
        mainModalWrapper.appendChild(modalInnerWrapper);

        // Attach stylesheet to component
        this.appendChild(modalStyle);
        // Attach the created elements to the shadow dom
        this.appendChild(mainModalWrapper);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('modal-contact-component', ModalContact);

