import { has } from "lodash";

export function getManifest(): chrome.runtime.Manifest {
    if (has(window, "chrome.runtime.getManifest")) {
        return chrome.runtime.getManifest();
    } else {
        return {
            version: "dev"
        } as chrome.runtime.Manifest;
    }
}