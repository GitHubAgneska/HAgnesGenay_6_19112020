
    // ----------------------------------------------------
    // CUSTOM ELEMENT TEMPLATE FOR IMAGES FROM GALLERY
    // ----------------------------------------------------

    // how each photo of photographer gallery will be generated as a html template
    class MediaItemTemplate extends HTMLElement {
        constructor() {
            super();

            // link component to main stylesheet  ============> does not work in webpack
            const stylePhoto = document.createElement('link');
            // stylePhoto.setAttribute('rel', 'stylesheet'); //======> else nodejs bug 'type mismatch'
            stylePhoto.setAttribute('href', './css/style.css');
            stylePhoto.setAttribute('type', 'text/css');

            // create a shadow root
            const shadow4 = this.attachShadow({mode: 'open'});
            
            const galleryWrapperSection = document.querySelector('#photos-list');
            
            // append content to UL
            const photoItem = document.createElement('li');
            photoItem.setAttribute('class', 'photo-item');

            mediaItem.innerHTML = `

                    <div class="pic-wrapper">
                        <a aria-label="enlarge photo" href="">
                            <img src="./assets/img/${photographer.name}/S/${media.imageName}" alt="${media.imageTitle}">
                        </a>
                    </div>
                    <div class="photo-infos" aria-label="photo infos">
                        <h5 class="photo-title" id="photo-title">${media.imageTitle}</h5>
                        <h5 class="photo-price" id="photo-price">${media.price}</h5>
                        <h5 class="photo-likes" id="photo-likes">${media.imageLikes}</h5>
                        <button>
                            <img class="like-icon" src="./assets/icons/heart-icon.png" alt="heart icon">
                        </button>
                    </div>
            `;
        
        // Attach stylesheet to component
        shadow4.appendChild(stylePhoto);
        // Attach the created elements to the shadow dom
        shadow4.appendChild(mediaItem);
        // attach each photo item to gallery
        galleryWrapperSection.appendChild(mediaItem);
        
        }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('photo-component', MediaItemTemplate);

