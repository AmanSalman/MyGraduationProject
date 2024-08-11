import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { UserContext } from "../context/User";
import axios from "axios";

function DeliveredOrder() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(UserContext);
  const navigate = useNavigate()
  const location = useLocation();
  const delivered = async ()=>{
    try {
      setIsLoading(true);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL2}/order/${id}`,
        {status: 'delivered'},
        {
          headers: { Authorization: `AmanGRAD__${token}` },
        }
      );
      console.log(data)
      if(data.message == 'success'){
        toast.success('order delivered successfully');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      const {response} = error
      toast.error(response?.data.message || 'something went wrong');
      setIsLoading(false);
    }finally {
      setIsLoading(false);
    }
    navigate(location.state?.from || '/orders'); 
  }

  useEffect(()=>{
    delivered();
  },[])

  if(isLoading){
    return <Loader/>
  }

  return <></>
}

export default DeliveredOrder;
