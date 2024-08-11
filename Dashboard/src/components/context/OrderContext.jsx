import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {UserContext} from './User.jsx';
import Loader from '../Loader/Loader.jsx';

export const OrderContext = createContext();

const OrderContextProvider = ({children}) => {
	const [orders, setOrders] = useState([]);
	const [pendingCount, setPendingCount] = useState(0);
	const [RejectedCount, setRejectedCount] = useState(0);
	const [AcceptedCount, setAcceptedCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);


	const [error, setError] = useState(null);

	const {user} = useContext(UserContext);
	// const fetchOrders = async () => {
	// 	try {
	// 		const {data} = await axios.get(`${
	// 			import.meta.env.VITE_API_URL
	// 		}/order/getAllOrders`, {
	// 			headers: {
	// 				Authorization: `${user}`
	// 			}
	// 		});
	// 		setOrders(data.orders);

	// 		// Count orders based on status
	// 		const pending = data.orders.filter(order => order.status === 'Pending').length;
	// 		const rejected = data.orders.filter(order => order.status === 'Rejected').length;
	// 		const accepted = data.orders.filter(order => order.status === 'Accepted').length;

	// 		setPendingCount(pending);
	// 		setRejectedCount(rejected);
	// 		setAcceptedCount(accepted);
	// 		setIsLoading(false);
	// 	} catch (error) {
	// 		setIsLoading(false)
	// 		setError(error.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };
	useEffect(() => {
		//fetchOrders();
	}, [user, orders]); // Fetch orders whenever user or orders change
	

	return (<OrderContext.Provider value={
		{
			orders,
			pendingCount,
			RejectedCount,
			AcceptedCount,
			isLoading,
			setIsLoading,
			error,
			setError
		}
	}> {children} </OrderContext.Provider>);
};

export default OrderContextProvider;
