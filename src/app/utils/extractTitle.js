

// ex : "Fashion_Yellow_Beach.jpg" =>  "Fashion Yellow Beach"

export function extractImageTitle(imageTitle) { 

    let processedTitle = '';
    for ( let char of imageTitle ) { 
        if (char === '_') { char = ' '; }
        if ( char === '.' ) { return;  }
        processedTitle+= char;
    }
    console.log('processedTitle=', processedTitle);
    return processedTitle;
} 