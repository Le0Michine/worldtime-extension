export function getBuildTarget(): BuildTargetType {
    return process.env.TARGET as BuildTargetType;
}

export type BuildTargetType = "demo" | "firefox";
export interface BuildTarget extends Record<BuildTargetType, BuildTargetType> {}
export const BuildTargets: BuildTarget = {
    demo: "demo",
    firefox: "firefox",
};