// ----------------------------------------------------
// MODAL CONTACT - CONFIRM BOX  ---PHOTOGRAPHER PAGE
// ----------------------------------------------------
import { photographerPageModule } from '../modules/photographerPageModule';

export class ConfirmBox extends HTMLElement {
    constructor(type) {
        super();

        const typeOfConfirmation = type;
        this.setAttribute('data', typeOfConfirmation);

        if (typeOfConfirmation === 'cancelModal') {

            this.innerHTML = 
            `
                <div class="confirBox-cancelModal" id="confirBox-cancelModal">
                <h2>Are you sure you want to close form?<br>You will loose your informations</h2>
                <div class="btns-wrapper">
                    <button class="btn btn--confirm yes" id="yes-btn">yes</button>
                    <button class="btn btn--confirm no" id="no-btn">no</button>
                </div> 
                </div>
            `;

            // add events on yes/no btns
            const yesBtn = this.querySelector('#yes-btn');
            yesBtn.onclick = () => {  photographerPageModule.closeModal(e, mainModalWrapper, false); }; 
        }

        if (typeOfConfirmation === 'closeModalAfterSubmitOk') {

            this.innerHTML = `
            <div class="confirmation-message-wrapper" id="confirmation-message-wrapper">
                <h1 class="confirmation-message">Votre demande de contact a bien été prise en compte!</h1>
            </div>
            <button class="btn btn--confirm no" id="finish-btn">Terminer</button>
            `;

            // add event on 'terminer' btn
            const finishBtn = this.querySelector('#finish-btn');
            finishBtn.onclick = () => { photographerPageModule.closeModal(e, mainModalWrapper, false); };
        }


        // link component to main stylesheet
        const confirmBoxStyle = document.createElement('link');
        confirmBoxStyle.setAttribute('rel', 'stylesheet');
        confirmBoxStyle.setAttribute('href', './main.css');
        confirmBoxStyle.setAttribute('type', 'text/css');

        this.appendChild(confirmBoxStyle);
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('confirm-box-component', ConfirmBox);





