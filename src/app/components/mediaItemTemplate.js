
    // ----------------------------------------------------
    // CUSTOM ELEMENT TEMPLATE FOR IMAGES FROM GALLERY
    // ----------------------------------------------------

const randomPicture_XL_ApiUrl = 'https://picsum.photos/1600/2000?random=';  // + '1' etc


import { photographerPageModule } from '../modules/photographerPageModule';

    // how each photo/video of photographer gallery will be generated as a html template
    export class MediaItemTemplate extends HTMLElement {
        constructor(mediaItem, currentGallery) {
            super();
            
            // append content to UL
            const galleryItem = document.createElement('div');
            galleryItem.setAttribute('class', 'mediaItem');

            let medium = mediaItem; 
            // console.log('MEDIA IN TEMPLATE==', mediaItem);
            galleryItem.setAttribute('data', medium);
            
            // PHOTO WRAPPER
            const mediaWrapper = document.createElement('div');
            mediaWrapper.setAttribute('class', 'pic-wrapper');
            mediaWrapper.setAttribute('tabindex', '0'); // make element tabbable


            //  if original data source for gallery images = local folder 
            /*  <img src="./assets/img/${medium.photographerName}/S/${medium.image}" alt="${medium.altDescription}"> */
            // eslint-disable-next-line no-prototype-builtins
            if ( medium.hasOwnProperty('image') ) {
                mediaWrapper.innerHTML = 
                    ` 
                    <a aria-label="enlarge photo">
                        <img src="https://picsum.photos/1600/2000" alt="alt-pic">
                    </a>
                    `;
            // eslint-disable-next-line no-prototype-builtins
            } else if ( medium.hasOwnProperty('video') ) {
                mediaWrapper.innerHTML = 
                `
                <a aria-label="enlarge video">
                    <video controls>
                        <source src="./assets/img/${medium.photographerName}/${medium.video}" type="video/mp4">
                        <track src="chrome-subtitles-en.vtt" kind="captions" srclang="en" label="english_captions">
                    </video> 
                </a>
                `;
            }

            // add event listener to OPEN LIGHTBOX
            mediaWrapper.addEventListener('click', function(event) {
                mediaItem.id = event.target;
                photographerPageModule.openLightbox(event, medium.id, medium, currentGallery);   // --------- TO REVIEW : currentGallery order = api images order => ≠ sortedBy
            }, false);
            
            // KEYBOARD NAV SUPPORT
            mediaWrapper.addEventListener('keydown', function(event) {
                if ( event.code === 'Enter'|| event.code === 'Space') {
                    photographerPageModule.openLightbox(event, medium.id, medium, currentGallery);
                }
            }, false);


             // PHOTO INFOS WRAPPER
            const mediaInfosWrapper = document.createElement('div');
            mediaInfosWrapper.setAttribute('class', 'mediaItem-infos');
            mediaInfosWrapper.setAttribute('aria-label', 'media item infos');
            
            mediaInfosWrapper.innerHTML =
                `
                    <p class="mediaItem-title">${medium.title}</p>
                    <p class="mediaItem-price">${medium.price}€</p>
                    <div class="mediaItem-likes">
                        <p class="mediaItem-likes-count" data="likes">${medium.likes}</p>
                        <img tabindex="0" class="mediaItem-likes-icon heart-icon" aria-label="increase likes by one" src="./assets/icons/heart-icon.png">
                    </div>
                `;
            
            // increment LIKES
            let likes = medium.likes; // default value
            const likesCount = mediaInfosWrapper.querySelector('.mediaItem-likes-count');
            const heartLikes = mediaInfosWrapper.querySelector('.mediaItem-likes-icon');

            heartLikes.addEventListener('click', function() {
                likes += 1;
                likesCount.innerHTML=`${likes} `;
            });

            // KEYBOARD NAV SUPPORT
            mediaInfosWrapper.setAttribute('tabindex', '0'); // make element tabbable
            // KEYBOARD NAV SUPPORT
            mediaInfosWrapper.addEventListener('keydown', function(event) {
                let target = event.target;
                // media item infos > ENTER
                if ( event.code === 'Enter'|| event.code === 'Space') {
                    // FOCUS GOES TO HEART ICON
                    let icon = event.target.lastElementChild.lastElementChild;
                    target.blur();
                    icon.focus();

                    icon.addEventListener('keydown', function(event){
                        if ( event.code === 'Enter'|| event.code === 'Space') {
                            icon.click();
                        }
                    }, false);
                }
            });

            // attach image/video wrapper to media item wrapper in first position
            galleryItem.insertAdjacentElement('afterbegin',mediaWrapper);
            galleryItem.appendChild(mediaInfosWrapper);
            // galleryItem.appendChild(mediaItemStyle);

            // Attach stylesheet to component
            // shadow4.appendChild(mediaItemStyle);
            // Attach the created elements to the shadow dom
            this.appendChild(galleryItem);
            // shadow4.appendChild(galleryItem);

            // attach each photo item to gallery => happens in photographer module
            // galleryWrapperSection.appendChild(galleryItem);
            }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('media-item-component', MediaItemTemplate);

