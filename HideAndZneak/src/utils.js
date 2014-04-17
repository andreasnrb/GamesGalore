function asset_preload(o) {
    if (Array.isArray(o))
        o.map(asset_preload);
    else
        o.preload();
}

function asset_create(o) {
    if (Array.isArray(o))
        o.map(asset_create);
    else
        o.create();
}

function asset_update(o) {
    if (Array.isArray(o))
        o.map(asset_update);
    else
        o.update();
}

function asset_render(o) {
    if (Array.isArray(o))
        o.map(asset_update);
    else if(o.render)
        o.render();
}

function distanceBetweenCoords(x0,y0,x1,y1) {
    return Math.sqrt((x0-x1)*(x0-x1)+(y0-y1)*(y0-y1));
}