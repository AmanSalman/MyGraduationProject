import * as yup from 'yup';



export const createCouponSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  Amount: yup.number().typeError('Amount must be a number').integer().positive().min(1).max(50).required(),
  status: yup.string().oneOf(['active', 'inactive']).required()
});

export const updateCouponSchema = yup.object().shape({
  name: yup.string().min(3),
  Amount: yup.number().typeError('Amount must be a number').integer().positive().min(1).max(50),
  status: yup.string().oneOf(['active', 'inactive'])
});
