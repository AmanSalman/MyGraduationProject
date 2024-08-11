import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Loader/Loader.jsx';
import { UserContext } from '../../context/User.jsx';

function RejectOrders() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {token} = useContext(UserContext)
    const location = useLocation();
    
    const rejectOrder = async () => {
        try {
            setLoading(true);
            console.log(location.state.currentStatus)
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL2}/order/`,{
              currentStatus:location.state.currentStatus,
              newStatus:"rejected"
            },
            { headers: { Authorization: `AmanGRAD__${token}` } },
            );
            if(data.message ){
              toast.success('Orders rejected All successfully');
            }
            console.log(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const {response} = error;
            toast.error(response?.data?.message || 'Failed to deliver All orders');
        } finally {
          setLoading(false);
        }

        navigate(location.state?.from || '/orders');
    }

    useEffect(() => {
      rejectOrder();
      }, []); 

    if (loading) {
        return <Loader />;
      }

  return <></>

}

export default RejectOrders;

