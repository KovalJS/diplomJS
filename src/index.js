'use strict';

import 'nodelist-foreach-polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import headMenu from './modules/headMenu';
import togglePopup from './modules/togglePopup';
import sendForm from './modules/sendForm';

////Выподающее меню
headMenu();
//popup
togglePopup(); 
//sendForm-ajax
sendForm();