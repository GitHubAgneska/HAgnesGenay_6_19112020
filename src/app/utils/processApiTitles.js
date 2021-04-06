/* ============================================== */
/* PROCESS API NAME TYPOS TO DISPLAY CORRECT DATA */
/* ============================================== */

// ex: api incoming image (name) = 'Event_WeddingGazebojpg' 
//                              ==> src = 'Event_Wedding_Gazebo.jpg' 
//                              ==> title = 'Wedding Gazebo' 


// make sure extensions are correctly formatted ( otherwise won't be displayed as src)
// add underscore if missing before uppercase

export function processTitle(mediaItemName, mediaItemTag) {

    console.log(mediaItemName)

    // remove tagName
    var tagToremove = mediaItemTag;
    tagToremoveLength = tagToremove.length + 1; // +1 for underscore
    mediaItemNameProcessed = mediaItemName.slice(tagToremoveLength);
    console.log(mediaItemNameProcessed)

    var extensionStartIndex;

    mediaItemNameProcessed = mediaItemNameProcessed.split('');
    console.log(mediaItemNameProcessed)

    for (var i = 1; i < mediaItemNameProcessed.length; i++) {

        if (mediaItemNameProcessed[i].toUpperCase()) {

            if ( mediaItemNameProcessed[i - 1] === '_' ) {
                mediaItemNameProcessed[i - 1] = ' ';
            } 
            /* else { // if char before uppercase is a letter
                mediaItemNameProcessed[i] = ' ' + mediaItemNameProcessed[i]; // add space before uppercase
                console.log('mediaItemNameProcessed[i]=', mediaItemNameProcessed[i]);
            } */
        }
        // remove extensions to display img/video titles
        if (mediaItemNameProcessed[i] == '.') { extensionStartIndex = i; }
    }
    mediaItemNameProcessed = mediaItemNameProcessed.join('').slice(0, extensionStartIndex);
    console.log(mediaItemNameProcessed);
    return mediaItemNameProcessed;
}
