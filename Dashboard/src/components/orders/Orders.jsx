// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import '../CSSFiles/general.css';
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader.jsx';
// import Accept from '../../assets/accept (2).png';
// import Reject from '../../assets/cross-button.png';
// import { toast } from 'react-toastify';
// import { UserContext } from '../context/User.jsx';
// import Error from '../shared/Error.jsx';
// import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

// function Orders() {
//     const [isLoading, setIsLoading] = useState(false);
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState(null);
//     const { token } = useContext(UserContext);

//     const fetchOrders = async () => {
//         try {
//             setIsLoading(true);
//             const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/order/pending`, {
//                 headers: {
//                     Authorization: `AmanGRAD__${token}`
//                 }
//             });
//             setOrders(data.pending);
//             setIsLoading(false);
//         } catch (error) {
//             const { response } = error;
//             setError(response?.error?.message || 'error while loading the orders')
//             setIsLoading(false);
//         }finally {
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     // Pagination
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 4;
//     const lastIndex = currentPage * recordsPerPage;
//     const firstIndex = lastIndex - recordsPerPage;
//     const records = orders.slice(firstIndex, lastIndex);
//     const npage = Math.ceil(orders.length / recordsPerPage);
//     const numbers = [...Array(npage + 1).keys()].slice(1);

//     if (isLoading) {
//         return <Loader />;
//     }

//     return (
//         <>
//             <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item active" aria-current="page">Pages</li>
//                     <li className="breadcrumb-item active" aria-current="page">Orders</li>
//                 </ol>
//             </nav>
//             <div className='table-container container'>
//                 <Link to={'/'} className='arrow'>
//                     <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' />
//                 </Link>
//                 {error ? (
//                     <Error message={error} />
//                 ) : (
//                     <>
//                         <table className='generaltable'>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Location</th>
//                                     <th>Total Price</th>
//                                     <th>Phone</th>
//                                     <th>Status</th>
//                                     <th>Accept</th>
//                                     <th>Reject</th>
//                                     <th>Order Details</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {records.map((order,index) => (
//                                     <tr key={order._id}>
//                                         <td>{firstIndex + index + 1}</td>
//                                         <td>{order.Address}</td>
//                                         <td>{order.finalPrice}</td>
//                                         <td>{order.phone}</td>
//                                         <td style={{ color: 'orange', fontWeight: '600' }}>{order.status}</td>
//                                         <td>
//                                             <Link className='d-flex justify-content-center text-decoration-none' to={`/acceptOrder/${order._id}`}>
//                                                 <img src={Accept} alt='Accept' width={"32px"} />
//                                             </Link>
//                                         </td>
//                                         <td>
//                                             <Link className='d-flex justify-content-center text-decoration-none' to={`/rejectOrder/${order._id}`}>
//                                                 <img src={Reject} alt='Reject' width={"32px"} />
//                                             </Link>
//                                         </td>
//                                         <td>
//                                             <Link to={`/orderDetails/${order._id}`}>
//                                                 Show Books
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <nav className='pagination-style'>
//                             <ul className='pagination'>
//                                 <li className='page-item'>
//                                     <a href='#' className='page-link' onClick={prePage}>Prev</a>
//                                 </li>
//                                 {numbers.map((n, i) => (
//                                     <li key={i} className={`page-item ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`}>
//                                         <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
//                                     </li>
//                                 ))}
//                                 <li className='page-item'>
//                                     <a href='#' className='page-link' onClick={nextPage}>Next</a>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </>
//                 )}
//             </div>
//         </>
//     );

//     function prePage() {
//         if (currentPage !== 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     }

//     function changeCPage(id) {
//         setCurrentPage(id);
//     }

//     function nextPage() {
//         if (currentPage !== npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     }
// }

// export default Orders;
// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import '../CSSFiles/general.css';
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader.jsx';
// import Accept from '../../assets/accept (2).png';
// import Reject from '../../assets/cross-button.png';
// import { toast } from 'react-toastify';
// import { UserContext } from '../context/User.jsx';
// import Error from '../shared/Error.jsx';
// import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

// function Orders() {
//     const [isLoading, setIsLoading] = useState(false);
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState(null);
//     const { token } = useContext(UserContext);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 4;
    

//     const fetchOrders = async () => {
//         try {
//             setIsLoading(true);
//             const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/order/pending`, {
//                 headers: {
//                     Authorization: `AmanGRAD__${token}`
//                 }
//             });
//             setOrders(data.pending);
//             setIsLoading(false);
//         } catch (error) {
//             const { response } = error;
//             setError(response?.error?.message || 'error while loading the orders')
//             setIsLoading(false);
//         }finally {
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const filteredOrders = orders.filter(order =>
//         order.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.phone.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const LastIndex = currentPage * recordsPerPage;
//     const firstIndex = LastIndex - recordsPerPage;
//     const displayedOrders = filteredOrders.slice(firstIndex, LastIndex);
//     const npage = Math.ceil(filteredOrders.length / recordsPerPage);
//     const numbers = [...Array(npage + 1).keys()].slice(1);

//     if (isLoading) {
//         return <Loader />;
//     }

//     return (
//         <>
//             <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item active" aria-current="page">Pages</li>
//                     <li className="breadcrumb-item active" aria-current="page">Orders</li>
//                 </ol>
//             </nav>
//             <div className='table-container container'>
//                 <Link to={'/'} className='arrow'>
//                     <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' />
//                 </Link>
//                 {error ? (
//                     <Error message={error} />
//                 ) : (
//                     orders.length >0 ?
//                     <>
//                         <div className="search-container my-3">
//                             <input
//                                 type="text"
//                                 placeholder="Search by Location or Phone"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="form-control"
//                             />
//                             <div>

//                             <Link className='button' to={'/acceptall'}>
//                                 Accept All Orders
//                             </Link>
//                             <Link className='button' to={`/rejectAll`} state={{ from: '/orders' }}  >
//                                 reject All Orders
//                                 </Link>
//                             </div>
//                         </div>
                        
//                         <table className='generaltable'>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Location</th>
//                                     <th>Total Price</th>
//                                     <th>Phone</th>
//                                     <th>Status</th>
//                                     <th>Accept</th>
//                                     <th>Reject</th>
//                                     <th>Order Details</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {displayedOrders.map((order,index) => (
//                                     <tr key={order._id}>
//                                         <td>{firstIndex + index + 1}</td>
//                                         <td>{order.Address}</td>
//                                         <td>{order.finalPrice}</td>
//                                         <td>{order.phone}</td>
//                                         <td style={{ color: 'orange', fontWeight: '600' }}>{order.status}</td>
//                                         <td>
//                                             <Link className='d-flex justify-content-center text-decoration-none' to={`/acceptOrder/${order._id}`}>
//                                                 <img src={Accept} alt='Accept' width={"32px"} />
//                                             </Link>
//                                         </td>
//                                         <td>
//                                             <Link className='d-flex justify-content-center text-decoration-none' to={`/rejectOrder/${order._id}`} state={{ from: '/orders' }}  >
//                                                 <img src={Reject} alt='Reject' width={"32px"} />
//                                             </Link>
//                                         </td>
//                                         <td>
//                                             <Link to={`/orderDetails/${order._id}`}>
//                                                 Show Books
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <nav className='pagination-style'>
//                             <ul className='pagination'>
//                                 <li className='page-item'>
//                                     <a href='#' className='page-link' onClick={prePage}>Prev</a>
//                                 </li>
//                                 {numbers.map((n, i) => (
//                                     <li key={i} className={`page-item ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`}>
//                                         <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
//                                     </li>
//                                 ))}
//                                 <li className='page-item'>
//                                     <a href='#' className='page-link' onClick={nextPage}>Next</a>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </>: <p className='text-center'>No orders found.</p>
//                 )}
//             </div>
//         </>
//     );

//     function prePage() {
//         if (currentPage !== 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     }

//     function changeCPage(id) {
//         setCurrentPage(id);
//     }

//     function nextPage() {
//         if (currentPage !== npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     }
// }

// export default Orders;
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import Accept from '../../assets/accept (2).png';
import Reject from '../../assets/cross-button.png';
import { toast } from 'react-toastify';
import { UserContext } from '../context/User.jsx';
import Error from '../shared/Error.jsx';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import Modal from 'react-modal';
import ConfirmationModal from '../shared/ConfirmationModal.jsx';
import Pagination from '../shared/Pagination.jsx';

Modal.setAppElement('#root'); // Set the root element for accessibility

function Orders() {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalAction, setModalAction] = useState(() => () => {});

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/order/orders`, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });
            const pending = data.orders.filter(order => order.status === 'pending')
            console.log(pending)
            setOrders(pending);
            setIsLoading(false);
        } catch (error) {
            const { response } = error;
            setError(response?.error?.message || 'error while loading the orders');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const openModal = (message, action) => {
        setModalMessage(message);
        setModalAction(() => action);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleConfirm = () => {
        modalAction();
        closeModal();
    };

    const handleAcceptAll = () => {
        openModal('Are you sure you want to accept all orders? This action cannot be undone.', () => {
            navigate('/acceptall');
        });
    };

    const handleRejectAll = () => {
        openModal('Are you sure you want to reject all orders? This action cannot be undone.', () => {
            navigate('/rejectAll', { state: { from: '/orders', currentStatus:'pending' } });
        });
    };

    const handleRejectOrder = (orderId) => {
        openModal('Are you sure you want to reject this order? This action cannot be undone.', () => {
            navigate(`/rejectOrder/${orderId}`, { state: { from: '/orders' } });
        });
    };

    const filteredOrders = orders.filter(order =>
        order.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const displayedOrders = filteredOrders.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredOrders.length / recordsPerPage);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Pending Orders</li>
                </ol>
            </nav>
            <div className='table-container container'>
                <Link to={'/'} className='arrow'>
                    <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' />
                </Link>
                {error ? (
                    <Error message={error} />
                ) : (
                    orders.length > 0 ? (
                        <>
                            <div className="search-container my-3">
                                <input
                                    type="text"
                                    placeholder="Search by Location or Phone"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="form-control"
                                />
                                <div>
                                    <button className='button' onClick={handleAcceptAll}>
                                        Accept All Orders
                                    </button>
                                    <button className='button' onClick={handleRejectAll} >
                                        Reject All Orders
                                    </button>
                                </div>
                            </div>
                            
                            <table className='generaltable'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>username</th>
                                        <th>Location</th>
                                        <th>Total Price</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Accept</th>
                                        <th>Reject</th>
                                        <th>Order Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedOrders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td>{firstIndex + index + 1}</td>
                                            <td>{order.userId.username}</td>
                                            <td>{order.Address}</td>
                                            <td>{order.finalPrice}</td>
                                            <td>{order.phone}</td>
                                            <td style={{ color: 'orange', fontWeight: '600' }}>{order.status}</td>
                                            <td>
                                                <Link className='d-flex justify-content-center text-decoration-none' to={`/acceptOrder/${order._id}`}>
                                                    <img src={Accept} alt='Accept' width={"32px"} />
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    className='d-flex justify-content-center text-decoration-none btn'
                                                    onClick={() => handleRejectOrder(order._id)}
                                                >
                                                    <img src={Reject} alt='Reject' width={"32px"} />
                                                </button>
                                            </td>
                                            <td>
                                                <Link className='btn btn-outline-info' to={`/orderDetails/${order._id}`}>
                                                    Show Books
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination currentPage={currentPage} totalPages={npage} onPageChange={onPageChange} />
                        </>
                    ) : <p className='text-center'>No orders found.</p>
                )}
            </div>

            <ConfirmationModal
                isOpen={modalIsOpen}
                message={modalMessage}
                onConfirm={handleConfirm}
                onClose={closeModal}
            />
        </>
    );
}

export default Orders;
