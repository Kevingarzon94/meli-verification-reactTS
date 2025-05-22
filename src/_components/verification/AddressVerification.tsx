import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type {UserData, Address} from '../../_types/user.types';
import type {Country, State, City} from '../../_types/countries.types';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { useVerification } from '../../_contexts/VerificationContext';

interface AddressVerificationProps {
    userData: UserData | null;
}

const AddressVerification: React.FC<AddressVerificationProps> = ({ userData }) => {
    const { t } = useTranslation();
    const { dispatch } = useVerification();
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Partial<Address> | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const loadCountries = async () => {
                try {
                    setIsLoadingLocations(true);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const mockCountries: Country[] = [
                        { id: 'AR', name: 'Argentina', code: 'AR', states: [] },
                        { id: 'BR', name: 'Brasil', code: 'BR', states: [] },
                        { id: 'MX', name: 'México', code: 'MX', states: [] },
                        { id: 'CL', name: 'Chile', code: 'CL', states: [] },
                        { id: 'CO', name: 'Colombia', code: 'CO', states: [] },
                    ];

                    setCountries(mockCountries);

                    if (formData?.country) {
                        loadStates(formData.country);
                    }
                } catch (error) {
                    console.error('Error loading countries:', error);
                } finally {
                    setIsLoadingLocations(false);
                }
            };

            loadCountries();
        }
    }, [isEditing, formData?.country]);

    const loadStates = async (countryId: string) => {
        try {
            setIsLoadingLocations(true);
            await new Promise(resolve => setTimeout(resolve, 300));

            let mockStates: State[] = [];

            if (countryId === 'AR') {
                mockStates = [
                    { id: 'CABA', name: 'Buenos Aires (CABA)', code: 'C', cities: [] },
                    { id: 'BA', name: 'Buenos Aires (Provincia)', code: 'B', cities: [] },
                    { id: 'COR', name: 'Córdoba', code: 'X', cities: [] },
                    { id: 'SFE', name: 'Santa Fe', code: 'S', cities: [] },
                    { id: 'MEN', name: 'Mendoza', code: 'M', cities: [] },
                ];
            } else if (countryId === 'BR') {
                mockStates = [
                    { id: 'SP', name: 'São Paulo', code: 'SP', cities: [] },
                    { id: 'RJ', name: 'Rio de Janeiro', code: 'RJ', cities: [] },
                    { id: 'MG', name: 'Minas Gerais', code: 'MG', cities: [] },
                ];
            } else {
                mockStates = [
                    { id: 'ST1', name: 'Estado 1', code: 'ST1', cities: [] },
                    { id: 'ST2', name: 'Estado 2', code: 'ST2', cities: [] },
                ];
            }

            setStates(mockStates);

            if (formData?.state) {
                loadCities(countryId, formData.state);
            }
        } catch (error) {
            console.error('Error loading states:', error);
        } finally {
            setIsLoadingLocations(false);
        }
    };

    const loadCities = async (countryId: string, stateId: string) => {
        try {
            setIsLoadingLocations(true);
            await new Promise(resolve => setTimeout(resolve, 300));

            let mockCities: City[] = [];

            if (countryId === 'AR' && stateId === 'CABA') {
                mockCities = [
                    { id: 'CABA', name: 'Ciudad Autónoma de Buenos Aires' },
                ];
            } else if (countryId === 'AR' && stateId === 'BA') {
                mockCities = [
                    { id: 'LP', name: 'La Plata' },
                    { id: 'MDP', name: 'Mar del Plata' },
                    { id: 'BHI', name: 'Bahía Blanca' },
                ];
            } else {
                mockCities = [
                    { id: 'C1', name: 'Ciudad 1' },
                    { id: 'C2', name: 'Ciudad 2' },
                    { id: 'C3', name: 'Ciudad 3' },
                ];
            }

            setCities(mockCities);
        } catch (error) {
            console.error('Error loading cities:', error);
        } finally {
            setIsLoadingLocations(false);
        }
    };

    if (!userData || !userData.addresses || userData.addresses.length === 0) return null;

    const defaultAddress = userData.preferredAddressId
        ? userData.addresses.find(addr => addr.id === userData.preferredAddressId)
        : userData.addresses[0];

    if (!defaultAddress) return null;

    const currentData = formData || defaultAddress;

    const handleEdit = () => {
        setFormData({ ...defaultAddress });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData(null);
        setFormErrors({});
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => {
            if (!prev) return null;

            if (name === 'country') {
                return {
                    ...prev,
                    [name]: value,
                    state: '',
                    city: ''
                };
            }

            if (name === 'state') {
                return {
                    ...prev,
                    [name]: value,
                    city: ''
                };
            }

            return { ...prev, [name]: value };
        });

        if (name === 'country' && value) {
            loadStates(value);
            setCities([]);
        } else if (name === 'state' && value && currentData.country) {
            loadCities(currentData.country, value);
        }

        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData?.street) {
            errors.street = t('errors.required');
        }

        if (!formData?.number) {
            errors.number = t('errors.required');
        }

        if (!formData?.zipCode) {
            errors.zipCode = t('errors.required');
        }

        if (!formData?.country) {
            errors.country = t('errors.required');
        }

        if (!formData?.state) {
            errors.state = t('errors.required');
        }

        if (!formData?.city) {
            errors.city = t('errors.required');
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData || !validateForm()) return;

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedAddresses = userData.addresses.map(addr => {
                if (addr.id === defaultAddress.id) {
                    return { ...addr, ...formData };
                }
                return addr;
            });

            dispatch({
                type: 'SET_USER_DATA',
                payload: {
                    ...userData,
                    addresses: updatedAddresses
                }
            });

            // Salir del modo edición
            setIsEditing(false);
            setFormData(null);

            // Marcar como modificado en el contexto global
            dispatch({ type: 'SET_IS_DIRTY', payload: true });
        } catch (error) {
            console.error('Error updating address:', error);
            setFormErrors({
                general: t('verification.errorSavingData')
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Convertir arrays a opciones para los selectores
    const countryOptions = countries.map(country => ({
        value: country.id,
        label: country.name
    }));

    const stateOptions = states.map(state => ({
        value: state.id,
        label: state.name
    }));

    const cityOptions = cities.map(city => ({
        value: city.id,
        label: city.name
    }));

    return (
        <div className="meli-card">
            <h2 className="text-lg font-semibold mb-4">{t('verification.address')}</h2>

            {formErrors.general && (
                <div className="bg-red-50 border border-red-100 text-red-700 p-3 rounded mb-4">
                    {formErrors.general}
                </div>
            )}

            {!isEditing ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <p className="meli-label">{t('verification.street')}</p>
                            <div className="meli-input bg-gray-50">
                                {defaultAddress.street} {defaultAddress.number}
                            </div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.city')}</p>
                            <div className="meli-input bg-gray-50">{defaultAddress.city}</div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.state')}</p>
                            <div className="meli-input bg-gray-50">{defaultAddress.state}</div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.country')}</p>
                            <div className="meli-input bg-gray-50">{defaultAddress.country}</div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.zipCode')}</p>
                            <div className="meli-input bg-gray-50">{defaultAddress.zipCode}</div>
                        </div>

                        {defaultAddress.additionalInfo && (
                            <div className="md:col-span-2">
                                <p className="meli-label">{t('verification.additionalInfo')}</p>
                                <div className="meli-input bg-gray-50">{defaultAddress.additionalInfo}</div>
                            </div>
                        )}
                    </div>

                    <Button
                        variant="link"
                        onClick={handleEdit}
                        className="mt-4"
                    >
                        {t('verification.edit')}
                    </Button>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Input
                                label={t('verification.street')}
                                name="street"
                                value={currentData.street || ''}
                                onChange={handleChange}
                                error={formErrors.street}
                                required
                            />
                        </div>

                        <div>
                            <Input
                                label={t('verification.number')}
                                name="number"
                                value={currentData.number || ''}
                                onChange={handleChange}
                                error={formErrors.number}
                                required
                            />
                        </div>

                        <div>
                            <Select
                                label={t('verification.country')}
                                name="country"
                                value={currentData.country || ''}
                                options={countryOptions}
                                onChange={handleChange}
                                error={formErrors.country}
                                disabled={isLoadingLocations}
                                required
                            />
                        </div>

                        <div>
                            <Select
                                label={t('verification.state')}
                                name="state"
                                value={currentData.state || ''}
                                options={stateOptions}
                                onChange={handleChange}
                                error={formErrors.state}
                                disabled={isLoadingLocations || !currentData.country}
                                required
                            />
                        </div>

                        <div>
                            <Select
                                label={t('verification.city')}
                                name="city"
                                value={currentData.city || ''}
                                options={cityOptions}
                                onChange={handleChange}
                                error={formErrors.city}
                                disabled={isLoadingLocations || !currentData.state}
                                required
                            />
                        </div>

                        <div>
                            <Input
                                label={t('verification.zipCode')}
                                name="zipCode"
                                value={currentData.zipCode || ''}
                                onChange={handleChange}
                                error={formErrors.zipCode}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label={t('verification.additionalInfo')}
                                name="additionalInfo"
                                value={currentData.additionalInfo || ''}
                                onChange={handleChange}
                                error={formErrors.additionalInfo}
                                placeholder={t('verification.additionalInfoPlaceholder')}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            {t('verification.save')}
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            {t('verification.cancel')}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddressVerification;