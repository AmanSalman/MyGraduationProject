import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Loader/Loader.jsx';
import { UserContext } from '../../context/User.jsx';

function Onway() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {token} = useContext(UserContext)
    const OnwayOrder = async () => {
        try {
            setLoading(true);
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL2}/order/`,{
              currentStatus:"accepted",
              newStatus:"onway"
            },
            { headers: { Authorization: `AmanGRAD__${token}` } },
            );
            if(data.message ){
              toast.success('Orders Onway All successfully');
            }
            console.log(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const {response} = error;
            toast.error(response?.data?.message || 'Failed to Onway All orders');
        } finally {
          setLoading(false);
        }

        navigate('/accepted')
    }

    useEffect(() => {
      OnwayOrder();
      }, []); 

    if (loading) {
        return <Loader />;
      }

  return <></>

}

export default Onway;

