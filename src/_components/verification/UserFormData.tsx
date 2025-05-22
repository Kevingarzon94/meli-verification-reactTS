import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {UserData} from '../../_types/user.types';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { useVerification } from '../../_contexts/VerificationContext';

interface UserDataFormProps {
    userData: UserData | null;
}

const UserFormData: React.FC<UserDataFormProps> = ({ userData }) => {
    const { t } = useTranslation();
    const { dispatch } = useVerification();
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Partial<UserData> | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    if (!userData) return null;

    const currentData = formData || userData;

    const handleEdit = () => {
        setFormData({ ...userData });
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
            return { ...prev, [name]: value };
        });

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

        if (!formData?.firstName) {
            errors.firstName = t('errors.required');
        }

        if (!formData?.lastName) {
            errors.lastName = t('errors.required');
        }

        if (!formData?.email) {
            errors.email = t('errors.required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = t('errors.invalidEmail');
        }

        if (!formData?.phone) {
            errors.phone = t('errors.required');
        }

        if (!formData?.documentNumber) {
            errors.documentNumber = t('errors.required');
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

            dispatch({ type: 'SET_USER_DATA', payload: { ...userData, ...formData } });

            setIsEditing(false);
            setFormData(null);

            dispatch({ type: 'SET_IS_DIRTY', payload: true });
        } catch (error) {
            console.error('Error updating user data:', error);
            setFormErrors({
                general: t('verification.errorSavingData')
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const documentTypeOptions = [
        { value: 'DNI', label: 'DNI' },
        { value: 'PASSPORT', label: 'Pasaporte' },
        { value: 'CUIT', label: 'CUIT/CUIL' },
        { value: 'CPF', label: 'CPF' },
    ];

    return (
        <div className="meli-card">
            <h2 className="text-lg font-semibold mb-4">{t('verification.personalInfo')}</h2>

            {formErrors.general && (
                <div className="bg-red-50 border border-red-100 text-red-700 p-3 rounded mb-4">
                    {formErrors.general}
                </div>
            )}

            {!isEditing ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="meli-label">{t('verification.firstName')}</p>
                            <div className="meli-input bg-gray-50">{userData.firstName}</div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.lastName')}</p>
                            <div className="meli-input bg-gray-50">{userData.lastName}</div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.email')}</p>
                            <div className="meli-input bg-gray-50">{userData.email}</div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.phone')}</p>
                            <div className="meli-input bg-gray-50">{userData.phone}</div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.documentType')}</p>
                            <div className="meli-input bg-gray-50">{userData.documentType}</div>
                        </div>

                        <div>
                            <p className="meli-label">{t('verification.documentNumber')}</p>
                            <div className="meli-input bg-gray-50">{userData.documentNumber}</div>
                        </div>
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
                        <Input
                            label={t('verification.firstName')}
                            name="firstName"
                            value={currentData.firstName}
                            onChange={handleChange}
                            error={formErrors.firstName}
                            required
                        />

                        <Input
                            label={t('verification.lastName')}
                            name="lastName"
                            value={currentData.lastName}
                            onChange={handleChange}
                            error={formErrors.lastName}
                            required
                        />

                        <Input
                            label={t('verification.email')}
                            name="email"
                            type="email"
                            value={currentData.email}
                            onChange={handleChange}
                            error={formErrors.email}
                            required
                        />

                        <Input
                            label={t('verification.phone')}
                            name="phone"
                            value={currentData.phone}
                            onChange={handleChange}
                            error={formErrors.phone}
                            required
                        />

                        <Select
                            label={t('verification.documentType')}
                            name="documentType"
                            value={currentData.documentType}
                            options={documentTypeOptions}
                            onChange={handleChange}
                            error={formErrors.documentType}
                            required
                        />

                        <Input
                            label={t('verification.documentNumber')}
                            name="documentNumber"
                            value={currentData.documentNumber}
                            onChange={handleChange}
                            error={formErrors.documentNumber}
                            required
                        />
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

export default UserFormData;