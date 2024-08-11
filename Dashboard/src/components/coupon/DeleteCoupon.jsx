import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { UserContext } from '../context/User.jsx';

function DeleteCoupon() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const deletecoupon = async () => {
    try {
      setLoading(true);
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL2}/coupon/${id}`, {
        headers: { Authorization: `AmanGRAD__${token}` },
      });

      if (data.message === 'success') {
        toast.success("coupon deleted successfully");
      } 
    } catch (error) {
      const {response} = error;
            toast.error(response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
    navigate('/coupons'); 
  };

  useEffect(() => {
    deletecoupon();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return( <></>)
}

export default DeleteCoupon;
