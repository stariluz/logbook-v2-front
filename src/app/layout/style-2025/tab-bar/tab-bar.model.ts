import { ITab } from "./tab-item/tab-item.model";

export interface ITabBar {
    tabs: ITab[];
    activeTabIndex: number;
}