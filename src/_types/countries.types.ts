export interface City {
    id: string;
    name: string;
    zipCodePattern?: string;
}

export interface State {
    id: string;
    name: string;
    code: string;
    cities: City[];
}

export interface Country {
    id: string;
    name: string;
    code: string;
    states: State[];
}