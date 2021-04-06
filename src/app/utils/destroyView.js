

export function destroyView(parent, childToRemove){

    while (parent.firstChild) { parent.removeChild(parent.firstChild); }

    return parent;
}