import {type SelectHTMLAttributes, forwardRef } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    error?: string;
    helpText?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, helpText, className, disabled, ...props }, ref) => {
        const selectClasses = `
      w-full p-3 border rounded-md appearance-none bg-white
      ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-meli-dark-gray focus-visible:ring-meli-blue'} 
      ${disabled ? 'bg-gray-50 text-gray-700' : ''} 
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

                <div className="relative">
                    <select
                        ref={ref}
                        className={selectClasses}
                        disabled={disabled}
                        aria-invalid={error ? 'true' : 'false'}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>

                {error && <p className="meli-error">{error}</p>}
                {helpText && !error && <p className="text-sm text-gray-500 mt-1">{helpText}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;