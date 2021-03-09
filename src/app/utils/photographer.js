// PHOTOGRAPHER CUSTOM HTML ELEMENT

class Photographer extends HTMLElement {
    constructor() {
        super();

        // retrieve data to inject into template
        // ( mock data )
        const photographerName = 'test';
        const idPicUrl = "assets/img/Photographers_ID_photos/S/EllieRoseWilkens_S.jpg";
        const photographerPageUrl = "";
        const photographerLocation = "Paris";
        const photographerTagline = "get shit done";
        const photographerPrice = 78 + "€";

        // link component to main stylesheet
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/style.css');

        // create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // create component main container div
        const photographerWrapper = document.createElement('div');

        // set main container div attributes/properties
        photographerWrapper.setAttribute('class', 'photographer photographer--home');
        photographerWrapper.setAttribute('id', 'photographer-'+ photographerName); // + name
        photographerWrapper.setAttribute('aria-label', photographerName + ' presentation');


        // create clickable photographer main presentation block (name+pic)
        const photographerMainBlock = photographerWrapper.appendChild(document.createElement('div'));
        photographerMainBlock.setAttribute('class', 'photographer__main-block');
        photographerMainBlock.innerHTML = `
            <a href="${photographerPageUrl}" aria-label="go to ${photographerName} page">
                <img class="photographer__pic home" src="${idPicUrl}" alt="${photographerName} presentation picture" id="${photographerName}-pres-picture">
                <h2 class="photographer__name home" id="${photographerName}">${photographerName}</h2>
            </a>
            `;
        
        // create photographer infos block main presentation block
        const photographerInfosBlock = photographerWrapper.appendChild(document.createElement('div'));
        photographerInfosBlock.setAttribute('class', 'photographer__text-infos');
        photographerInfosBlock.setAttribute('aria-label', 'photographer infos');
        photographerInfosBlock.innerHTML = `
                    <h3 class="photographer__location home" id="${photographerName}-location">${photographerLocation}</h3>
                    <h4 class="photographer__tagline home" id="${photographerName}-tagline">${photographerTagline}</h4>
                    <h5 class="photographer__price home" id="${photographerName}-price">${photographerPrice}</h5>
                    <div class="photographer__tags-list tags-list home" id="${photographerName}-tags">
                        <a href="" class="nav-tag" id="nav-tag">rerere</a>
                        <a href="" class="nav-tag" id="nav-tag">rerere</a>
                        <a href="" class="nav-tag" id="nav-tag">Ibvvv</a>
                    </div>
        `;

        // Attach stylesheet to component
        shadow.appendChild(style);
        // Attach the created elements to the shadow dom
        shadow.appendChild(photographerWrapper);
    }
}


// register custom element in the built-in CustomElementRegistry object
customElements.define('photographer-component', Photographer);