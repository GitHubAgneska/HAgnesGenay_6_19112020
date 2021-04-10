

export class Photographer {
    constructor(id, name, tagline, portrait, url, city, country, price, bottomLikes, template, tagsTemplate, tags){
        
        id = id;
        name = name;
        portrait = portrait; //  = portrait name
        city = city;
        country = country;
        tagline = tagline;
        tags = tags;
        tagsTemplate = tagsTemplate; // navtags list - custom html element

        url = url; // set up by router
        price = price; // price/day
        bottomLikes = bottomLikes;

        template = template; // photographer home - custom html element
    }
}