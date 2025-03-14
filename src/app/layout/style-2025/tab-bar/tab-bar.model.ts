import { ITabAction } from "./tab-action/tab-action.model";
import { ITab } from "./tab-item/tab-item.model";

export interface ITabBar {
    tabs: ITab[];
    actions: ITabAction[];
    activeTabIndex: number;
}