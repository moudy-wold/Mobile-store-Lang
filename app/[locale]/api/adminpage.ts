export enum AdminTabs {
  ADDCUSTOMER = "إضافة زبون",
  CUSTOMERLIST = "قائمة الزبائن",
  ADDSERVICE = "إضافة صيانة",
  MESSAGES = "رسائل الصفحة" ,
  CUSTOMERLOG = "سجل الزبائن" ,
  HOMESLIDER = "السلايدر الرئيسي",
  ADSSLIDER = "السلايدر الفرعي",
  PHONESECTION = "قسم الهواتف",
  HEADPHONESECTION = "قسم السماعات",
  ACCESSORESECTION = "قسم الإكسسوارات",
}

export type SidebarMenuItemTypes = {
  label: React.ReactNode;
  key: string;
  icon: React.ReactNode;
  items?: SidebarMenuItemTypes;
  url?: string;
}[];
