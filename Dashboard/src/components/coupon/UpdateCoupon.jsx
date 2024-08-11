import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/User';
import '../books/book.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import Error from '../shared/Error';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateCouponSchema } from './Coupon.validation';


const UpdateCoupon = () => {
    const { id } = useParams();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(updateCouponSchema)
    });
    const [loading, setLoading] = useState(true);
    const { token } = useContext(UserContext);
    const [initialCouponData, setInitialCouponData] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCoupon = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/coupon/${id}`, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });
            const coupondata = data.coupon;
            setInitialCouponData(coupondata);
            setValue('name', coupondata.name);
            setValue('status', coupondata.status);
            setValue('Amount', coupondata.Amount);
        } catch (error) {
            setError('Error while fetching the coupon information');
        } finally {
            setLoading(false);
        }
    };

    const getChangedData = (currentValues, initialValues) => {
        const changedData = {};
        for (const key in currentValues) {
            if (currentValues[key] !== initialValues[key]) {
                changedData[key] = currentValues[key];
            }
        }
        return changedData;
    };

    const onSubmit = async (data) => {
        const currentValues = getValues();
        const changedData = getChangedData(currentValues, initialCouponData);

        const formData = new FormData();
        for (const key in changedData) {
            formData.append(key, changedData[key]);
        }

        try {
            setLoading(true);
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL2}/coupon/${id}`, formData, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });

            if (data.message === "success") {
                toast.success("Coupon updated successfully");
                navigate(`/coupons`);
            }
        } catch (error) {
            const { response } = error;
            toast.error(response?.data?.message || 'Failed to update coupon');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupon();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                    Coupon
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Update Coupon
                </li>
            </ol>
            <div className="component-container updateBook">
                <Link to={'/coupons'} className='arrow'><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/></Link>
                {error ? (
                    <Error message={error} />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div>
                            <label htmlFor="name">Coupon's Name :</label>
                            <input id="name" {...register('name')} type="text" />
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="Amount">Amount :</label>
                            <input id="Amount" {...register('Amount')} type="number" />
                            {errors.Amount && <p className="text-danger">{errors.Amount.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="status">Status :</label>
                            <select id="status" {...register('status')}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            {errors.status && <p className="text-danger">{errors.status.message}</p>}
                        </div>
                        <button type="submit" className="button">Update Coupon</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default UpdateCoupon;
