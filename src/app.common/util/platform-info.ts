export function getPlatformInfo(): Promise<chrome.runtime.PlatformInfo> {
    return new Promise(resolve => {
        if (chrome && chrome.runtime && chrome.runtime.getPlatformInfo) {
            chrome.runtime.getPlatformInfo(function (info) {
                resolve(info);
            });
        } else {
            resolve({
                os: "dev" as chrome.runtime.PlatformOs,
                arch: "x86-64",
                nacl_arch: "x86-64",
            });
        }
    });
}