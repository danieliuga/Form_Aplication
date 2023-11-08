import React, { useState, useEffect } from 'react';
import './Form.css'
import useField from '../../hooks/useField';
import useSelector from '../../hooks/useSelector';
import FormField from '../../hooks/useFormField';
import ErrorField from '../../hooks/useErrorField';
import { validateDNI } from '../../services/validateDni';
import * as Queries from '../CreatePersonas';
import { useMutation } from '@apollo/client';

export function Form() {

    const user = useField();
    const name = useField();
    const surname = useField();
    const country = useSelector();
    const dni = useField();

    const { setClassName } = useField();
    const [addUser] = useMutation(Queries.CREATE_USER);
    const [formSubmmited, setFormSubmmited] = useState(false)
    const [classSubmmited, setClassSubmmited] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (user.value.includes(name.value) && name.value.length > 0) {
            user.addErrorMessage('User cannot contain name')
        } else {
            user.removeErrorMessage('User cannot contain name')
        }

    }, [user.value, name.value])

    useEffect(() => {
        if (validateDNI(dni.value, country.value) == false
            && dni.value.length > 0
            && country.value != 'Choose a country') {
            dni.addErrorMessage('DNI validation failed')
        } else {
            dni.removeErrorMessage('DNI validation failed')
        }

    }, [dni.value, country.value]);

    /*const openInfoWindow = () => {
        const formData = {
            User: user.value,
            Name: name.value,
            Surname: surname.value,
            Country: country.value,
            DNI: dni.value,
        };

        // Convierte el objeto formData en una cadena de texto para mostrarlo en la ventana
        const infoText = Object.entries(formData)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');

        const infoWindow = window.open('', 'Form Data', 'width=400,height=400');
        infoWindow.document.write(`<pre>${infoText}</pre>`);
    };*/


    const onSubmit = (e) => {
        e.preventDefault()

        if (user.error == false &&
            name.error == false &&
            surname.error == false &&
            country.error == false &&
            dni.error == false) {
            //openInfoWindow();
            addUser({
                variables: {
                    user: user.value,
                    name: name.value,
                    surname: surname.value,
                    country: country.value,
                    dni: dni.value,
                },
            })
                .then(() => {
                    setFormSubmmited(true)
                    setClassSubmmited('submmited')
                    setMessage('Form submitted successfully! :)')
                })
        }
    }

    const onClear = () => {
        user.handleClearField();
        name.handleClearField();
        surname.handleClearField();
        user.handleClearField();
        country.handleClearSelector();
        dni.handleClearField();
    }

    const onSubmitForm = (e) => {

    };

    return (
        <div className="hola" data-testid="formulario">
            <section className="app">
                <header className='header'>
                    <h2>Formulario</h2>
                </header>

                <form onSubmit={onSubmitForm}>
                    <main className="main">
                        <FormField
                            id="user"
                            label="User"
                            type="text"
                            value={user.value}
                            className={user.className}
                            onChange={user.onChange}
                            maxLength={10}
                            placeholder='Blackpanther'
                        />
                        <ErrorField messages={user.classNameMessage} id={'user-error'} />
                        <FormField
                            id="name"
                            label="Name"
                            type="text"
                            value={name.value}
                            className={name.className}
                            onChange={name.onChange}
                            maxLength={10}
                            placeholder='Toni'
                        />
                        <ErrorField messages={name.classNameMessage} id={'name-error'} />
                        <FormField
                            id="surname"
                            label="Surname"
                            type="text"
                            value={surname.value}
                            className={surname.className}
                            onChange={surname.onChange}
                            maxLength={10}
                            placeholder='Recio'
                        />
                        <ErrorField messages={surname.classNameMessage} id={'surname-error'} />
                        <div className="boxInput">
                            <label htmlFor="country">Country:</label>
                            <select
                                id="country"
                                value={country.value}
                                onChange={country.onChange}
                                className={country.className}
                                data-testid="countryButton"
                            >
                                <option value={'Choose a country'}>Choose a country</option>
                                <option value="España">España</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Rumania">Rumania</option>
                            </select>
                        </div>
                        <div className='error-message'>{country.classNameMessage}</div>
                        <FormField
                            id="dni"
                            label="Dni"
                            type="text"
                            value={dni.value}
                            className={dni.className}
                            onChange={dni.onChange}
                            placeholder='11111111H'
                        />
                        <ErrorField messages={dni.classNameMessage} id={'dni-error'} />
                    </main>

                    <footer className="footer">
                        <button type="submit" className='submitButton' data-testid="submitButton" onClick={onSubmit} >Submit</button>
                        <button type="button" className='clearButton' onClick={onClear} data-testid="clearButton">Clear</button>
                    </footer>
                    {formSubmmited && (
                        <div className={`submmited ${classSubmmited}`}>{message}</div>
                    )}
                </form>
            </section>
        </div>
    );
}
