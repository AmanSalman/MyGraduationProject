import React from 'react';
import commonStyles from './commonStyles.js';

export default function Input({ id, title, type, name, value, onChange, onBlur, errors, required, className, readOnly }) {
    return (
        <div className='d-flex flex-column w-100'>
            <label htmlFor={id} className="form-label">
                {title}
                {required && <span style={styles.requiredStar}>*</span>}
            </label>
            {type === 'file' ? (
                <input
                    type={type}
                    name={name}
                    className={`form-control ${className}`}
                    id={id}
                    onChange={onChange} // Use onChange directly
                    onBlur={onBlur} // Add onBlur
                    style={styles.input}
                    required={required}
                    placeholder={title}
                    readOnly={readOnly}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    className={`form-control ${className}`}
                    id={id}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ''} // Use value prop instead of defaultValue
                    style={styles.input}
                    required={required}
                    placeholder={title}
                    readOnly={readOnly}
                />
            )}
            {errors && typeof errors === 'string' && <p className='text-danger'>{errors}</p>}
        </div>
    );
}

const styles = {
    ...commonStyles,
    requiredStar: {
        color: 'red',
        marginLeft: '4px',
    },
};
