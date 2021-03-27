import {MediaItem } from '../utils/mediaItem-model';

export function MediaItemFactory() {
    this.create = ( id, photograperId, ...args) => {
        return new MediaItem(id, photograperId, ...args);
    }
}