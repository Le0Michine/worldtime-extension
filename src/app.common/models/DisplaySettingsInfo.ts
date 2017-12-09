export interface DisplaySettingsInfo {
  showDST: DSTSetting;
  showUTCOffset: boolean;
  showTimeZoneId: boolean;
  showControlPanel: boolean;
  useDarkTheme: boolean;
}

export type DSTSetting = "hide" | "DST" | "Summer/Winter";