import React from 'react';
import './form-input.style.scss';


const FormInput = ({handleChange, label, ...otherInputProps}) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherInputProps} />
        {label?(
        <label className={`form-input-label ${otherInputProps.value.length ? 'shrink':'' }`}>
            {label}
        </label>
        ):null}
    </div>
)

export default FormInput;