import {useState} from 'react';

function useForm(callback){// el callback lo pasamos al momento de llamar este hook del componente de form
    // callback = la funcion a efectuar (usando los inputs del form) para realizar el callback

    const [inputs, setInputs] = useState({}); //useState is how you set the original state (we hae an empty object)
    
    const handleSubmit = (event) => {
        if (event) event.preventDefault(); // prevents refresh
        callback(inputs);
        setInputs({})
    }

    const handleInputChange = (event) => {
        event.persist(); // persists the value of your inputs in the virtual dom
        const {name, value} = event.target
        setInputs(prevInputs => ({...prevInputs, [name]:value}))
    }

    return {
        inputs,
        handleSubmit,
        handleInputChange
    }
}

export default useForm;