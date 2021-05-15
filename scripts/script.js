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
  setState({name: 'Entry', id: event.target.id, entry: event.target.entry}, false);
});

// Click on forward or backwards
window.addEventListener('popstate', () => {
  setState(history.state, true);
});