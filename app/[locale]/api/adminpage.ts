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

export interface SidebarMenuItemTypes {
  label: React.ReactNode;  // يمكن أن يكون label أي نوع مقبول في JSX مثل النص أو العناصر
  key: string;
  icon: React.ReactNode;
  url?: string;  // قد يكون url اختياري
  items?: SidebarMenuItemTypes[];  // items يمكن أن تحتوي على قائمة فرعية من نفس النوع
}