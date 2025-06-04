export interface mainConfigType {
  title: string;
  sideBar: sideBarType;
}

interface sideBarItemsType {
  name: string;
  label: string;
  href: string;
  icon: React.ComponentType;
}

interface sideBarGroupType {
  name: string;
  items: sideBarItemsType[];
}

export interface sideBarType {
  mainItems: sideBarGroupType[];
}
