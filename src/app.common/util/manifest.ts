import _ = require("lodash");

export function getManifest(): chrome.runtime.Manifest {
    if (_.has(window, "chrome.runtime.getManifest")) {
        return chrome.runtime.getManifest();
    } else {
        return {
            version: "dev"
        } as chrome.runtime.Manifest;
    }
}