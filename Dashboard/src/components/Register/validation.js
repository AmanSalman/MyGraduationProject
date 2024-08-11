import * as yup from 'yup';



export const LoginSchema = yup.object({
  email: yup.string().required('Email is required').email(),
  password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
});


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]+$/;

export const registerSchema = yup.object({
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters").max(30, "Username can't exceed 30 characters"),
  email: yup.string().required('Email is required').email(),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').matches(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  ),
  phone: yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must only contain digits').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number can\'t exceed 15 digits')
});


export const ProfileSchema = yup.object({
  username: yup.string().min(3, "Username must be at least 3 characters").max(30, "Username can't exceed 30 characters"),
  email: yup.string().email(),
  phone: yup.string().matches(/^[0-9]+$/, 'Phone number must only contain digits').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number can\'t exceed 15 digits')
});


export const Sendcode = yup.object({
  email: yup.string().required('Email is required').email(),
})


export const forgetPasswordSchema = yup.object({
  email: yup.string().required('Email is required').email(),
  password: yup.string()
      .required('Password is required'),
      // .min(8, 'Password must be at least 8 characters long'),
      code: yup.string().required('Code is required').length(4, 'Code must be exactly 4 characters')
    });



    export const ChangePasswordSchema = yup.object().shape({
      oldPassword: yup.string()
        .required('Old password is required'),
      newPassword: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
        confirmNewPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Please confirm your new password')
    });
    