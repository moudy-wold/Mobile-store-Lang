 
export interface SidebarMenuItemTypes {
  label: React.ReactNode;  // يمكن أن يكون label أي نوع مقبول في JSX مثل النص أو العناصر
  key: string;
  icon: React.ReactNode;
  url?: string;  // قد يكون url اختياري
  items?: SidebarMenuItemTypes[];  // items يمكن أن تحتوي على قائمة فرعية من نفس النوع
}