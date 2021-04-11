// ----------------------------------------------------
// MODAL CONTACT - CONFIRM BOX  ---PHOTOGRAPHER PAGE
// ----------------------------------------------------
import { photographerPageModule } from '../modules/photographerPageModule';

export class ConfirmBox extends HTMLElement {
    constructor(type) {
        super();

        // link component to main stylesheet
        const confirmBoxStyle = document.createElement('link');
        confirmBoxStyle.setAttribute('rel', 'stylesheet');
        confirmBoxStyle.setAttribute('href', './main.css');
        confirmBoxStyle.setAttribute('type', 'text/css');

        let confirmationType = type;
        this.setAttribute('data', confirmationType);

        if (confirmationType === 'cancelModal') {

            this.innerHTML = 
            `<div class="confirBox-cancelModal" id="confirBox-cancelModal">
                <h2>Are you sure you want to close form?</h2>
                <div class="btns-wrapper">
                    <button class="main-btn btn--confirm yes" id="yes-btn">yes</button>
                    <button class="main-btn btn--confirm no" id="no-btn">no</button>
                </div> 
            </div>`;

            // add events on yes/no btns
            const yesBtn = this.querySelector('#yes-btn');
            yesBtn.onclick = (event) => {  photographerPageModule.closeModal(event, false); };

            const noBtn = this.querySelector('#no-btn');
            const elToRemove = this.querySelector('#confirBox-cancelModal');
            const elParent = this;
            noBtn.onclick = (event) => { photographerPageModule.closeConfirmBox(event, elParent, elToRemove ); }; 
        }

        else if (confirmationType === 'closeModalAfterSubmitted') {

            this.innerHTML =
            `<div class="confirmation-message-wrapper" id="confirmation-message-wrapper">
                <h1 class="confirmation-message">Votre demande de contact a bien été transmise!</h1>
                <button class="main-btn btn--confirm no" id="finish-btn">Terminer</button>
            </div>`;

            // add event on 'terminer' btn
            const finishBtn = this.querySelector('#finish-btn');
            const mainModalWrapper = this.parentNode;
            finishBtn.onclick = (event) => { photographerPageModule.closeModal(event, mainModalWrapper, false); };
        }

        this.appendChild(confirmBoxStyle);
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('confirm-box-component', ConfirmBox);





