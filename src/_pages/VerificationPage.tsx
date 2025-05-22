import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useVerification } from '../_contexts/VerificationContext';
import { FullPagePlaceholder } from '../_components/common/Loadings';
import type {UserData} from '../_types/user.types';
import UserDataForm from '../_components/verification/UserFormData';
import AddressVerification from '../_components/verification/AddressVerification';
import CaptchaComponent from '../_components/verification/CaptchaComponent';
import Button from '../_components/common/Button';

const VerificationPage: React.FC = () => {
    const { t } = useTranslation();
    const { state, dispatch } = useVerification();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const simulateUserData = (): UserData => ({
        id: '12345',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        phone: '+54 11 1234-5678',
        documentType: 'DNI',
        documentNumber: '30123456',
        addresses: [
            {
                id: 'addr-1',
                street: 'Av. Corrientes',
                number: '1234',
                city: 'Buenos Aires',
                state: 'CABA',
                country: 'Argentina',
                zipCode: '1043',
                additionalInfo: 'Piso 3, Depto B',
                isDefault: true
            }
        ],
        preferredAddressId: 'addr-1'
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = urlParams.get('referrer');
        const token = urlParams.get('token');

        dispatch({
            type: 'SET_URL_PARAMS',
            payload: {
                referrer: referrer || null,
                token: token || null
            }
        });
    }, [dispatch]);

    useEffect(() => {
        const loadUserData = async () => {
            setIsPageLoading(true);
            setError(null);

            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                await new Promise(resolve => setTimeout(resolve, 1500));
                const userData = simulateUserData();

                dispatch({ type: 'SET_USER_DATA', payload: userData });
            } catch (error) {
                console.error('Error loading user data:', error);
                setError(t('verification.errorLoadingData'));
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
                setIsPageLoading(false);
            }
        };

        loadUserData();
    }, [dispatch, t]);

    const handleSubmit = async () => {
        if (!state.captchaToken) {
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (state.referrer) {
                alert(`Redirigiendo a: ${state.referrer} con token CAPTCHA: ${state.captchaToken}`);

            } else {
                alert('Verificación completada. Redirigiendo a página de confirmación.');
            }
        } catch (error) {
            console.error('Error submitting verification data:', error);
            setError(t('verification.errorSavingData'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isPageLoading) {
        return <FullPagePlaceholder />;
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-4">
                <div className="meli-card p-4 bg-red-50 border border-red-100 text-red-700">
                    <p>{error}</p>
                    <Button
                        variant="danger"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        {t('verification.retry')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <header>
                <h1>{t('verification.title')}</h1>
                <p className="text-meli-dark-gray mt-1">{t('verification.subtitle')}</p>
            </header>

            <section className="space-y-6">
                <UserDataForm userData={state.userData} />

                <AddressVerification userData={state.userData} />

                <CaptchaComponent />
            </section>

            <div className="flex justify-center mt-8 pb-8">
                <Button
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={!state.captchaToken || isSubmitting}
                    fullWidth
                >
                    {t('verification.continue')}
                </Button>
            </div>

            <div className="meli-card bg-gray-50 p-4 mt-8 text-sm">
                <h3 className="font-medium mb-2">Información de desarrollo:</h3>
                <p><strong>Referrer:</strong> {state.referrer || '(no especificado)'}</p>
                <p><strong>Token:</strong> {state.token || '(no especificado)'}</p>
                <p><strong>CAPTCHA:</strong> {state.captchaToken ? 'Completado' : 'Pendiente'}</p>
                <p><strong>Estado de modificación:</strong> {state.isDirty ? 'Datos modificados' : 'Sin cambios'}</p>
                <p className="mt-2 text-xs text-gray-500">Este panel solo es visible en modo desarrollo.</p>
            </div>
        </div>
    );
};

export default VerificationPage;