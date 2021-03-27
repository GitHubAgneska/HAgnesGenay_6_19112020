// import { PhotographerModel } from './photographer-model';

/* 
// 1/ Define skeleton for factory
export function PhotographerFactory() {}

// 2/ Define prototypes & utilities for factory
// a) what the factory is going to generate as a default class
PhotographerFactory.prototype.photographerClass = PhotographerModel;

// b) factory method for creating new instances 
PhotographerFactory.prototype.createPhotographer = function (properties) {
    // if ( options.whatever === "xxx") { this.photographerClass = yyyy } etc
    alert('Photographer Factory called!');
    return new this.photographerClass(properties);
}



// TESTS --- 
export const ArtistFactory = (properties) => { 
    return { properties };
} */

import { Photographer } from '../utils/photographer-model';

export function PhotographerFactory() {
    this.create = ( id, name, ...args) => {
        return new Photographer(id, name, ...args);
    }
}

