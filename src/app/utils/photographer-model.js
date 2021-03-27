
const portraitAssetsPath = './app/assets/img/portraits/S/';

export class Photographer {
    constructor(id, name, tagline, portraitName, portraitSrc, url, city, country, price, bottomLikes, template, tagsTemplate, tags){
        
        id = id;
        name = name;
        portraitName = portraitName; //  = pic name
        portraitSrc = portraitAssetsPath + portraitName;   // => img src="./assets/img/portraits/S/" + "portraitName"
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