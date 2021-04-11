
import "./main.scss";
import { PageTemplate } from './app/components/base-page-template';

import { homeModule } from './app/modules/homeModule';
import { photographerPageModule } from './app/modules/photographerPageModule';

//API apiUrl
const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
const mediaAssetsPath = './app/assets/img/';
const portraitAssetsPath = './assets/img/portraits/S/';


// START HOMEPAGE
homeModule.run();

