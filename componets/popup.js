// Initialize button for collecting the needed data
let collectData = document.querySelector("#collectData");
let showData = document.querySelector("#showData");
let setData = document.querySelector("#setData");

collectData.onclick = async () => {

  // Notify that we are attempting to collect the needed data
  document.querySelector("#collectStatus").innerText = "Collecting...";

  // Change the color of the text
  document.querySelector("#collectStatus").classList.toggle("text-success", false);
  document.querySelector("#collectStatus").classList.toggle("text-info", true);

  chrome.cookies.get({
    "name": "JSESSIONID", 
    "url": "http://oibs.eul.edu.tr/"
  }, 
  function(data) {
    let _data = data.value;
    chrome.storage.sync.set({_data});
  });

  // Notify that we are attempting to collect the needed data
  document.querySelector("#collectStatus").innerText = "Done";
}

// Get the data stored in the extensions storage
showData.onclick = async () => {
  chrome.storage.sync.get("_data", ({_data}) => {
    document.querySelector("#showDataP").style.display = "flex";
    document.querySelector("#showDataP").innerText = _data;
  });
}

// Set the data in the form input for our website
setData.onclick = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setDataPage,
  });
}

let setDataPage = () => {
  chrome.storage.sync.get("_data", ({_data}) => {
    document.querySelector("#sessionID").value = _data;
  });
}
