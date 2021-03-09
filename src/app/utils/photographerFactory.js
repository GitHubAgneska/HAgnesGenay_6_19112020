
// PhotographerModel constructor
function PhotographerModel(properties) {

    this.photographerName = properties.photographerName;
    this.idPicUrl = properties.idPicUrl;
    this.photographerPageUrl = properties.photographerPageUrl;
    this.photographerLocation = properties.photographerLocation;
    this.photographerTagline = properties.photographerTagline;
    this.photographerPrice = properties.photographerPrice;
    this.photographerTagsList = properties.photographerTagsList;
    this.photographerLikes = properties.photographerLikes;
    this.photographerPics = properties.photographerPics;

}

// 1/ Define skeleton for factory
function PhotographerFactory() {}

// 2/ Define prototypes & utilities for factory
//      a) what the factory is going to generate as a default class
PhotographerFactory.prototype.photographerClass = PhotographerModel;
//      b) factory method for creating new instances 
PhotographerFactory.prototype.createPhotographer = function (properties) {
    // if ( options.whatever === "xxx") { this.photographerClass = yyyy } etc
    return new this.photographerClass(properties);
}
// 3/ Create an instance of factory that makes photographers
var photographerFact = new PhotographerFactory();
var photog = photographerFact.createPhotographer(properties);