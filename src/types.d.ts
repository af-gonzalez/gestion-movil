declare type OptimalRouteItems = GeoLocationItem[];

declare type ReduxStore = {
  schedule: {
    optimalRouteItems: OptimalRouteItems,
    pendingServices: ScheduledService[],
    polyLineCoordinates: MapCoordinates[],
    userLocation: MapCoordinates,
    activeService: ScheduledService;
  };
  nav: any;
  devices: { references: DeviceReference[], list: Device[] };
  chat: { activeChat: Chat, historicChats: Chat[] };
  utils: { modalOpened?: boolean, issueTypes: IssueType[], loading: boolean };
  supplies: { list: Supply[], types: SupplyType[] }
  serviceToQualify: { shouldShowModal: boolean };
  modals: { showImagePicker: boolean };
  misc: { keyboard: any, containerStatus: any };
};

declare type DeviceMovement = {
  deviceIn?: { type: string, boardNumber: string, serial: string },
  deviceOut?: { type: string, boardNumber: string, serial: string },
  noveltyType: string,
  terminalNumber: string,
};

declare type SecuritySealChange = {
  previousNumber: string;
  newNumber: string;
};

declare type DeviceReference = {
  id: string,
  name: string,
  imageName: string,
  type?: any;
};

declare type Device = {
  id: string;
  plateNumber: string;
  serialNumber: string;
  terminalNumer: string;
  reference?: DeviceReference;
};

declare type SelectionBoxOption = {
  label: string;
  value: any;
  image?: any;
};

declare type SelectBoxModal = {
  options: SelectionBoxOption[],
  isOpened: boolean;
};

declare type IssueType = {
  id: string,
  description: string;
};

declare type DeviceMaintenance = {
  issueType: IssueType;
  device: Device;
};

declare type GeoLocationItem = {
  id: number;
  coordinates: MapCoordinates;
};

declare type ScheduledService = {
  id: number;
  coordinates: MapCoordinates;
  commerce: { name: string, address: string },
  scheduledTime: string,
};

declare type MapCoordinates = {
  latitude: number;
  longitude: number;
};

declare type SupplyReference = {
  id: number;
  name: string;
  type?: SupplyType;
};

declare type SupplyType = {
  id: number;
  name: string;
  references?: SupplyReference[];
};

declare type Supply = {
  item: SupplyReference;
  amount: number;
};

declare type ConnectedComponentRef<T> = {
  getWrappedInstance: () => T;
};

////////

declare type SessionUser = {
  jwtToken: string;
  user: User;
};

declare type User = {
  id: string;
  name: string;
  lastname: string;
  fullname: string;
  username: string;
  email: string;
  roles: Role[];
  profileImage: string;
};

declare type Role = {
  id: string;
  name: string;
};

declare type Chat = {
  id?: any;
  createdAt: string;
  expiredAt: string;
  active: boolean;
  expired: boolean;
  user: User;
  supportUser: User;
};

declare type ChatMessage = {
  id?: any;
  createdAt: string;
  sender: User;
  content: string;
};

declare type UserChats = {
  currentChat: Chat;
  expiredChats: Chat[];
};

declare interface Commerce {
  id?: any;
  name: string;
  tinNumber: string;
  logoImage: string;
  priority: CommercePriority;
  geoLocation: GeoLocation;
}

declare interface CommercePriority {
  id?: any;
  name: string;
  color: string;
}

declare interface Subsidiary {
  id?: any;
  name: string;
  address: string;
  personInCharge: User ;
  commerce: Commerce;
}

declare interface GeoLocation {
  lat: number;
  lon: number;
}

declare interface Issue {
  id?: any;
  name: string;
}

declare interface Service {
  id?: any;
  status: string;
  creationComments: string;
  subsidiary: Subsidiary ;
  issues: Issue[];
  active: boolean;
  technician?: User;
  scheduledTime?: Date;
  startedData?: {
    devicesToMaintain: string[];
    technicianComments: string;
  };
  finishedData?: {
    installedDevices: string[];
    retiredDevices: string[];
  };
}
