
import "./main.scss";

import { homeModule } from './app/modules/homeModule';
import { photographerPageModule } from './app/modules/photographerPageModule';

//API apiUrl
const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
const mediaAssetsPath = './app/assets/img/';
const portraitAssetsPath = './assets/img/portraits/S/';


// START HOMEPAGE
homeModule.run();
// window.DOMContentLoaded = () => homeModule.run();
console.log('window.location.pathname==', window.location.pathname)





/* 
const routes = { 
    '/': homeModule,
    '/photographer': photographerPageModule
}

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname].run();
// rootDiv.innerHTML = routes[window.location.pathname];

export const navigateTo = (pathname) => {
    window.history.pushState( {}, pathname, window.location.origin + pathname);
    rootDiv.innerHTML = routes[pathname];
}
window.onpopstate = () => { rootDiv.innerHTML = routes[window.location.pathname]};

// Listen on hash change:
window.addEventListener('hashchange', function(){console.log('route changed!')});
// Listen on page load:
window.addEventListener('load', function(){console.log('page loaded!')}); */



// store routes
/* var routes = {};

// route registering function
function route (path, templateId, controller) {
    routes[path] = { templateId: templateId, controller: controller };
}

route('/', 'homepage', function () { homeModule.run(); });
route('/home', 'homepage', function () { homeModule.run(); });
route('/photographer', 'photographerPage', function () { photographerPageModule.run(); });

var el = null;

function router () {
    // load container view element
    el = el || document.getElementById('root');
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    // Get route by url:
    var route = routes[url];
    // Do we have both a view and a route?
    if (el && route.controller) {
        // Render route template
        el.innerHTML = ;
    }
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router); */

/* 
const router = () => {
    // Find the component based on the current path
    const path = parseLocation(); console.log('LOCATION==', path);
    // If there's no matching route, get the "Error" component
    // const { component = HomeComponent } = findComponentByPath(path, routes) || {};
    // Render the component in the "app" placeholder
    document.getElementById('app').innerHTML = component.run();

};

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`))) || undefined;


 */
