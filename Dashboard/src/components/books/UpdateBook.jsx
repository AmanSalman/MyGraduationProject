// import React, {useContext, useEffect, useState} from "react";
// import commonStyles from "../shared/commonStyles.js";
// import {useFormik} from "formik";
// import axios from "axios";
// import Loader from "../Loader/Loader.jsx";
// import {toast} from "react-toastify";
// import Input from "../shared/Input.jsx";
// import {useNavigate, useParams, useLocation} from "react-router-dom";
// import {UserContext} from "../context/User.jsx";

// const UpdateBook = () => {
// 	const [loading, setLoading] = useState(false);
// 	const {id} = useParams();
// 	const {token} = useContext(UserContext);
//     const navigate = useNavigate()
// 	const initialValues = {
// 		isbn: "",
// 		title: "",
// 		price: 0,
// 		description: "",
// 		publishingHouse: "",
// 		categoryName: "",
// 		image: null
// 	};

// 	const handelFieldChange = (event) => {
// 		formik.setFieldValue("image", event.target.files[0]);
// 	};

// 	const onSubmit = async (book) => {
// 		try {
// 			setLoading(true);
// 			const formData = new FormData();
// 			formData.append("isbn", book.isbn);
// 			formData.append("title", book.title);
// 			formData.append("price", book.price);
// 			formData.append("image", book.image);
// 			formData.append("description", book.description);
// 			formData.append("publishingHouse", book.publishingHouse);
// 			formData.append("categoryName", book.categoryName);

// 			const {data} = await axios.patch(`${
// 				import.meta.env.VITE_API_URL2
// 			}/book/${id}`, formData, {
// 				headers: {
// 					Authorization: `AmanGRAD__${token}`
// 				}
// 			});
// 			if (data.message == "success") {
// 				toast.success("Book updated successfully");
// 			}
// 			setLoading(false);
// 		} catch (error) {
// 			const {response} = error;
// 			if (response) {
// 				toast.error(response.data.message);
// 			} else {
// 				toast.error(error.message);
// 			}
//             setLoading(false)
// 		} finally {
// 			setLoading(false);
// 		}
//         navigate('/books')
// 	};

// 	const formik = useFormik({initialValues, onSubmit});

// 	const inputs = [
// 		{
// 			id: "isbn",
// 			type: "text",
// 			name: "isbn",
// 			title: "ISBN",
// 			value: formik.values.isbn
// 		},
// 		{
// 			id: "title",
// 			type: "text",
// 			name: "title",
// 			title: "Title",
// 			value: formik.values.title
// 		},
// 		{
// 			id: "price",
// 			type: "number",
// 			name: "price",
// 			title: "Price",
// 			value: formik.values.price
// 		},
// 		{
// 			id: "description",
// 			type: "textarea",
// 			name: "description",
// 			title: "Description",
// 			value: formik.values.description
// 		}, {
// 			id: "publishingHouse",
// 			type: "text",
// 			name: "publishingHouse",
// 			title: "Publishing House",
// 			value: formik.values.publishingHouse
// 		}, {
// 			id: "categoryName",
// 			type: "text",
// 			name: "categoryName",
// 			title: "Category Name",
// 			value: formik.values.categoryName
// 		}, {
// 			id: "image",
// 			type: "file",
// 			name: "image",
// 			title: "Image",
// 			onChange: handelFieldChange
// 		},
// 	];

// 	const renderInputs = inputs.map((input, index) => (
// 		<Input type={
// 				input.type
// 			}
// 			id={
// 				input.id
// 			}
// 			name={
// 				input.name
// 			}
// 			title={
// 				input.title
// 			}
// 			value={
// 				input.value
// 			}
// 			key={index}
// 			onChange={
// 				formik.handleChange || input.handelFieldChange
// 			}
// 			errors={
// 				formik.errors
// 			}
// 			onBlur={
// 				formik.handleBlur
// 			}
// 			touched={
// 				formik.touched
// 			}
// 			className="pb-4 pt-3"/>
// 	));

// 	const [imageUrl, setImageUrl] = useState(null);
// 	const fetchBook = async () => {
// 		try {
//             setLoading(true);
// 			const {data} = await axios.get(`${
// 				import.meta.env.VITE_API_URL2
// 			}/book/${id}`,
// 		{headers:{
// 			Authorization:`AmanGRAD__${token}`
// 		}});
// 		console.log(data);
// 			formik.setFieldValue("isbn", data.book.isbn);
// 			formik.setFieldValue("title", data.book.title);
// 			formik.setFieldValue("price", data.book.price);
// 			formik.setFieldValue("description", data.book.description);
// 			formik.setFieldValue("publishingHouse", data.book.publishingHouse);
// 			formik.setFieldValue("categoryName", data.book.categoryName);
// 			setImageUrl(data.book.mainImage.secure_url);
//             setLoading(false);
// 		} catch (err) {
// 			const {response} = err;
// 			if (response) {
// 				toast.error(response.data.message);
// 			} else {
// 				toast.error(err.message);
// 			}
//             setLoading(false)
// 		} finally {
//             setLoading(false)
//         }
// 	};

// 	useEffect(() => {
// 		fetchBook();
// 	}, []);

// 	return (
// 		<div className="component-container">
// 			{
// 			loading ? (
// 				<Loader/>) : (
// 				<>
// 					<form onSubmit={
// 							formik.handleSubmit
// 						}
// 						style={
// 							styles.container
// 					}>
// 						<div className="d-flex align-items-center w-50">
// 							{
// 							imageUrl && (
// 								<img src={imageUrl}
// 									alt="book Image"
// 									style={
// 										{borderRadius: "50%"}
// 									}
// 									className="img-fluid w-50"/>
// 							)
// 						} </div>
// 						{renderInputs}
// 						<button type="submit"
// 							style={
// 								styles.button
// 							}
// 							disabled={
// 								! formik.isValid
// 						}>
// 							Update Book
// 						</button>
// 					</form>
// 				</>
// 			)
// 		} </div>
// 	);
// };

// const styles = {
// 	...commonStyles,
// 	textarea: {
// 		height: 120,
// 		resize: "vertical",
// 		paddingTop: "10px",
// 		borderRadius: 10
// 	}
// };

// export default UpdateBook;

import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/User';
import './book.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import { updateBookSchema } from './validation.js';

const UpdateBook = () => {
    const { id } = useParams();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(updateBookSchema)
    });
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [book, setBook] = useState({
        isbn: '',
        title: '',
        price:0,
        description: '',
        publishingHouse: '',
        Discount: '',
        stock: '',
        categoryName:'',
        categoryId:'',
        status: '',
        mainImage: []
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);
    const [mainImageUrl, setMainImageUrl] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/book/${id}`, {
                    headers: {
                        Authorization: `AmanGRAD__${token}`
                    }
                });
                const { isbn, title, price, description, publishingHouse,categoryName, Discount, stock, status, mainImage, categoryId } = data.book;
                setBook({
                    isbn,
                    title,
                    price,
                    description,
                    publishingHouse,
                    categoryName,
                    categoryId,
                    Discount,
                    stock,
                    status,
                    mainImage,
                });
                console.log(book)
                setMainImageUrl(mainImage.secure_url);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to fetch book';
                toast.error(errorMessage);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/category`, {
                    headers: {
                        Authorization: `AmanGRAD__${token}`
                    }
                });
                setCategories(data.Categories);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
                toast.error(errorMessage);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
        fetchCategories();
    }, [id, token]);

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setMainImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setMainImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async () => {
        const currentValues = getValues();
        const changedData = Object.keys(currentValues).reduce((acc, key) => {
            if (currentValues[key] !== book[key] && currentValues[key]!='') {
                acc[key] = currentValues[key];
            }
            return acc;
        }, {}); 
        console.log(changedData)

        const formData = new FormData();
        for (const key in changedData) {
            formData.append(key, changedData[key]);
        }

        if (mainImage) {
            formData.append('mainImage', mainImage);
        }

        try {
            setLoading(true);
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL2}/book/${id}`, formData, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });

            if (data.message === "success") {
                toast.success("Book updated successfully");
                navigate(`/update/${id}`);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { message, error: validationErrors } = error.response.data;
                if (message === 'validation error' && Array.isArray(validationErrors)) {
                    validationErrors.forEach(validationError => {
                        const { categoryId } = validationError;
                        // Display error message for specific field
                        if (categoryId) {
                            toast.error(`Category name: ${categoryId}`);
                        } else {
                            toast.error(message);
                        }
                    });
                } else {
                    toast.error(message || 'Failed to update book');
                }
            } else {
                toast.error('Failed to update book');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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
            </ol>
            <div className="component-container updateBook">
                <Link to={'/books'} className="arrow">
                    <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/>
                </Link>
                
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div>
                        <label>ISBN :</label>
                        <input {...register('isbn')} type="text" defaultValue={book.isbn} />
                        {errors.isbn && <p className='text-danger'>{errors.isbn.message}</p>}
                    </div>
                    <div>
                        <label>Title :</label>
                        <input {...register('title')} type="text" defaultValue={book.title} />
                        {errors.title && <p className='text-danger'>{errors.title.message}</p>}
                    </div>
                    <div>
                        <label>Price :</label>
                        <input {...register('price')} type="number" defaultValue={book.price} />
                        {errors.price && <p className='text-danger'>{errors.price.message}</p>}
                    </div>
                    <div>
                        <label>Description :</label>
                        <textarea {...register('description')} defaultValue={book.description} />
                        {errors.description && <p className='text-danger'>{errors.description.message}</p>}
                    </div>
                    <div>
                        <label>Publishing House :</label>
                        <input {...register('publishingHouse')} type="text" defaultValue={book.publishingHouse} />
                        {errors.publishingHouse && <p className='text-danger'>{errors.publishingHouse.message}</p>}
                    </div>
                    <div>
                        <label>Category :</label>
                        <select {...register('categoryId')} defaultValue={book.categoryId}>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && <p className='text-danger'>{errors.categoryId.message}</p>}
                    </div>
                    <div>
                        <label>Discount :</label>
                        <input {...register('Discount')} type="number" defaultValue={book.Discount} />
                        {errors.Discount && <p className='text-danger'>{errors.Discount.message}</p>}
                    </div>
                    <div>
                        <label>Stock :</label>
                        <input {...register('stock')} type="number" defaultValue={book.stock} />
                        {errors.stock && <p className='text-danger'>{errors.stock.message}</p>}
                    </div>
                    <div>
                        <label>Status :</label>
                        <select {...register('status')} defaultValue={book.status}>
                            <option value="Active">Active</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                        {errors.status && <p className='text-danger'>{errors.status.message}</p>}
                    </div>
                    <div>
                        <label>Main Image :</label>
                        {mainImageUrl && <img src={mainImageUrl} alt="Main Book" className='main-img' />}
                        <input type="file" onChange={handleMainImageChange} />
                        {errors.mainImage && <p className='text-danger'>{errors.mainImage.message}</p>}
                    </div>
                    <div>
                        <label>Sub Images :</label>
                        <Link to={`/books/update-subimages/${id}`}>Update Sub Images</Link>
                    </div>
                    <button type="submit" className="button">Update Book</button>
                </form>
            </div>
        </>
    );
};

export default UpdateBook;
