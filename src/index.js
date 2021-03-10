import { startInitHomePage } from './app/app';
import "./main.scss";
import { Photographer } from './app/utils/photographer';
import { PhotographerModel, PhotographerFactory } from './app/utils/photographerFactory';


// TESTS --- 
// import { ArtistFactory } from './app/utils/photographerFactory';


// alert("HELLO FRIEND");

// make a new artist from model/cutom element
var artist = new Photographer();
// Create an instance of factory that makes photographers
var photographerFact = new PhotographerFactory();

// TESTS --- 
// var newArtist = ArtistFactory('Walter', 'White');
// alert(newArtist);

// run app from here
startInitHomePage(photographerFact);