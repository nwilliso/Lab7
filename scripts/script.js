// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

// Click on cog to go to settings
document.querySelector('[alt="settings"]').addEventListener('click', () => {
  setState({name: 'Settings'}, false);
});

// Click on header to go back home
document.querySelector('h1').addEventListener('click', () => {
  setState({name: 'Home'}, false);
});

// Click on entry to go to that entry
document.querySelector('main').addEventListener('click', (event) => {
  let i = 1;
  let child = event.target.previousSibling
  while ( child != null){
    i++;
    child = child.previousSibling;
  }
  //console.log(event.target);
  setState({name: 'Entry', id: i, entry: event.target.entry}, false);
});

// Click on forward or backwards
window.addEventListener('popstate', () => {
  // for first time entering site
  if (history.state == null){
    setState({name: 'Home'}, true);
  
  // for any other time
  } else {
    setState(history.state, true);
  }
});

// FROM SERVICE WORKER TUTORIAL LINK
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
// END FROM https://developers.google.com/web/fundamentals/primers/service-workers