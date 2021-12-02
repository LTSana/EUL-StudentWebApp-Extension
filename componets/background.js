// background.js

let data = '';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ data });
});
