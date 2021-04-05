export class ConfirmBox extends HTMLElement {
    constructor() {
        super();

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



