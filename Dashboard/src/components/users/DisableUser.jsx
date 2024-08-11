import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { UserContext } from '../context/User';

function DisableUser() {
    const [loading, isloading ] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const {token} = useContext(UserContext)

    const Disable = async ()=>{
        try {
            isloading(true); 
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL2}/user/${id}`,
            {},{headers:{Authorization: `AmanGRAD__${token}`}})
            if(data.message == 'success'){
               toast.success("User Disabled successfully");
            }

        } catch(e) {
           const {response} = e;
              toast.error(response.data.message);
            isloading(false);
        } finally {
           isloading(false);
        }

        navigate('/users');
    }

    useEffect(()=>{
        Disable();
    },[])

    if(loading){
      return <Loader/>;
    }

  return (
    <></>
  )
}

export default DisableUser