import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader.jsx';
import axios from 'axios';
import { UserContext } from '../context/User.jsx';

function RejectOrder() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { token } = useContext(UserContext);
    const location = useLocation();

    const rejectOrder = async () => {
        try {
            setLoading(true);
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL2}/order/${orderId}`,
                {status:'rejected'},
                { headers: { Authorization: `AmanGRAD__${token}` } }
            );
            if (data.message === 'success') {
                toast.success('Order rejected successfully');
            }
            console.log(data);
        } catch (error) {
            const { response } = error;
            toast.error(response?.data?.message || 'Failed to reject order');
        } finally {
            setLoading(false);
            navigate(location.state?.from || '/orders');  // Navigate back to the previous path or default to '/orders'
        }
    };

    useEffect(() => {
        rejectOrder();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return <></>;
}

export default RejectOrder;
