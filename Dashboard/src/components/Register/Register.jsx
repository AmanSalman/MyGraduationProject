// import React, {useState} from 'react';
// import commonStyles from '../shared/commonStyles.js';
// import './Register.css';
// import {useFormik} from 'formik';
// import axios from 'axios';
// import Loader from '../Loader/Loader.jsx';
// import {toast} from 'react-toastify';
// import {Link, useNavigate} from 'react-router-dom';
// import Logo from '../../assets/Logo.png';

// const Register = () => {
// 	const [loading, setLoading] = useState(false);
// 	const navigate = useNavigate();
// 	const initialValues = {
// 		username: '',
// 		phone: '',
// 		email: '',
// 		password: '',
// 		role: 'admin'
// 	};

// 	const onSubmit = async (admin, {resetForm}) => {
// 		console.log(admin)
// 		try {
// 			setLoading(true);
// 			const {data} = await axios.post(`${
// 				import.meta.env.VITE_API_URL2
// 			}/auth/register`, admin);
// 			console.log(data);
// 			if (data.message == 'success') {
// 				toast.success("registered successfully");
// 				navigate('/login');
// 				resetForm();
// 				setLoading(false);
// 			} 
// 			setLoading(false)
// 		} catch (error) {
// 			setLoading(false)
// 			console.log(error);
// 		}
// 	};

// 	const formik = useFormik({initialValues, onSubmit});

// 	return (
// 		<>
// 			{
// 			loading ? (
// 				<Loader/>) : <div className='d-flex align-items-center flex-wrap vh-100'>

// 					<div className='d-flex justify-content-center align-items-center vh-100 flex-item-registration' style={{backgroundColor:'#00B1EB'}}>

// 						<img src={Logo}
// 							alt='logo'
// 							className=' img-fluid'
// 							style={
// 								{
// 									borderRadius: '50%',
// 									width: '35%',
// 									// border: 'solid 1px rgb(156, 131, 131)',
// 									margin: '1em'
// 								}
// 							}/>
// 							<div className='mediaQheader'> 

// 						<h1 className='HeadingRegister'>Hello Again!</h1>
// 						<h2 className='subHeading'>Welcome back</h2>
// 							</div>
// 					</div>

// 					{/* <h2 className='text-uppercase heading text-dark'>Register :</h2> */}
//                     <div className='flex-item-registration1 flex-grow-1'>
// 					<div className='text-center'>
//                         <h2 className='maincolortext'>Register</h2>
//                         </div>
//                        <form onSubmit={formik.handleSubmit} style={styles.container} className=' align-items-center justify-content-center'>
// 						<input type="text"
// 							value={
// 								formik.values.username
// 							}
// 							onChange={
// 								formik.handleChange
// 							}
// 							placeholder="username"
// 							style={
// 								styles.input
// 							}
// 							id="username"
// 							name="username"
// 							 autoComplete='username'/>
// 						<input type="tel"
// 							value={
// 								formik.values.phone
// 							}
// 							onChange={
// 								formik.handleChange
// 							}
// 							placeholder="phone"
// 							style={
// 								styles.input
// 							}
// 							id="phone"
// 							name="phone"
// 							autoComplete='phone'/>
// 						<input type="email"
// 							value={
// 								formik.values.email
// 							}
// 							onChange={
// 								formik.handleChange
// 							}
// 							placeholder="email"
// 							style={
// 								styles.input
// 							}
// 							id="email"
// 							name="email"
// 							autoComplete='email'/>
// 						<input type="password"
// 							value={
// 								formik.values.publishingHouse
// 							}
// 							onChange={
// 								formik.handleChange
// 							}
// 							placeholder="password"
// 							style={
// 								styles.input
// 							}
// 							id="password"
// 							name="password"
// 							autoComplete='current-password'
// 							/>
// 							<div className='d-flex'>
// 							 <span className='text-black mb-3 me-1'>already have an accout? </span> 
//              <Link className='pinkMain' to='/login'>Sign in</Link>
// 							</div>
// 						<button type="submit" className='button'>Register</button>
// 					</form> 
//                     </div>
// 				</div>
// 		} </>
// 	);
// };

// const styles = {
// 	...commonStyles,
// 	textarea: {
// 		height: 120,
// 		resize: 'vertical',
// 		paddingTop: '10px',
// 		borderRadius: 10
// 	}
// };

// export default Register;

import React, { useState } from 'react';
import commonStyles from '../shared/commonStyles.js';
import './Register.css';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { registerSchema } from './validation.js';
import Welcome from './Welcome.jsx';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        phone: '',
        email: '',
        password: '',
        role:'Admin'
    };

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            console.log(values)
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL2}/auth/register`, values);
            if (data.message === 'success') {
                toast.success("Registered successfully");
                navigate('/login');
                resetForm();
            }
        } catch (error) {
            const {response} = error;
            toast.error(response.data.message || "Registration failed. Please try again later."); 
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema
    });

    return (
        <div className='Grid-Auth'>
 
                <Welcome/>

            <div className='form-wrapper'>
                <form onSubmit={formik.handleSubmit} style={styles.container} className='align-items-center justify-content-center'>
                <div className='text-center'>
                    <h2 className='Form-header'>Register</h2>
                </div>
                    <div className="form-group">
                        <input type="text" {...formik.getFieldProps('username')} placeholder="username" style={styles.input} />
                        {formik.errors.username && formik.touched.username && <p className="text-danger">{formik.errors.username}</p>}
                    </div>

                    <div className="form-group">
                        <input type="tel" {...formik.getFieldProps('phone')} placeholder="phone" style={styles.input} />
                        {formik.errors.phone && formik.touched.phone && <p className="text-danger">{formik.errors.phone}</p>}
                    </div>

                    <div className="form-group">
                        <input type="email" {...formik.getFieldProps('email')} placeholder="email" style={styles.input} />
                        {formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <input type="password" {...formik.getFieldProps('password')} placeholder="password" style={styles.input} />
                        {formik.errors.password && formik.touched.password && <p className="text-danger">{formik.errors.password}</p>}
                    </div>

                    <div className='d-flex'>
                        <span className='text-black mb-3 me-1'>Already have an account?</span>
                        <Link to='/login'>Sign in</Link>
                    </div>
                    <button type="submit" className='button'>Register</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    ...commonStyles,
    textarea: {
        height: 120,
        resize: 'vertical',
        paddingTop: '10px',
        borderRadius: 10
    }
};

export default Register;
