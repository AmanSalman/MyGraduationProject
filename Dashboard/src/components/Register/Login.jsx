// import React, { useContext, useState, useEffect } from 'react';
// import commonStyles from '../shared/commonStyles.js';
// import './Register.css';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import Loader from '../Loader/Loader.jsx';
// import { toast } from 'react-toastify';
// import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../../assets/Logo.png';
// import { UserContext } from '../context/User.jsx';
// import { LoginSchema } from './validation.js';

// const Login = () => {
//     const [loading, setLoading] = useState(true); // Initially set loading to true
//     const navigate = useNavigate();
//     let { token, setToken} = useContext(UserContext);

//     useEffect(() => {
//         setLoading(false); // Set loading to false after component is mounted
//     }, []);

//     if (token) {
//         navigate(-1);
//     }

//     const initialValues = {
//         email: '',
//         password: '',
//     };

//     const onSubmit = async (admin, { resetForm }) => {
//         try {
//             setLoading(true);
//             const { data } = await axios.post(`${import.meta.env.VITE_API_URL2}/auth/login`, admin);
//             if (data.message === 'success') {
//                 localStorage.setItem("userToken", `${data.token}`);
//                 setToken(`${data.token}`);
//                 toast.success("Login successfully");
//                 resetForm();
//                 navigate('/');
//             } else {
//                 toast.error("Login failed. Please check your credentials.");
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("An error occurred while processing your request.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const formik = useFormik({ initialValues, onSubmit, validationSchema:LoginSchema });

//     return (
//         <>
//             {loading ? (
//                 <Loader /> // Display loader while component is being loaded
//             ) : (
//                 <div className='d-flex align-items-center flex-wrap vh-100'>
//                     <div className='d-flex justify-content-center align-items-center vh-100 flex-item-registration flex-wrap' style={{ backgroundColor: '#00B1EB' }}>
//                         <img src={Logo}
//                             alt='logo'
//                             className=' img-fluid'
//                             style={{
//                                 borderRadius: '50%',
//                                 width: '35%',
//                                 margin: '1em'
//                             }}
//                         />
//                         <div>
//                             <h1 className='HeadingRegister'>Hello Again!</h1>
//                             <h2 className='subHeading'>Welcome back</h2>
//                         </div>
//                     </div>
//                     <div className='flex-item-registration flex-grow-1'>
//                         <div className='text-center'>
//                             <h2 className='maincolortext'>Sign in</h2>
//                         </div>
//                         <form onSubmit={formik.handleSubmit} style={styles.container} className='align-items-center justify-content-center'>
//                             <input type="email"
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                                 placeholder="email"
//                                 style={styles.input}
//                                 id="email"
//                                 name="email" />
//                             <input type="password"
//                                 value={formik.values.publishingHouse}
//                                 onChange={formik.handleChange}
//                                 placeholder="password"
//                                 style={styles.input}
//                                 id="password"
//                                 name="password" />
//                             <div className='d-flex flex-column align-items-center'>
//                                 <div className='d-flex'>
//                                     <span className='text-black me-1'>You don't have an accout?  </span>
//                                     <Link className='pinkMain' to='/register'>Create One.</Link>
//                                 </div>
//                                 <Link className='pinkMain mb-3' to='/forgotPassword'>Forget Password?</Link>
//                             </div>
//                             <button type="submit" className='button'>Sign in</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// const styles = {
//     ...commonStyles,
//     textarea: {
//         height: 120,
//         resize: 'vertical',
//         paddingTop: '10px',
//         borderRadius: 10
//     }
// };

// export default Login;
import React, { useContext, useState, useEffect } from 'react';
import commonStyles from '../shared/commonStyles.js';
import './Register.css';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import { LoginSchema } from './validation.js';
import Welcome from './Welcome.jsx';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [loading, setLoading] = useState(true); // Initially set loading to true
    const navigate = useNavigate();
    let { token, setToken } = useContext(UserContext);

    useEffect(() => {
        if (token) {
            navigate(-1);
    }else {
        setLoading(false); // Set loading to false after component is mounted 
    }
    }, []);

    

    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (values, { resetForm }) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL2}/auth/login`, values);
            if (data.message === 'success') {
                const decodedToken =jwtDecode(data.token);
                console.log('Decoded Token:', decodedToken);
                if(decodedToken.role != 'Admin' || decodedToken.status != 'Activated'){
                    toast.error("access denied");
                } else if (decodedToken.role == 'Admin' && decodedToken.status == 'Activated'){
                    localStorage.setItem("userToken", `${data.token}`);
                    setToken(`${data.token}`);
                    toast.success("Login successfully");
                    resetForm();
                    navigate('/');
                }
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while processing your request.");
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({ initialValues, onSubmit, validationSchema: LoginSchema });

    if(loading){
        return <Loader/>
    }
    return (
        <>
                <div className='Grid-Auth'>
                    <Welcome/>
                    <div className='form-wrapper'>
                        <form onSubmit={formik.handleSubmit} style={styles.container} className='align-items-center justify-content-center'>
                        <div className='text-center'>
                            <h2 className='Form-header'>Sign in</h2>
                        </div>
                            <div className="form-group">
                                <input type="email" {...formik.getFieldProps('email')} placeholder="email" />
                                {formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <input type="password" {...formik.getFieldProps('password')} placeholder="password" />
                                {formik.errors.password && formik.touched.password && <p className="text-danger">{formik.errors.password}</p>}
                            </div>

                            <div className='d-flex flex-column align-items-center'>
                                <div className='d-flex Links-wrapper'>
                                    <span className='text-black me-1'>You don't have an account?  </span>
                                    <Link to='/register'>Create One.</Link>
                                </div>
                                <Link className='pinkMain mb-3' to='/forgotPassword'>Forget Password?</Link>
                            </div>
                            <button type="submit" className='button'>Sign in</button>
                        </form>
                    </div>
                </div>
            
        </>
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

export default Login;
