import {type InputHTMLAttributes, forwardRef} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helpText?: string;
    readOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({label, error, helpText, className, readOnly, disabled, ...props}, ref) => {
        const inputClasses = `
      w-full p-3 border rounded-md 
      ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-meli-dark-gray focus-visible:ring-meli-blue'} 
      ${readOnly || disabled ? 'bg-gray-50 text-gray-700' : 'bg-white'} 
      focus-visible:outline-none focus-visible:ring-2
      ${className || ''}
    `;

        return (
            <div className="mb-4">
                {label && (
                    <label htmlFor={props.id} className="meli-label">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    className={inputClasses}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-invalid={error ? 'true' : 'false'}
                    {...props}
                />

                {error && <p className="meli-error">{error}</p>}
                {helpText && !error && <p className="text-sm text-gray-500 mt-1">{helpText}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;