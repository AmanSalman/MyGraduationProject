import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { UserContext } from '../context/User';

function ActivateUser() {
    const [loading, isloading]= useState(true)
    const {id}= useParams();
    const navigate = useNavigate()
    const {token} = useContext(UserContext)
    const Activate = async ()=>{
        try {
            isloading(true);
            // const token = localStorage.getItem('userToken')
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL2}/user/Activate/${id}`,{}, {headers:{
                Authorization: `AmanGRAD__${token}`
            }});
            if(data.message == 'success'){
                toast.success("User activated successfully")
            }
            isloading(false)
        } catch (error) {
            const {response} = error;
            toast.error(response.data.message)
            isloading(false)
        } finally{
            isloading(false)
        }
        navigate('/users')
    }


    useEffect(()=>{
        Activate();
    },[])
  return (
    <></>
  )
}

export default ActivateUser