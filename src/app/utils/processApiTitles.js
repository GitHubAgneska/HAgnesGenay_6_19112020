/* ============================================== */
/* PROCESS API MEDIA ITEM NAMES TO DISPLAY TITLES */
/* ============================================== */

// ex: api incoming image (name) = 'Event_WeddingGazebojpg'   ! tagname API TYPOS   = 'eventS'  /  'porTait
//                                  ==> title = 'Wedding Gazebo' 

export function processTitle(mediaItemName, mediaItemTag) {

    if ( mediaItemName && mediaItemTag ) {  // check entry data not null

        // correct tagName coming from api to match image tag
        if (mediaItemTag === 'events') { mediaItemTag = 'event'; }
        if (mediaItemTag === 'portait') { mediaItemTag = 'portrait'; }

        let nameToProcess = mediaItemName;

        // remove tagName
        let tagToremove = mediaItemTag;
        let tagToremoveLength = tagToremove.length + 1; // +1 for underscore
        let mediaItemNameProcessed = nameToProcess.slice(tagToremoveLength);
    
        // replace underscores with spaces
        let extensionStartIndex;
        let indexesWhereSpacesWillGo = [];
        let indexesWhereAdditionalSpacesWillGo = [];
    
        mediaItemNameProcessed = mediaItemNameProcessed.split(''); // name to array    
        for (let i = 1; i < mediaItemNameProcessed.length; i++) {
    
            if (mediaItemNameProcessed[i].toUpperCase()) { // mark where uppercases
    
                if ( mediaItemNameProcessed[i - 1] === '_' ) { // mark where underscores
                    indexesWhereSpacesWillGo.push( i - 1 );   // mark where change will happen
                } 
                else if ( mediaItemNameProcessed[i - 1].match(/[a-z]/i)  ) { // mark where there should a space (letter before uppercase)
                    indexesWhereAdditionalSpacesWillGo.push( i - 1 );
                }
            }
            // remove extensions to display img/video titles
            if (mediaItemNameProcessed[i] == '.') { extensionStartIndex = i; }
        }
        
        indexesWhereSpacesWillGo.forEach( i => {mediaItemNameProcessed[i]= ' '; });
        // indexesWhereAdditionalSpacesWillGo.forEach( i => { }); 

        let result =  mediaItemNameProcessed.join('').slice(0, extensionStartIndex);
        // console.log(result);
        return result;

    } else return;
}
