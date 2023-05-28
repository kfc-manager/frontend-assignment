// all the custom types I haved used in this project

export interface CountryResponse {
    type: string;
    features: Country[];
}

export interface StateResponse {
    type: string;
    features: State[];
}

export interface Country {
    type: string;
    properties: CountryProperties;
    geometry: Geometry;
}

export interface State {
    type: string;
    properties: StateProperties;
    geometry: Geometry;
}

export interface CountryProperties {
    ADMIN: string;
    ISO_A3: string;
}

export interface StateProperties {
    name: string;
    country: string;
    ISO_A3: string;
    state_code: string;
    id: string;
}

export interface Geometry {
    type: string;
    coordinates: [];
}