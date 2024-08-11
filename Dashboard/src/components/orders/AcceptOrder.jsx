import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader.jsx';
import axios from 'axios';
import { UserContext } from '../context/User.jsx';

function AcceptOrder() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {orderId} = useParams();
    const {token} = useContext(UserContext)
    const AcceptOrder = async () => {
        try {
            setLoading(true);
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL2}/order/${orderId}`,{status:'accepted'},
            { headers: { Authorization: `AmanGRAD__${token}` } },
            );
            if(data.message == 'success'){
              toast.success('Order accepted successfully');
            }
            console.log(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const {response} = error;
            toast.error(response?.data?.message || 'Failed to accept order');
        } finally {
          setLoading(false);
        }

        navigate('/orders')
    }

    useEffect(() => {
        AcceptOrder();
      }, []); 

    if (loading) {
        return <Loader />;
      }

  return <></>

}

export default AcceptOrder;

