import { useState, useEffect } from 'react';

const useField = () => {

    const [value, setValue] = useState('');
    const [initialized, setInitialized] = useState(false);
    const [className, setClassName] = useState('');
    const [classNameMessage, setClassNameMessage] = useState([]);
    const [error, setError] = useState(false);

    const arrayWithoutString = (arrayContent, string) => {
        var arrayInfo = []
        for (var i = 0; i < arrayContent.length; i++) {
            if (arrayContent[i] !== string) {
                arrayInfo.push(arrayContent[i]);
            }
        }
        return arrayInfo
    }

    const arrayContain = (stringArray, string) => {
        var startString = false;
        for (var i = 0; i < stringArray.length; i++) {
            if (stringArray[i] == string) {
                startString = true;
            }
        }
        return startString
    }

    const addErrorMessage = (error) => {
        if (arrayContain(classNameMessage, error) == false) {
            var manegeErrors = [...classNameMessage]
            manegeErrors.push(error);
            setClassNameMessage(manegeErrors)
            setClassName('error')
        }
        
    }

    const removeErrorMessage = (error) => {
        if (arrayContain(classNameMessage, error) == true) {
            var manegeErrors = [...classNameMessage]
            manegeErrors = arrayWithoutString(manegeErrors, error)
            if (manegeErrors.length == 0) setClassName('')
            setClassNameMessage(manegeErrors)
        }
    }

    useEffect(() => {
      
        if (initialized) {
            var manegeErrors = [...classNameMessage]
            var totalErrors = 0;
            if (value.length === 0) {
                totalErrors++;
                if (arrayContain(manegeErrors,'Required') == false) manegeErrors.push('Required');
            } else {
                if (arrayContain(manegeErrors,'Required')){
                    manegeErrors = arrayWithoutString(manegeErrors, 'Required');
                    setClassNameMessage(manegeErrors)
                } 
            }
            if (totalErrors > 0) {
                setClassNameMessage(manegeErrors)
                setError(true)
                setClassName('error')

            } else {
                setError(false)
                setClassName('')
            }
        }

    }, [value])

    const handleClearField = () => {
        setValue('')
    }

    const onChange = (e) => {
        setValue(e.target.value.toUpperCase())
        setInitialized(true)
    }
    
    return { value, initialized, className, classNameMessage, error,
        arrayContain, addErrorMessage, removeErrorMessage, setError, 
        setClassNameMessage, onChange, handleClearField, setClassName }

}
export default useField