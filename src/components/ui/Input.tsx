import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3 py-2 rounded-lg border bg-white dark:bg-neutral-900
            text-neutral-900 dark:text-neutral-100
            placeholder:text-neutral-400 dark:placeholder:text-neutral-500
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-neutral-100 dark:disabled:bg-neutral-800
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-neutral-300 focus:border-lime-500 focus:ring-lime-200 dark:border-neutral-600 dark:focus:border-lime-500'
            }
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';