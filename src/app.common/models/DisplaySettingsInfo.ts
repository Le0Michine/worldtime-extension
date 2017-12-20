export interface DisplaySettingsInfo {
  showDST: DSTSetting;
  showUTCOffset: boolean;
  showTimeZoneId: boolean;
  showTimeZoneAbbreviation: boolean;
  showControlPanel: boolean;
  useDarkTheme: boolean;
  use24HoursTime: boolean;
  selectionStep: number;
  showDateLabels: boolean;
}

export type DSTSetting = "hide" | "DST" | "Summer/Winter";