import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { UserContext } from '../context/User.jsx';

function DeleteReview() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const deleteReview = async () => {
    try {
      setLoading(true);
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL2}/review/${id}`, {
        headers: { Authorization: `AmanGRAD__${token}` },
      });

      console.log(data)

      if (data.message === 'success') {
        toast.success("Review deleted successfully");
      } 
    } catch (error) {
      const {response} = error;
      console.log(error)
            toast.error(response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
    navigate('/books');
    // navigate(`/bookreview/${id}`);  
  };

  useEffect(() => {
    deleteReview();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return( <></>)
}

export default DeleteReview;
