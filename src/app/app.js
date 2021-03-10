import { Photographer } from './utils/photographer';
import { PhotographerModel, PhotographerFactory } from './utils/photographerFactory';


// Create an instance of factory that makes photographers
var photographerFact = new PhotographerFactory();
// var photog = photographerFact.createPhotographer(properties); 



// HERE LIVES THE CODE THAT STARTS THE APP and WILL BE CALLED IN INDEX.JS
// ------ ====== -------
export function startInitHomePage(photographerFact){
    photographerFact.createPhotographer("JOJO", "BLABLA"); 
}





// Retrieve data from json
//------------------------------

// HOMEPAGE : photographers list
//------------------------------


// For each photographer of list, generate new photographer component
// using class Photographer
//------------------------------