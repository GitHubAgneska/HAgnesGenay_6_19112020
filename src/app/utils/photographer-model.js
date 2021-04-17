

export class Photographer {
    constructor(id, name, tagline, portrait, url, city, country, price, bottomLikes, template, tagsTemplate, tags){
        
        this.id = id;
        this.name = name;
        this.portrait = portrait; //  = portrait name
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.tags = tags;
        this.tagsTemplate = tagsTemplate; // navtags list - custom html element

        this.url = url; // set up by router
        this.price = price; // price/day
        this.bottomLikes = bottomLikes;

        this.ctemplate = template; // photographer home - custom html element
    }
}