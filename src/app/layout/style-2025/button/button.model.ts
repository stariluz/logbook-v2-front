export interface IButton {
    icon?: string;
    iconPos?: 'left' | 'right';
    classList?: string;
    type?: 'button' | 'reset' | 'submit';
    name?: string;
    id?: string;
    onClick?: (event: Event) => void;
}