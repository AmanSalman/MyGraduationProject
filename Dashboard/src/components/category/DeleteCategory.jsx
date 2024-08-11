import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { UserContext } from '../context/User';

function DeleteCategory() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const {id} = useParams();
  const navigate = useNavigate();
  const {token} = useContext(UserContext)
  const deleteCategory = async ()=>{
    try{
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL2}/category/${id}`,
        {headers:{Authorization: `AmanGRAD__${token}`}}
      );
      console.log(data);
      if(data.message === 'success'){
        toast.success("Category Deleted successfully");
      } else {
        toast.warn("error while deleting the category");
      }
      setIsLoading(false);
    } catch(e){
      setError(e.message);
      console.log(e)
      setIsLoading(false);
    }finally{
      setIsLoading(false);
    }
    navigate('/categories');
  }

  useEffect(()=>{
    deleteCategory();
  },[]);

  if(isLoading){
    return <Loader/>
  }

  return (
    <></>
  )
}

export default DeleteCategory