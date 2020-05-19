interface IUserProfile {
  name: string;
  webUserId: string | undefined;
}

interface IDrivingSaveData extends IUserProfile {
  time: number;
  Drivingline: Array<any> | undefined;
  DrivingMarker: Array<any> | undefined;
}

interface IDrivingData {
  drivingSaveData: Array<IDrivingSaveData>,
  defaultInfo: Array<number>,
  linkInfo: Array<number>,
  checkInfo: Array<number>,
  drivingSave: (data?: IDrivingSaveData) => void,
  setDefaultInfo: (data: any) => void,
  setLinkInfo: (data: any) => void,
  setCheckInfo: (data: any) => void,
}