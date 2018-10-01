import _ = require("lodash");

export function getPlatformInfo(): Promise<chrome.runtime.PlatformInfo> {
    return new Promise(resolve => {
        if (_.has(window, "chrome.runtime.getPlatformInfo")) {
            chrome.runtime.getPlatformInfo(function (info) {
                resolve(info);
            });
        } else {
            resolve({
                os: "dev",
                arch: "x86-64",
                nacl_arch: "x86-64",
            });
        }
    });
}