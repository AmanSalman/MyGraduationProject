import './Home.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext, useEffect, useState} from 'react';
import {OrderContext} from '../context/OrderContext.jsx'
import Loader from '../Loader/Loader.jsx';
import StatsCard from '../shared/StatsCard.jsx';
import { UserContext } from '../context/User.jsx';
import { FaUsers } from 'react-icons/fa';
import { IoBagCheck } from 'react-icons/io5';
import { BsBoxes } from 'react-icons/bs';
import MyChart from './myChart.jsx';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Home() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [orders, setOrders] = useState([]);
  const [users,setUsers] = useState(0);
  const [stocks,setStocks] = useState(0)
	const [Count, setCount] = useState(0);
	const [RejectedCount, setRejectedCount] = useState(0);
	const [AcceptedCount, setAcceptedCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
  const {token}= useContext(UserContext)
	const [error, setError] = useState(null);

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

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/user/`, {
        headers: { Authorization: `AmanGRAD__${token}` }
      });
      console.log(data)
      setUsers(data.users.length);
      console.log("Total number of users:", userCount);
    } catch (error) {
      setError('Error while loading the home')
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL2}/book`,
        { headers: { Authorization: `AmanGRAD__${token}` } }
      );
      let totalStock = 0;
      data.Books.forEach(book => {
        totalStock += book.stock;
      });
      setStocks(totalStock)
  
      setIsLoading(false);
    } catch (error) {
      setError('Error while loading the home')
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchOrders = async ()=>{
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL2}/order/count`,
        { headers: { Authorization: `AmanGRAD__${token}` } }
      );
      console.log(data)
      setAcceptedCount(data.acceptedOrders);
      setCount(data.ordersCount);
      setRejectedCount(data.rejectedOrders);
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken');
        window.location.reload();
  };
  
	useEffect(() => {
		fetchOrders();
    fetchBooks();
    fetchUsers();
	}, []); 

		if (isLoading) {
			return <Loader/>
		}
  const data = {
    labels: ['Accepted Orders', 'Rejected Orders'],
    datasets: [
      {
        label: '# of Orders',
        data: [AcceptedCount || 0, RejectedCount || 0],
        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1.5,
      },
    ],
  };


  return (
    <div className="position-relative h-100">
      <div className="headerContent">

<div className='Home'>

{/* <div className="dropdown">
      <Link to={'/profile'}>
        <BiUser className='profile-icon' />
      </Link>
      <div className="dropdown-content">
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div> */}

<div className="btn-group">
  <button className="btn bg-white dropdown-toggle " type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
  <BiUser className='profile-icon' />
  </button>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to={'/profile'}>profile</Link></li>
    <li><button className="dropdown-item" onClick={handleLogout}>Log out</button></li>
  </ul>
</div>
</div>

		<nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
    <li className="breadcrumb-item active" aria-current="page">Home</li>
  </ol>
</nav>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div className='stats__holder'>
        <StatsCard title="Today's Users" number={users} change={<FaUsers />} color={'#00b1eb'}/>
      <StatsCard title="Orders" number={Count} change={<IoBagCheck />} color={'#ed157f'} />
      <StatsCard title="Stock" number={stocks}  change={<BsBoxes />} color={'#f5af2c'} />
      {/* <StatsCard title="Active Sessions" number={150} />     */}
        </div>
        
      </div>
        <div className='Home__section2' >
          <div>
          <Doughnut data={data} />
          </div>

          <div>
          <MyChart/>
          </div>
        </div>
    </div>
  );
}

export default Home;
