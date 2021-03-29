/* // --------------------------------------------------------------------------------------------------------
// when user clicks on a tag ( main navigation or photographer tagslist)
// the homepage view is updated, to display a list of photographers 
// sorted by clicked tag name 
// --------------------------------------------------------------------------------------------------------
import { initializeData } from '../../index';

const url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';

export function updateHomePageView(navTag) {
    // store tag name for sorting
    var sortingTerm = navTag;

    // define homepage content
    const photographersList = document.querySelector('.photographers');
    // remove eveything that's displayed by default
    while (photographersList.firstChild) {photographersList.removeChild(photographersList.firstChild)}

    // re-fetch all data & use existing 'initializePhotographers(photographers)'
    // but with an additional parameter 'tag' (=searchterm)
    fetch(url)
    .then(response => response.json())
    .then(json => {
        let photographers = json.photographers;
        filterPhotographers(photographers, sortingTerm);
    });  
}

function filterPhotographers(photographers, sortingTerm){ 
        var filtered = photographers.filter(x => x.tags.includes(sortingTerm));
        initializeData(filtered);
}
 */