import React from 'react';

export function FormField({ id, label, type, value, className,
    onChange, maxLength, placeholder }) {

    return (
        <div className='boxInput'>
            <label htmlFor={id}>{label}:</label>
            <input
                type={type}
                id={id}
                value={value}
                className={className}
                onChange={onChange}
                maxLength={maxLength}
                data-testid={id}
                placeholder={placeholder}
            /> 
        </div>
    )
}

export default FormField