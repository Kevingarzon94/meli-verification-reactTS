export interface Address {
    id: string;
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    additionalInfo?: string;
    isDefault: boolean;
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    documentType: string;
    documentNumber: string;
    addresses: Address[];
    preferredAddressId?: string;
}

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    documentType: string;
    documentNumber: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
        additionalInfo?: string;
    };
}