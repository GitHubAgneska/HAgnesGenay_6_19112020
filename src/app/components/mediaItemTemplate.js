
    // ----------------------------------------------------
    // CUSTOM ELEMENT TEMPLATE FOR IMAGES FROM GALLERY
    // ----------------------------------------------------

    // how each photo of photographer gallery will be generated as a html template
    export class MediaItemTemplate extends HTMLElement {
        constructor(mediaItemObject) {
            super();

            let mediaItem = mediaItemObject;

            // link component to main stylesheet  ============> does not work in webpack
            const stylePhoto = document.createElement('link');
            // stylePhoto.setAttribute('rel', 'stylesheet'); //======> else nodejs bug 'type mismatch'
            stylePhoto.setAttribute('href', './css/style.css');
            stylePhoto.setAttribute('type', 'text/css');

            // create a shadow root
            const shadow4 = this.attachShadow({mode: 'open'});
            
            // const galleryWrapperSection = document.querySelector('#photos-list');
            
            // append content to UL
            const galleryItem = document.createElement('li');
            galleryItem.setAttribute('class', 'photo-item');
            galleryItem.setAttribute('data', mediaItem);

            galleryItem.innerHTML = `

                    <div class="pic-wrapper">
                        <a aria-label="enlarge photo" href="">
                            <img src="./assets/img/${mediaItem.photographerName}/S/${mediaItem.imageName}" alt="${mediaItem.imageName}">
                        </a>
                    </div>
                    <div class="photo-infos" aria-label="photo infos">
                        <h5 class="photo-title" id="photo-title">${mediaItem.imageTitle}</h5>
                        <h5 class="photo-price" id="photo-price">${mediaItem.price}</h5>
                        <h5 class="photo-likes" id="photo-likes">${mediaItem.imageLikes}</h5>
                        <button>
                            <img class="like-icon" src="./assets/icons/heart-icon.png" alt="heart icon">
                        </button>
                    </div>
            `;
        
        // Attach stylesheet to component
        shadow4.appendChild(stylePhoto);
        // Attach the created elements to the shadow dom
        shadow4.appendChild(galleryItem);
        // attach each photo item to gallery
        // galleryWrapperSection.appendChild(galleryItem);
        
        }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('photo-component', MediaItemTemplate);

