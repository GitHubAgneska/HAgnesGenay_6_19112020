import { MediaItem } from '../utils/mediaItem-model';

export function MediaItemFactory() {
    this.create = ( id, photographerId, ...args) => {
        return new MediaItem(id, photographerId, ...args);
    };
}