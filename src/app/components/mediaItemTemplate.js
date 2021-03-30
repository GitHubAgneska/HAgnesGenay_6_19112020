
    // ----------------------------------------------------
    // CUSTOM ELEMENT TEMPLATE FOR IMAGES FROM GALLERY
    // ----------------------------------------------------

    // how each photo/video of photographer gallery will be generated as a html template
    export class MediaItemTemplate extends HTMLElement {
        constructor(mediaItem) {
            super();

            // create a shadow root
            const shadow4 = this.attachShadow({mode: 'open'});
            
            // append content to UL
            const galleryItem = document.createElement('li');
            galleryItem.setAttribute('class', 'photo-item');

            let medium = mediaItem; 
            console.log('MEDIA IN TEMPLATE==', mediaItem);
            galleryItem.setAttribute('data', medium);
            
            // link component to main stylesheet  ============> does not work in webpack
            const stylePhoto = document.createElement('link');
            // stylePhoto.setAttribute('rel', 'stylesheet'); //======> else nodejs bug 'type mismatch'
            stylePhoto.setAttribute('href', './css/style.css');
            stylePhoto.setAttribute('type', 'text/css');

            const mediaWrapper = document.createElement('div');
            mediaWrapper.setAttribute('class', 'pic-wrapper');
            galleryItem.appendChild(mediaWrapper);

            if ( medium.hasOwnProperty('image') ) {
                mediaWrapper.innerHTML = 
                    ` 
                    <a aria-label="enlarge photo">
                        <img src="./assets/img/${medium.photographerName}/S/${medium.image}" alt="${medium.imageName}">
                    </a>
                    `
            } else if ( medium.hasOwnProperty('video') ) {
                mediaWrapper.innerHTML = 
                `
                <a aria-label="enlarge photo">
                    <video width="320" height="240" controls>
                        <source src="./assets/img/${medium.photographerName}/${medium.video}" type="video/mp4">
                    </video> 
                </a>
                `
            }

            galleryItem.innerHTML =
                `
                    <div class="photo-infos" aria-label="photo infos">
                        <h5 class="photo-title" id="photo-title">${medium.image}</h5>
                        <h5 class="photo-price" id="photo-price">${medium.price}</h5>
                        <h5 class="photo-likes" id="photo-likes">${medium.likes}</h5>
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
    customElements.define('media-item-component', MediaItemTemplate);

