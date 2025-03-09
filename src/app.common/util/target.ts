export function getBuildTarget(): BuildTargetType {
  return import.meta.env["TARGET"] as BuildTargetType;
}

export type BuildTargetType = "demo" | "firefox";
export interface BuildTarget extends Record<BuildTargetType, BuildTargetType> {}
export const BuildTargets: BuildTarget = {
  demo: "demo",
  firefox: "firefox",
};
