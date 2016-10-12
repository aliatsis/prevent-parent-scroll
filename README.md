# prevent-parent-scroll

##Description:
Prevent scroll of an HTML Element from bubbling to its parents.
It is vanilla JS and Typescript compatible.

##Usage:

```
// ES6 import
import PreventParentScoll from 'prevent-parent-scroll';

// ES5 import
var PreventParentScoll = require('prevent-parent-scroll').default;

// use your own scrolling element
let scrollingElement = document.querySelector('.my-scrolling-element');

// initialize the PreventParentScoll class by pasing the scrolling element
let preventParentScroll = new PreventParentScoll(scrollingElement);

// start() will set up event bindings and begin preventing mousewheel events from bubbling at scroll boundaries
let preventParentScroll.start();

// stop() will remove all event bindings and stop preventing mousewheel events from bubbling at scroll boundaries
let preventParentScroll.stop();

```