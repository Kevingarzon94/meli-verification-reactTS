import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { UserData } from '../_types/user.types';

interface VerificationState {
    userData: UserData | null;
    isLoading: boolean;
    formErrors: Record<string, string>;
    captchaToken: string | null;
    referrer: string | null;
    token: string | null;
    isDirty: boolean;
}

type Action =
    | { type: 'SET_USER_DATA'; payload: UserData }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_FORM_ERROR'; payload: { field: string; error: string } }
    | { type: 'CLEAR_FORM_ERROR'; payload: string }
    | { type: 'SET_CAPTCHA_TOKEN'; payload: string }
    | { type: 'SET_URL_PARAMS'; payload: { referrer: string | null; token: string | null } }
    | { type: 'SET_IS_DIRTY'; payload: boolean };

const initialState: VerificationState = {
    userData: null,
    isLoading: false,
    formErrors: {},
    captchaToken: null,
    referrer: null,
    token: null,
    isDirty: false,
};

const verificationReducer = (state: VerificationState, action: Action): VerificationState => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return { ...state, userData: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formErrors: {
                    ...state.formErrors,
                    [action.payload.field]: action.payload.error
                }
            };
        case 'CLEAR_FORM_ERROR':
            { const newErrors = { ...state.formErrors };
            delete newErrors[action.payload];
            return { ...state, formErrors: newErrors }; }
        case 'SET_CAPTCHA_TOKEN':
            return { ...state, captchaToken: action.payload };
        case 'SET_URL_PARAMS':
            return {
                ...state,
                referrer: action.payload.referrer,
                token: action.payload.token
            };
        case 'SET_IS_DIRTY':
            return { ...state, isDirty: action.payload };
        default:
            return state;
    }
};

interface VerificationContextType {
    state: VerificationState;
    dispatch: React.Dispatch<Action>;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

interface VerificationProviderProps {
    children: ReactNode;
}

export const VerificationProvider: React.FC<VerificationProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(verificationReducer, initialState);

    return (
        <VerificationContext.Provider value={{ state, dispatch }}>
            {children}
        </VerificationContext.Provider>
    );
};

export const useVerification = (): VerificationContextType => {
    const context = useContext(VerificationContext);
    if (context === undefined) {
        throw new Error('useVerification must be used within a VerificationProvider');
    }
    return context;
};