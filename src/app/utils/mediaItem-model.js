export class MediaItem {
    constructor(id, photographerId, tags, image, video, likes, date, price, title, altDescription) {
        this.id = id;
        this.photographerId = photographerId;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
        this.image = image;
        this.video = video;
        this.title = title;
        this.altDescription = altDescription;
    }
}