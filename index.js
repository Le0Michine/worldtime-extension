function onInstallClick(event) {
  // var url = "https://chrome.google.com/webstore/detail/worldtime/ibnegikgmnfnmljianjgnhhlcabonobd";
  // chrome.webstore.install(url, successCallback, failureCallback);
  chrome.webstore.install(undefined, successCallback, failureCallback);
}

function successCallback() {
  console.log("success");
  document.getElementById("install-button").style.display="none";
  document.getElementById("link-to-webstore").style.display="block";
}

function failureCallback(...args) {
  console.log("fail", args);
}

if (!chrome.app.isInstalled) {
  document.getElementById("install-button").addEventListener("click", onInstallClick);
  document.getElementById("install-button").style.display="block";
  document.getElementById("link-to-webstore").style.display="none";
}