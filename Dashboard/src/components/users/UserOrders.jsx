// import axios from 'axios';
// import React, {useEffect, useState} from 'react'
// import {useContext} from 'react';
// import {Link, useParams} from 'react-router-dom'
// import {UserContext} from '../context/User';
// import {TbArrowBigLeftLineFilled} from 'react-icons/tb';
// import Error from '../shared/Error';
// import OrderDateTime from './OrderDateTime';

// function UserOrders() {
// const {id} = useParams();
// const {token} = useContext(UserContext)
// const [error, setError] = useState(null);
// const [isLoading, setIsLoading] = useState(true);
// const [userorders, setUserOrders] = useState([]);

// const userOrders = async () => {
// try {
//       setIsLoading(true)
// const {data} = await axios.get(`${
// import.meta.env.VITE_API_URL2
// }/order/admin/userorders/${id}`, {
// headers: {
// Authorization: `AmanGRAD__${token}`
// }
// });

//       setUserOrders(data.orders);
// console.log(userorders);
// } catch (error) {
// console.log(error)
//       setIsLoading(false);
//       const { response } = error;
//       setError(response.data.message || "Error loading user orders");
// } finally {
//       setIsLoading(false);
//     }
// }
// useEffect(() => {
// userOrders();
// }, [])
// return (

// <>
// <nav aria-label="breadcrumb">
// <ol className="breadcrumb">
// <li className="breadcrumb-item active" aria-current="page">Pages</li>
// <li className="breadcrumb-item active" aria-current="page">users</li>
// <li className="breadcrumb-item active" aria-current="page">User Orders</li>
// </ol>
// </nav>
// <div className="border container">
// <Link to={'/users'}
// className="arrow">
// <TbArrowBigLeftLineFilled className="main-color-text arrowback-pages"/>
// </Link>

//         {
//           error ? <Error message={error} /> :
// <div className="accordion" id="accordionExample">
//           {
//             userorders.map((order,index) =>
// <div className="accordion-item">
// <h2 className="accordion-header">
// <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
// Order #{index+1}
// </button>
// </h2>
// <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
// <div className="accordion-body">
//                 <p>Price : {order.finalPrice}</p>
//                 <p>phone : {order.phone}</p>
//                 <p>Address : {order.Address}</p>
//                 <p>Status : {order.status}</p>
//                 <OrderDateTime createdAt={order.createdAt} />
// </div>
// </div>
// </div>

//             )
//           }

// </div>
//         }
// </div>
// </>


// )
// }

// export default UserOrders
import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {UserContext} from '../context/User';
import {TbArrowBigLeftLineFilled} from 'react-icons/tb';
import Error from '../shared/Error';
import OrderDateTime from './OrderDateTime';
import Pagination from '../shared/Pagination';
import Loader from '../Loader/Loader';

function UserOrders() {
	const {id} = useParams();
	const {token} = useContext(UserContext);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [userorders, setUserOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 4;

	const userOrders = async () => {
		try {
			setIsLoading(true);
			const {data} = await axios.get(`${
				import.meta.env.VITE_API_URL2
			}/order/admin/userorders/${id}`, {
				headers: {
					Authorization: `AmanGRAD__${token}`
				}
			});

			setUserOrders(data.orders);
		} catch (error) {
			const {response} = error;
			setError(response ?. data ?. message || "Error loading user orders");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		userOrders();
	}, []);


	if (isLoading) {
		return <Loader/>
	}
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const records = userorders.slice(firstIndex, lastIndex);
	const npage = Math.ceil(userorders.length / recordsPerPage);

	return (
		<main className="container my-4">
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active" aria-current="page">Pages</li>
					<li className="breadcrumb-item active" aria-current="page">users</li>
					<li className="breadcrumb-item active" aria-current="page">User Orders</li>
				</ol>
			</nav>

			<div className="border p-4 bg-light">
				<Link to="/users" className="btn btn-outline-primary mb-3">
					<TbArrowBigLeftLineFilled className="me-2"/>
					Back to Users
				</Link>

				{
				error ? (
					<Error message={error}/>
				) : (userorders.length > 0 ? (
          <>
          
					<div className="accordion" id="accordionExample">
						{
						records.map((order, index) => (
							<div className="accordion-item"
								key={index}>
								<h2 className="accordion-header">
									<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
										data-bs-target={
											`#collapse${index}`
										}
										aria-expanded="false"
										aria-controls={
											`collapse${index}`
									}>
										Order #{
										firstIndex + index + 1
									} </button>
								</h2>
								<div id={
										`collapse${index}`
									}
									className="accordion-collapse collapse"
									data-bs-parent="#accordionExample">
									<div className="accordion-body">
										<p>
											<strong>Price:
											</strong>
											${
											order.finalPrice
										}₪</p>
										<p>
											<strong>Phone:
											</strong>
											{
											order.phone
										}</p>
										<p>
											<strong>Address:
											</strong>
											{
											order.Address
										}</p>
										<p>
											<strong>Status:
											</strong>
											<span className={
												getStatusColor(order.status)
											}>
												{
												order.status
											}</span>
										</p>
										<OrderDateTime createdAt={
											order.createdAt
										}/>

										<div className="books">
                    <h4 className="mb-2 fs-5 d-inline-block badge bg-primary">Books :</h4>

											<div className="row row-cols-1 row-cols-md-3 g-4">
												{
												order.books.map((book, index) => (
													<div key={index}
														className="col">
														<div className="card">
															<img src={
																	book?.mainImage?.secure_url
																}
																className="card-img-top"
																alt={
																	book.title
																}/>
															<div className="card-body">
																<h5 className="card-title">
																	{
																	book.title
																}</h5>
																<p className="card-text">Quantity: {
																	book.quantity
																}</p>
																{/* Additional details like author, price, etc., can be included here */} </div>
														</div>
													</div>
												))
											} </div>
										</div>

									</div>
								</div>
							</div>
						))
            
					} </div>
          <Pagination currentPage={currentPage}
					totalPages={npage}
					onPageChange={handlePageChange}/>
          </>
				) : <p className='text-center'>No orders found.</p>)
			}

				
			</div>
		</main>
	);
}

// Function to get the color class based on order status
const getStatusColor = (status) => {
	switch (status) {
		case 'pending':
			return 'text-orange'; // Apply orange color for pending status
		case 'accepted':
			return 'text-success'; // Apply green color for accepted status
		case 'onway':
			return 'text-yellow'; // Apply yellow color for onway status
		case 'delivered':
			return 'text-success'; // Apply green color for delivered status
		default:
			return ''; // Default color
	}
};

export default UserOrders;
