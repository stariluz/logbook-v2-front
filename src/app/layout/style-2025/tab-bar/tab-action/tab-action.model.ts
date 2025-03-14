export interface ITabAction {
    label?: string;
    activeLabel?: string; 
    isActive?: boolean;
    icon: string; 
    action?: Function;
    routerLink?: string | any[] | null | undefined;
  }