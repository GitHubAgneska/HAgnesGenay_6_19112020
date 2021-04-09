
import * as cloneDeep from 'lodash/cloneDeep';

// Using lodash here will allow to sort objects containing TEMPLATES ( ≠ jsonParse+stringify )

export function sortBy(arr, type) { 

    if (type === 'title') {
        let sorted = cloneDeep(arr);
       //  let sorted = JSON.parse(JSON.stringify(arr));
        return (sorted.sort((a, b) => a.title.localeCompare(b.title) ));
    }
    else if (type === 'date') {
        let sorted = cloneDeep(arr);
       //  let sorted = JSON.parse(JSON.stringify(arr));
        return (sorted.sort((a, b) => parseFloat(a.date) - parseFloat(b.date) ));
    }
    else if (type === 'likes') {
        let sorted = cloneDeep(arr);
       //  let sorted = JSON.parse(JSON.stringify(arr));
        return (sorted.sort((a, b) => a.likes - b.likes) );
    }
}