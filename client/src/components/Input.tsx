import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, error, ...props }) => {
  const inputId = name || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-medium text-mid-gray mb-1">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className={`w-full bg-muted-surface border rounded-md p-3 text-light-text ${error ? 'border-error-red' : 'border-subtle-border'}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-error-red mt-1" aria-live="assertive">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
