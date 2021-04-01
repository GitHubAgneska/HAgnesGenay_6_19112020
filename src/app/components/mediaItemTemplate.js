
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
            galleryItem.setAttribute('class', 'mediaItem');

            let medium = mediaItem; 
            // console.log('MEDIA IN TEMPLATE==', mediaItem);
            galleryItem.setAttribute('data', medium);
            
            // link component to main stylesheet
            const mediaItemStyle = document.createElement('link');
            mediaItemStyle.setAttribute('rel', 'stylesheet');
            mediaItemStyle.setAttribute('href', './main.css');
            mediaItemStyle.setAttribute('type', 'text/css');
            // galleryItem.appendChild(mediaItemStyle);


            // PHOTO WRAPPER
            const mediaWrapper = document.createElement('div');
            mediaWrapper.setAttribute('class', 'pic-wrapper');
            

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
                    <video controls>
                        <source src="./assets/img/${medium.photographerName}/${medium.video}" type="video/mp4">
                    </video> 
                </a>
                `
            }

             // PHOTO INFOS WRAPPER
            const mediaInfosWrapper = document.createElement('div');
            mediaInfosWrapper.setAttribute('class', 'mediaItem-infos');
            mediaInfosWrapper.setAttribute('aria-label', 'media item infos');

            mediaInfosWrapper.innerHTML =
                `
                    <h5 class="mediaItem-title" id="mediaItem-title">${medium.image || medium.video}</h5>
                    <h5 class="mediaItem-price" id="mediaItem-price">${medium.price}€</h5>
                    <div class="mediaItem-likes">
                        <h5 id="mediaItem-likes">${medium.likes}</h5>
                        <img class="heart-icon" src="./assets/icons/heart-icon.png">
                    </div>
                `;
        
            // attach image/video wrapper to media item wrapper in first position
            galleryItem.insertAdjacentElement('afterbegin',mediaWrapper);
            galleryItem.appendChild(mediaInfosWrapper);
            galleryItem.appendChild(mediaItemStyle);

            // Attach stylesheet to component
            shadow4.appendChild(mediaItemStyle);
            // Attach the created elements to the shadow dom
            shadow4.appendChild(galleryItem);

            // attach each photo item to gallery => happens in photographer module
            // galleryWrapperSection.appendChild(galleryItem);
            }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('media-item-component', MediaItemTemplate);

