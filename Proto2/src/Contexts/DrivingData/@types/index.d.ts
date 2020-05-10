interface IUserProfile {
  name: string;
  webUserId: string | undefined;
}

interface IDrivingSaveData extends IUserProfile {
  time: number;
  Drivingline: Array<any> | undefined;
  DrivingMarker: Array<any> | undefined;
}
