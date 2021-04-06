/* ============================================== */
/* PROCESS API NAME TYPOS TO DISPLAY CORRECT DATA */
/* ============================================== */

// ex: api incoming image (name) = 'Event_WeddingGazebojpg' 
//                              ==> src = 'Event_Wedding_Gazebo.jpg' 
//                              ==> title = 'Wedding Gazebo' 


// make sure extensions are correctly formatted ( otherwise won't be displayed as src)
// add underscore if missing before uppercase

export function processTitle(mediaItemName, mediaItemTag) {

    if ( mediaItemName && mediaItemTag ) {  // check entry data not null

        let nameToProcess = mediaItemName;

        // remove tagName
        let tagToremove = mediaItemTag;
        let tagToremoveLength = tagToremove.length + 1; // +1 for underscore
        let mediaItemNameProcessed = nameToProcess.slice(tagToremoveLength);
    
        // replace underscores with spaces
        let extensionStartIndex;
        let indexesWhereSpacesWillGo = [];
    
        mediaItemNameProcessed = mediaItemNameProcessed.split(''); // name to array    
        for (let i = 1; i < mediaItemNameProcessed.length; i++) {
    
            if (mediaItemNameProcessed[i].toUpperCase()) { // mark where uppercases
    
                if ( mediaItemNameProcessed[i - 1] === '_' ) { // mark where underscores
                    indexesWhereSpacesWillGo.push( i - 1 );   // mark where change will happen
                } 
            }
            // remove extensions to display img/video titles
            if (mediaItemNameProcessed[i] == '.') { extensionStartIndex = i; }
        }
        
        indexesWhereSpacesWillGo.forEach( i => {mediaItemNameProcessed[i]= ' '; });

        let result =  mediaItemNameProcessed.join('').slice(0, extensionStartIndex);
        // console.log(result);
        return result;

    } else return;
}
