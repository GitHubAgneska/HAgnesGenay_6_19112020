

export function destroyView(parent){

    while (parent.firstChild) { parent.removeChild(parent.firstChild); }

    return parent;
}