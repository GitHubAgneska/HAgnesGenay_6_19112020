
import { Photographer } from '../utils/photographer-model';

export function PhotographerFactory() {
    this.create = ( id, name, ...args) => {
        return new Photographer(id, name, ...args);
    }
}

