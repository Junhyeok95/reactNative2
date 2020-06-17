interface IUserProfile {
  name: string;
  webUserId: string | undefined;
}

interface IDrivingSaveData extends IUserProfile {
  // name
  // webUserId
  startTime: number;
  endTime: number | undefined;
  Drivingline: Array<any> | undefined;
  DrivingMarker: Array<any> | undefined;
}

interface IDrivingData {
  drivingSaveDataArr: Array<any>  | undefined;
  setDrivingSaveDataArr: (data: any) => void;

  drivingSaveData: IDrivingSaveData | undefined;
  setDrivingSaveData: (data: any) => void;

  defaultInfo: Array<number>;
  linkInfo: Array<number>;
  checkInfo: Array<number>;
  setDefaultInfo: (data: any) => void;
  setLinkInfo: (data: any) => void;
  setCheckInfo: (data: any) => void;

  // 추가
  drivingStart: () => void;
  // 추가
  drivingSave: (data?: IDrivingSaveData) => void;
  drivingRemove: () => void;
}