import React from 'react';
import useField from './useField';

export function ErrorField({ messages, id }) {

    return (
        <div className='error-message' data-testid={id}>{
            messages
            }</div>
    )

}

export default ErrorField