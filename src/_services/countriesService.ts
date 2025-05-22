import { get, type QueryParams } from './apiService';
import type {Country, State, City} from '../_types/countries.types';

const COUNTRIES_API_BASE = '/api/meli-countries';

export const getAllCountries = async (): Promise<Country[]> => {
    return get<Country[]>(`${COUNTRIES_API_BASE}/countries`);
};

export const getCountryById = async (countryId: string): Promise<Country> => {
    return get<Country>(`${COUNTRIES_API_BASE}/countries/${countryId}`);
};

export const getStatesByCountry = async (countryId: string): Promise<State[]> => {
    return get<State[]>(`${COUNTRIES_API_BASE}/countries/${countryId}/states`);
};

export const getCitiesByState = async (countryId: string, stateId: string): Promise<City[]> => {
    return get<City[]>(`${COUNTRIES_API_BASE}/countries/${countryId}/states/${stateId}/cities`);
};

interface ZipCodeValidationResponse {
    valid: boolean;
    city?: City;
}

export const validateZipCode = async (
    countryId: string,
    stateId: string,
    zipCode: string
): Promise<ZipCodeValidationResponse> => {
    const params: QueryParams = {
        countryId,
        stateId,
        zipCode
    };

    return get<ZipCodeValidationResponse>(
        `${COUNTRIES_API_BASE}/validate-zip-code`,
        params
    );
};