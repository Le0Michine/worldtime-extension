function onInstallClick(event) {
  // var url = "https://chrome.google.com/webstore/detail/worldtime/ibnegikgmnfnmljianjgnhhlcabonobd";
  // chrome.webstore.install(url, successCallback, failureCallback);
  chrome.webstore.install(undefined, successCallback, failureCallback);
}

function successCallback() {
  console.log("success");
}

function failureCallback(...args) {
  console.log("fail", args);
}

document.getElementById("install-button").addEventListener("click", onInstallClick);