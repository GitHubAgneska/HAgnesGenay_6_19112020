export function MediaItemFactory() {
    this.create = ( id, photograperId, ...args) => {
        return new MediaItem(id, photograperId, ...args);
    }
}