import React, { useContext, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../shared/Input.jsx';
import commonStyles from '../shared/commonStyles.js';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader.jsx';
import { ProfileSchema } from '../Register/validation.js';

function EditProfile() {
    const { token } = useContext(UserContext);
    const [changesMade, setChangesMade] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const initialValues = {
        username: '',
        phone: '',
    };

    const onSubmit = async (values) => {
        const filteredValues = Object.fromEntries(
            Object.entries(values).filter(([_, value]) => value !== '')
        );
        
        setLoading(true);
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL2}/auth/update`, filteredValues, {
                headers: { Authorization: `AmanGRAD__${token}` },
            });
            setLoading(false);
            if (data.message === 'success') {
                toast.success("Updated successfully");
            }
        } catch (error) {
            const { response } = error;
            toast.error(response?.data?.message || "Failed to update");
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
        navigate('/profile');
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: ProfileSchema,
    });

    const handleInputChange = (e) => {
        formik.handleChange(e);
        setChangesMade(true);
    };

    const inputConfigurations = [
        { id: 'username', title: 'Username', type: 'text', name: 'username' },
        { id: 'phone', title: 'Phone', type: 'tel', name: 'phone' },
    ];

    if (loading) {
        return <Loader />;
    }

    console.log("formik.values:", formik.values); // Debugging log
    console.log("formik.errors:", formik.errors); // Debugging log

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                    <li className="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <div className="profile-container">
                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                    {inputConfigurations.map(input => (
                        <Input
                            key={input.id}
                            id={input.id}
                            title={input.title}
                            type={input.type}
                            name={input.name}
                            value={formik.values[input.name]}
                            onChange={handleInputChange}
                            onBlur={formik.handleBlur}
                            errors={formik.errors[input.name]}
                        />
                    ))}
                    <div className="d-flex flex-column justify-content-center">
                        <Link to='/changepassword' style={{ marginTop: '1rem' }}>Change Password</Link>
                        {
                            changesMade && (<button type="submit" className='button main-color'>Update Profile</button>)
                        }
                    </div>
                </form>
            </div>
        </>
    );
}

const styles = {
    ...commonStyles
};

export default EditProfile;
