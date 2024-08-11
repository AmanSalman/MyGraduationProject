import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteImage() {

    const {token} = useContext(UserContext)
    const {public_id} = useParams()
    const navigation = useNavigate();

    const handleDeleteSubImage = async () => {
        try {
            console.log(public_id)
            setLoading(true);
            // const { data } = await axios.delete(`${import.meta.env.VITE_API_URL2}/book/deleteSubimage/${id}`,{public_id}, {
            //     headers: {
            //         Authorization: `AmanGRAD__${token}`
            //     }
            // });

            // if (data.message === "success") {
            //     toast.success("Sub image deleted successfully");
            //     // Refetch subimages after deletion
            //     fetchSubImages();
            // }
        } catch (error) {
            const { response } = error;
            toast.error(response?.data?.message || 'Failed to delete subimage');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <></>
  )
}

export default DeleteImage