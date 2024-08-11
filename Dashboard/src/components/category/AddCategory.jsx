import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { categorySchema } from './CategoryValidation.js';
import { UserContext } from '../context/User.jsx';
import { Link } from 'react-router-dom';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import '../books/book.css';

function AddCategory() {
    const [loading, setLoading] = useState(false);
    const [clearErrors, setClearErrors] = useState(false); // State to clear errors

    const { token } = useContext(UserContext);

    const initialValues = {
        name: '',
        image: null, // Set initial value to null for file input
    };
    const handleFieldChange = (event) => {
        formik.setFieldValue('image', event.target.files[0]);
        setClearErrors(true); // Set clearErrors to true when changing fields
    };

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            console.log(values)
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", values.image);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL2}/category/`, formData, {
                headers: { Authorization: `AmanGRAD__${token}` }
            });
            if (data.message === 'success') {
                toast.success("Added successfully");
                resetForm();
            }
        } catch (error) {
            toast.error("An error occurred, try again later");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: categorySchema,
        validateOnChange: clearErrors, // Validate on change only if clearErrors is true
        validateOnBlur: clearErrors, // Validate on blur only if clearErrors is true
    });


    const handleNameChange = (event) => {
        formik.handleChange(event);
        setClearErrors(true); // Set clearErrors to true when changing fields
    };

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Category</li>
                    <li className="breadcrumb-item active" aria-current="page">Add Category</li>
                </ol>
            </nav>
            <div className='component-container d-flex flex-column bookadd addCategory border'>
                <Link to={'/'} className='arrow'>
                    <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/>
                </Link>
                {loading ? (
                    <Loader />
                ) : (
                    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={handleNameChange}
                                onBlur={formik.handleBlur}
                                placeholder="Category Name"
                                className="form-control"
                                required
                            />
                            {formik.errors.name && formik.touched.name && (
                                <p className="text-danger">{formik.errors.name}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFieldChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                required
                            />
                            {formik.errors.image && formik.touched.image && (
                                <p className="text-danger">{formik.errors.image}</p>
                            )}
                        </div>
                        <button type="submit" className='button' disabled={!formik.isValid}>Add Category</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default AddCategory;
