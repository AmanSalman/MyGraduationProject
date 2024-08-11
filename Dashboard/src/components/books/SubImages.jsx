// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../context/User';
// import Loader from '../Loader/Loader';
// import { toast } from 'react-toastify';
// import { TiDelete } from 'react-icons/ti';
// import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

// const SubImages = () => {
//     const { id } = useParams();
//     const [subImages, setSubImages] = useState([]);
//     const [newSubImages, setNewSubImages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { token } = useContext(UserContext);
//     const navigate = useNavigate();

//     const fetchSubImages = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/book/${id}`, {
//                 headers: {
//                     Authorization: `AmanGRAD__${token}`
//                 }
//             });
//             setSubImages(data.book.subImages);
//         } catch (error) {
//             const { response } = error;
//             toast.error(response?.data?.message || 'Failed to fetch subimages');
//             console.error(error);
//             setLoading(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubImagesUpload = async () => {
//         const formData = new FormData();
//         for (let i = 0; i < newSubImages.length; i++) {
//             formData.append('subImages', newSubImages[i]);
//         }

//         try {
//             setLoading(true);
//             const { data } = await axios.patch(`${import.meta.env.VITE_API_URL2}/book/${id}/subimage`, formData, {
//                 headers: {
//                     Authorization: `AmanGRAD__${token}`
//                 }
//             });

//             if (data.message === "success") {
//                 toast.success("Sub images updated successfully");
//                 fetchSubImages();
//                 setNewSubImages([]);
//             }
//         } catch (error) {
//             const { response } = error;
//             toast.error(response?.data?.message || 'Failed to update subimages');
//             console.error(error);
//             setLoading(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteSubImage = async (public_id) => {
//         try {
//             setLoading(true);
//             const { data } = await axios.delete(`${import.meta.env.VITE_API_URL2}/book/deleteSubimage/${id}?public_id=${public_id}`, {
//                 headers: {
//                     Authorization: `AmanGRAD__${token}`
//                 }
//             });
//             if (data.message === "success") {
//                 toast.success("Sub image deleted successfully");
//                 fetchSubImages();
//             }
//         } catch (error) {
//             const { response } = error;
//             toast.error(response?.data?.message || 'Failed to delete subimage');
//             console.error(error);
//             setLoading(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchSubImages();
//     }, []);

//     if (loading) {
//         return <Loader />;
//     }

//     return (
//         <>
//             <ol className="breadcrumb">
//                 <li className="breadcrumb-item active" aria-current="page">
//                     Book
//                 </li>
//                 <li className="breadcrumb-item active" aria-current="page">
//                     Update Book
//                 </li>
//                 <li className="breadcrumb-item active" aria-current="page">
//                     Update Sub Images
//                 </li>
//             </ol>
//             <div className="component-container">
//             <Link to={'/'} className="arrow">
//           <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/>
//         </Link>
//                 <div className="subimages-container">
//                     {subImages.map((image, index) => (
//                         <div key={index}>
//                             <button onClick={() => handleDeleteSubImage(image.public_id)}><TiDelete fontSize={'1.5rem'} color='#00B1EB'/></button>
//                             <img src={image.secure_url} alt={`Sub Image ${index + 1}`} className="subImages" />
//                         </div>
//                     ))}
//                 </div>
//                 <div className="uploadSubImages">
//                     <label>Upload New Sub Images :</label>
//                     <input type="file" multiple onChange={(e) => setNewSubImages(Array.from(e.target.files))} />
//                     <button onClick={handleSubImagesUpload} className="button">Update Sub Images</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SubImages;
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/User';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { TiDelete } from 'react-icons/ti';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { subImagesSchema } from './validation.js'; // Adjust the path as necessary

const SubImages = () => {
    const { id } = useParams();
    const [subImages, setSubImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(subImagesSchema)
    });

    const fetchSubImages = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/book/${id}`, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });
            setSubImages(data.book.subImages);
        } catch (error) {
            const { response } = error;
            toast.error(response?.data?.message || 'Failed to fetch subimages');
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSubImagesUpload = async (data) => {
        const formData = new FormData();
        if (data.subImages.length > 0) {
            for (let i = 0; i < data.subImages.length; i++) {
                formData.append('subImages', data.subImages[i]);
            }
        }

        try {
            setLoading(true);
            const { data: response } = await axios.patch(`${import.meta.env.VITE_API_URL2}/book/${id}/subimage`, formData, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });

            if (response.message === "success") {
                toast.success("Sub images updated successfully");
                fetchSubImages();
                setValue('subImages', []); // Reset the file input
            }
        } catch (error) {
            const { response } = error;
            toast.error(response?.data?.message || 'Failed to update subimages');
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSubImage = async (public_id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL2}/book/deleteSubimage/${id}?public_id=${public_id}`, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });
            if (data.message === "success") {
                toast.success("Sub image deleted successfully");
                fetchSubImages();
            }
        } catch (error) {
            const { response } = error;
            toast.error(response?.data?.message || 'Failed to delete subimage');
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubImages();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                    Book
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Update Book
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Update Sub Images
                </li>
            </ol>
            <div className="component-container">
                <Link to={`/Update/${id}`} className="arrow">
                    <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/>
                </Link>
                <div className="subimages-container">
                    {subImages.map((image, index) => (
                        <div key={index}>
                            <button onClick={() => handleDeleteSubImage(image.public_id)}><TiDelete fontSize={'1.5rem'} color='#00B1EB'/></button>
                            <img src={image.secure_url} alt={`Sub Image ${index + 1}`} className="subImages" />
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit(handleSubImagesUpload)}>
                    <div className="uploadSubImages">
                        <label>Upload New Sub Images :</label>
                        <Controller
                            name="subImages"
                            control={control}
                            render={({ field }) => (
                                <input type="file" multiple onChange={(e) => field.onChange(e.target.files)} />
                            )}
                        />
                        {errors.subImages && <p className='text-danger'>{errors.subImages.message}</p>}
                        <button type="submit" className="button">Update Sub Images</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SubImages;
