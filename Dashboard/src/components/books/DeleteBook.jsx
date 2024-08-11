import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { UserContext } from '../context/User.jsx';

function DeleteBook() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const deleteBook = async () => {
    try {
      console.log(id)
      setLoading(true);
      const res = await axios.delete(`${import.meta.env.VITE_API_URL2}/book/${id}`, {
        headers: { Authorization: `AmanGRAD__${token}` },
      });

      if (res.status ===200) {
        toast.success("Book deleted successfully");
      } 
    } catch (error) {
      console.error(error);
      const {response} = error;
            toast.error(response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
    navigate('/books'); 
  };

  useEffect(() => {
    deleteBook();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return( <></>)
}

export default DeleteBook;
