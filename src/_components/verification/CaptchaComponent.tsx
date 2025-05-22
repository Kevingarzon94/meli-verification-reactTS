import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVerification } from '../../_contexts/VerificationContext';
import Button from '../common/Button';

interface CaptchaComponentProps {
    onResolved?: () => void;
}

const CaptchaComponent: React.FC<CaptchaComponentProps> = ({ onResolved }) => {
    const { t } = useTranslation();
    const { state, dispatch } = useVerification();
    const [isLoading, setIsLoading] = useState(false);
    const [captchaResolved, setCaptchaResolved] = useState(false);

    useEffect(() => {
        setCaptchaResolved(!!state.captchaToken);
    }, [state.captchaToken]);

    const handleCaptchaSimulation = async () => {
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1200));

            const mockToken = 'captcha-' + Math.random().toString(36).substring(2) + '-' + Date.now();

            dispatch({ type: 'SET_CAPTCHA_TOKEN', payload: mockToken });
            setCaptchaResolved(true);

            if (onResolved) {
                onResolved();
            }
        } catch (error) {
            console.error('Error resolving CAPTCHA:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefreshCaptcha = () => {
        dispatch({ type: 'SET_CAPTCHA_TOKEN', payload: '' });
        setCaptchaResolved(false);
    };

    return (
        <div className="meli-card">
            <h2 className="text-lg font-semibold mb-2">{t('verification.captcha')}</h2>
            <p className="text-sm text-meli-dark-gray mb-4">{t('verification.captchaInstructions')}</p>

            {!captchaResolved ? (
                <div className="rounded-md border border-gray-300 p-4 bg-gray-50">
                    <div className="flex flex-col items-center">
                        <div className="mb-4 w-full max-w-md bg-white p-3 border border-gray-200 rounded">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium">CAPTCHA de verificación</p>
                                <button
                                    type="button"
                                    className="text-meli-blue hover:text-meli-dark-blue text-sm"
                                    onClick={handleRefreshCaptcha}
                                    disabled={isLoading}
                                >
                                    Refrescar
                                </button>
                            </div>

                            <div className="text-center p-4 bg-gray-100 rounded relative overflow-hidden">
                                <div className="relative">
                                    <span className="text-2xl font-bold tracking-wide text-gray-700 transform -rotate-6 inline-block">W2x9Z</span>
                                    <span className="text-2xl font-bold tracking-wide text-gray-800 transform rotate-3 inline-block ml-2">Rb7D</span>

                                    <div className="absolute top-1/2 left-0 w-full h-px bg-gray-400 transform -rotate-3"></div>
                                    <div className="absolute top-1/3 left-0 w-full h-px bg-gray-400 transform rotate-2"></div>
                                    <div className="absolute bottom-1/4 left-0 w-full h-px bg-gray-400 transform -rotate-1"></div>
                                </div>
                            </div>

                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Ingrese el texto mostrado arriba"
                                    className="meli-input p-2 h-10 text-sm"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleCaptchaSimulation}
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            {t('verification.verifyCaptcha')}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="rounded-md border border-green-200 p-4 bg-green-50">
                    <div className="flex items-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{t('verification.captchaVerified')}</span>
                    </div>

                    <Button
                        variant="link"
                        onClick={handleRefreshCaptcha}
                        className="mt-2 text-sm"
                    >
                        {t('verification.changeCaptcha')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CaptchaComponent;