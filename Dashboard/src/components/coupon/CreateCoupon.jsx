import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import '../books/book.css';
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import { createCouponSchema } from './Coupon.validation';


const CreateCoupon = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(createCouponSchema)
  });
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (Coupon) => {
    try {
      setLoading(true);
      console.log(Coupon);

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL2}/coupon/`, Coupon, {
        headers: {
          Authorization: `AmanGRAD__${token}`
        }
      });

      console.log(data);
      if (data.message === 'success') {
        toast.success('Coupon created successfully');
        reset();
      }
    } catch (error) {
      const { response } = error;
      toast.error(response?.data?.message || 'Failed to create coupon');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
          Coupon
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Coupon
        </li>
      </ol>
      <div className="component-container d-flex flex-column bookadd">
        <Link to={'/coupons'} className='arrow'><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' /></Link>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <label htmlFor="name">Name:<span className="required">*</span></label>
            <input id="name" name="name" type="text" {...register('name')} />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="Amount">Discount:<span className="required">*</span></label>
            <input id="Amount" name="Amount" type="number" {...register('Amount')} />
            {errors.Amount && <p className="text-danger">{errors.Amount.message}</p>}
          </div>
          <div>
            <label htmlFor="status">Status:<span className="required">*</span></label>
            <select id="status" name="status" {...register('status')}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && <p className="text-danger">{errors.status.message}</p>}
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Coupon'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCoupon;
