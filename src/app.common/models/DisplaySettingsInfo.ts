export interface DisplaySettingsInfo {
  showDST: DSTSetting;
  showUTCOffset: boolean;
  showTimeZoneId: boolean;
}

export type DSTSetting = "hide" | "DST" | "Summer/Winter";