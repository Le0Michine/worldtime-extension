export function getManifest(): chrome.runtime.Manifest {
    if (chrome && chrome.runtime && chrome.runtime.getManifest) {
        return chrome.runtime.getManifest();
    } else {
        return {
            version: "dev"
        } as chrome.runtime.Manifest;
    }
}