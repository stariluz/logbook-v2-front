export interface IInput {
    name: string;
    id?: string;
    value?: string;
    type?: 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'time'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'tel'
    | 'url'
    | 'search'
    | 'color'
    | 'range'
    | 'hidden';
    placeholder?: string;
    classList?: string;
    placeholderIsFloating?:boolean;
    change?: (event: Event) => void;
}
