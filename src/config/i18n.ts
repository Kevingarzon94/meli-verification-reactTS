import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    'es-AR': {
        translation: {
            verification: {
                title: 'Verificación final',
                subtitle: 'Revisá tus datos antes de continuar',
                personalInfo: 'Información personal',
                address: 'Dirección de entrega',
                payment: 'Método de pago',
                firstName: 'Nombre',
                lastName: 'Apellido',
                email: 'Correo electrónico',
                phone: 'Teléfono',
                documentType: 'Tipo de documento',
                documentNumber: 'Número de documento',
                street: 'Calle',
                number: 'Número',
                city: 'Ciudad',
                state: 'Provincia',
                country: 'País',
                zipCode: 'Código postal',
                additionalInfo: 'Información adicional',
                captcha: 'Verificación de seguridad',
                captchaInstructions: 'Por favor, completá el captcha para continuar',
                continue: 'Confirmar y continuar',
                edit: 'Editar',
                loading: 'Cargando...',
                errorLoadingData: 'Error al cargar los datos. Por favor, intentá nuevamente.',
                errorSavingData: 'Error al guardar los datos. Por favor, intentá nuevamente.',
            },
            errors: {
                required: 'Este campo es obligatorio',
                invalidEmail: 'El correo electrónico no es válido',
                invalidPhone: 'El teléfono no es válido',
                invalidZipCode: 'El código postal no es válido',
                invalidDocument: 'El número de documento no es válido',
                captchaRequired: 'Por favor, completá el captcha para continuar',
            }
        }
    },
    'pt-BR': {
        translation: {
            verification: {
                title: 'Verificação final',
                subtitle: 'Revise seus dados antes de continuar',
                personalInfo: 'Informações pessoais',
                address: 'Endereço de entrega',
                payment: 'Método de pagamento',
                firstName: 'Nome',
                lastName: 'Sobrenome',
                email: 'E-mail',
                phone: 'Telefone',
                documentType: 'Tipo de documento',
                documentNumber: 'Número do documento',
                street: 'Rua',
                number: 'Número',
                city: 'Cidade',
                state: 'Estado',
                country: 'País',
                zipCode: 'CEP',
                additionalInfo: 'Informações adicionais',
                captcha: 'Verificação de segurança',
                captchaInstructions: 'Por favor, complete o captcha para continuar',
                continue: 'Confirmar e continuar',
                edit: 'Editar',
                loading: 'Carregando...',
                errorLoadingData: 'Erro ao carregar os dados. Por favor, tente novamente.',
                errorSavingData: 'Erro ao salvar os dados. Por favor, tente novamente.',
            },
            errors: {
                required: 'Este campo é obrigatório',
                invalidEmail: 'O e-mail não é válido',
                invalidPhone: 'O telefone não é válido',
                invalidZipCode: 'O CEP não é válido',
                invalidDocument: 'O número do documento não é válido',
                captchaRequired: 'Por favor, complete o captcha para continuar',
            }
        }
    }
};

const detectLanguage = (): string => {
    const hostname = window.location.hostname;

    if (hostname.includes('mercadolibre.com.ar')) {
        return 'es-AR';
    } else if (hostname.includes('mercadolivre.com.br')) {
        return 'pt-BR';
    }

    return 'es-AR';
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: detectLanguage(),
        fallbackLng: 'es-AR',
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;