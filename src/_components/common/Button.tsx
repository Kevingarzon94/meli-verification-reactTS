import React, {type ButtonHTMLAttributes} from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    isLoading?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
                                           variant = 'primary',
                                           isLoading = false,
                                           fullWidth = false,
                                           children,
                                           className,
                                           disabled,
                                           ...props
                                       }) => {
    const baseClasses = 'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50';

    const variantClasses = {
        primary: 'bg-meli-blue text-white py-3 px-6 hover:bg-meli-dark-blue focus-visible:ring-meli-blue disabled:bg-gray-300',
        secondary: 'bg-gray-100 text-meli-black py-3 px-6 hover:bg-gray-200 focus-visible:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400',
        outline: 'border border-meli-blue text-meli-blue py-3 px-6 hover:bg-blue-50 focus-visible:ring-meli-blue disabled:border-gray-300 disabled:text-gray-400',
        link: 'text-meli-blue py-2 px-4 hover:underline focus-visible:ring-meli-blue disabled:text-gray-400',
        danger: 'bg-red-600 text-white py-3 px-6 hover:bg-red-700 focus-visible:ring-red-600 disabled:bg-gray-300',
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    const loadingClasses = isLoading ? 'relative !text-transparent' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${loadingClasses} ${className || ''}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {children}

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animation-spin"></div>
                </div>
            )}
        </button>
    );
};

export default Button;