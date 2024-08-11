// import React, {useState} from 'react';
// import commonStyles from '../shared/commonStyles.js';
// import './Register.css';
// import {useFormik} from 'formik';
// import axios from 'axios';
// import Loader from '../Loader/Loader.jsx';
// import {useNavigate} from 'react-router-dom';
// import Logo from '../../assets/Logo.png';
// import { Sendcode } from './validation.js';
// function SendCode() {
//     const [loading, setLoading] = useState(false);
// 	const navigate = useNavigate();
// 	const initialValues = {
// 		email: '',
// 	};

// 	const onSubmit = async (user) => {
// 		console.log(user)
// 		try {
// 			setLoading(true);
// 			const {data} = await axios.patch(`${import.meta.env.VITE_API_URL2}/auth/sendCode`, user);
// 			console.log(data);
// 			if (data.message == 'success') {
// 				navigate('/sendcode');
// 				setLoading(false);
// 			} 
// 			setLoading(false)
// 		} catch (error) {
// 			setLoading(false)
// 			console.log(error);
// 		}
// 	};

// 	const formik = useFormik({initialValues, onSubmit, validationSchema:Sendcode});

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
//                         <h2 className='maincolortext'>Reset Password</h2>
//                         </div>
//                        <form onSubmit={formik.handleSubmit} style={styles.container} className=' align-items-center justify-content-center'>
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
// 							/>
// 							{formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
							
// 						<button type="submit" className='button'>Send Code</button>
// 					</form> 
//                     </div>
					
// 				</div>
// 		} </>
// 	);
// }
// const styles = {
// 	...commonStyles,
// 	textarea: {
// 		height: 120,
// 		resize: 'vertical',
// 		paddingTop: '10px',
// 		borderRadius: 10
// 	}
// };

// export default SendCode
import React, { useState } from 'react';
import commonStyles from '../shared/commonStyles.js';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { Sendcode } from './validation.js';
import './Register.css'
import Welcome from './Welcome.jsx';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import { toast } from 'react-toastify';

function SendCode() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const initialValues = {
    email: '',
  };

  const onSubmit = async (user) => {
    console.log(user);
    try {
      setLoading(true);
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL2}/auth/sendCode`, user);
      console.log(data);
      if (data.message === 'success') {
        navigate('/sendcode');
      } else {
        toast('Failed to send code. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema: Sendcode });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="Grid-Auth">
         <Welcome/>

          <div className="form-wrapper">
					<div className='arrow-button-register'>
                    <Link to={'/login'} className='arrow'>
                        <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' />
                    </Link>
                </div>
            <form onSubmit={formik.handleSubmit} style={styles.container} className="align-items-center justify-content-center">
            <div className="text-center">
              <h2 className="Form-header">Reset Password</h2>
            </div>
              <input
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
                style={styles.input}
                id="email"
                name="email"
              />
              {formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <button type="submit" className="button">
                Change Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  ...commonStyles,
  textarea: {
    height: 120,
    resize: 'vertical',
    paddingTop: '10px',
    borderRadius: 10,
  },
};

export default SendCode;



