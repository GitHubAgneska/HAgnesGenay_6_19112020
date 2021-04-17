
// ----------------------------------------------------
// MODAL CONTACT - CONFIRM BOX  ---PHOTOGRAPHER PAGE
// ----------------------------------------------------
import {photographerPageModule} from '../modules/photographerPageModule';
import {keyAction} from '../utils/accessibilitySupport';


export class ConfirmBox extends HTMLElement {
    constructor(type) {
        super();

        let confirmationType = type;
        this.setAttribute('data', confirmationType);

        if (confirmationType === 'cancelModal') {

            this.innerHTML = 
            `<div tabindex="0" class="confirBox-cancelModal" id="confirBox-cancelModal">
                <h2>Are you sure you want to close form?</h2>
                <div class="btns-wrapper">
                    <button tabindex="0" class="main-btn btn--confirm yes" id="yes-btn">yes</button>
                    <button tabindex="0" class="main-btn btn--confirm no" id="no-btn">no</button>
                </div> 
            </div>`;

            // add events on yes/no btns
            const yesBtn = this.querySelector('#yes-btn');
            yesBtn.onclick = (event) => {photographerPageModule.closeModal(event, false);};
            yesBtn.addEventListener('keydown', function(event){ 
                let yes = event.target;

                if ( event.code === 'Enter' || event.code === 'Space') { yes.click();}
                if ( event.code === 'ArrowRight' || event.code === 'ArrowDown' ) {
                    if (yes.nextSibling && yes.nextSibling!== null) {
                        yes.nextElementSibling.focus();
                        keyAction(yes.nextElementSibling);
                    }
                }
            }, false);

            const noBtn = this.querySelector('#no-btn');
            const elToRemove = this.querySelector('#confirBox-cancelModal');
            const elParent = this;
            noBtn.onclick = (event) => { photographerPageModule.closeConfirmBox(event, elParent, elToRemove ); }; 
            noBtn.addEventListener('keydown', function(){ noBtn.click(); }, false); 
        }
        else if (confirmationType === 'closeModalAfterSubmitted') {

            this.innerHTML =
            `<div tabindex="0" class="confirmation-message-wrapper" id="confirmation-message-wrapper">
                <h1 class="confirmation-message">Votre demande de contact a bien été transmise!</h1>
                <button tabindex="0" class="main-btn btn--confirm no" id="finish-btn">Terminer</button>
            </div>`;

            // add event on 'terminer' btn
            const finishBtn = this.querySelector('#finish-btn');
            const mainModalWrapper = this.parentNode;
            finishBtn.onclick = (event) => { photographerPageModule.closeModal(event, mainModalWrapper, false); };
            finishBtn.onkeydown = () => finishBtn.click();
        }
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('confirm-box-component', ConfirmBox);





