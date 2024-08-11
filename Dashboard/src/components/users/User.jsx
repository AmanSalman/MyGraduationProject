// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useQuery } from 'react-query';
// import { Link } from 'react-router-dom';
// import Accept from '../../assets/accept (2).png';
// import Reject from '../../assets/decline.png';
// import { UserContext } from '../context/User.jsx';
// import Loader from '../Loader/Loader.jsx';
// import Error from '../shared/Error.jsx';
// import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

// function User() {
//   const [error, setError] = useState(null);
//   const [Users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const {token} = useContext(UserContext);
  
//   const fetchUsers = async () => {
//       try {
//         setIsLoading(true);
//         const {data} = await axios.get(`${import.meta.env.VITE_API_URL2}/user/`,
//         {headers:{Authorization: `AmanGRAD__${token}`}} 
//     );
//         setUsers(data.users);
//         setIsLoading(false)
//       } catch (error) {
//         setIsLoading(false)
//         const {response} = error;
//         setError(response.data.message);
//       } finally{
//         setIsLoading(false)
//       }
//     };

//    //pagination
//    const [currentPage, setCurrentPage] = useState(1);
//    const recordsPerPage = 4;
//    const LastIndex = currentPage * recordsPerPage;
//    const firstIndex = LastIndex - recordsPerPage;
//    const records = Users.slice(firstIndex, LastIndex);
//   const npage = Math.ceil(Users.length / recordsPerPage);
//   const numbers = [...Array(npage + 1).keys()].slice(1);

//   useEffect(()=>{
//     fetchUsers();
//   },[])

//   if(isLoading)return <Loader />;

//     return (
//         <>
//         <nav aria-label="breadcrumb">
//   <ol className="breadcrumb">
//     <li className="breadcrumb-item active" aria-current="page">Pages</li>
//     <li className="breadcrumb-item active" aria-current="page">users</li>
//   </ol>
// </nav>

//         <div className='table-container border container'>
//         <Link to={'/'} className='arrow'><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/></Link>
//             {error != null? <Error message={error}/>:
//                     <>
//                         <table className='generaltable'>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Phone</th>
//                                     <th>Status</th>
//                                     <th>Role</th>
//                                     <th>Email</th>
// 									<th>Disable</th>
//                                     <th>Activate</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                  records?.map((user, index) => (
//                                     <tr key={user._id}>
//                                         <td>{firstIndex + index + 1}</td> 
//                                         <td>{user.username}</td>
//                                         <td>{user.phone}</td>
//                                         <td style={{ color: user.status === 'Activated' ? 'green' : 'red' }}>{user.status}</td>
//                                         <td>{user.role}</td>
//                                         <td>{user.email}</td>
//                                         <td>
//                                             {
//                                               user.status !== 'Disabled'? 
//                                               <>
//                                                <Link className='d-flex justify-content-center' to={`/users/disable/${user._id}`}>
//                                               <img src={Reject} alt='Reject' width={"45px"} />
//                                               </Link>
//                                               </>
//                                               : null
//                                             }
                                            
//                                         </td>
//                                         <td>
//                                             {
//                                                 user.status !== 'Activated'? <>
//                                                  <Link className='d-flex justify-content-center' to={`/users/Activate/${user._id}`}>
//                                                 <img src={Accept} alt='Activate' width={"32px"} />
//                                             </Link>
//                                                 </> : null
//                                             }
                                           
//                                         </td>
//                                     </tr>
//                                 ))
                                
                                
//                                 }
//                             </tbody>
//                         </table>
//                         <nav className='pagination-style'>
//                             <ul className='pagination'>
//                                 <li className='page-item'>
//                                     <a href='#' className='page-link' onClick={prePage}> Prev</a>
//                                 </li>
//                                 {
//                                     numbers.map((n, i) => (
//                                         <li className={`'page-item' ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`} key={i}>
//                                             <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
//                                         </li>
//                                     ))
//                                 }

//                                 <li className='page-item'>
//                                     <a href='#' className='page-link' onClick={nextPage}> Next</a>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </>
// }
   
//         </div>
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

// export default User;


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Accept from '../../assets/accept (2).png';
import Reject from '../../assets/decline.png';
import { UserContext } from '../context/User.jsx';
import Loader from '../Loader/Loader.jsx';
import Error from '../shared/Error.jsx';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import './User.css';
import Pagination from '../shared/Pagination.jsx';
import ConfirmationModal from '../shared/ConfirmationModal.jsx';

function User() {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(UserContext);
  const [searchCriteria, setSearchCriteria] = useState('username');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => {});

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/user/`, {
        headers: { Authorization: `AmanGRAD__${token}` }
      });
      const Users  = data.users.filter(user=> user.role === 'User')
      setUsers(Users);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const { response } = error;
      setError(response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  useEffect(() => {
    fetchUsers();
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

  const handleDelete = (id) => {
    openModal('Are you sure you want to disable the user? This action cannot be undone.', () => {
      navigate(`/users/disable/${id}`);
    });
  };

  const filteredUsers = users.filter(user =>
    user[searchCriteria]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredUsers.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredUsers.length / recordsPerPage);

  if (isLoading) return <Loader />;

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">Pages</li>
          <li className="breadcrumb-item active" aria-current="page">users</li>
        </ol>
      </nav>

      <div className="table-container border container">
        <Link to={'/'} className="arrow">
          <TbArrowBigLeftLineFilled className="main-color-text arrowback-pages" />
        </Link>
        {error ? (<Error message={error} /> ):
        users?.length > 0 ?
          <>
            <div className="search-container">
              <select
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
                className="form-control mb-3 dropdown"
              >
                <option value="username">Username</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${searchCriteria}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
            </div>
            <table className="generaltable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Disable</th>
                  <th>Activate</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {records.map((user, index) => (
                  <tr key={user._id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td style={{ color: user.status === 'Activated' ? 'green' : 'red' }}>{user.status}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.status !== 'Disabled' &&
                        <button className="d-flex justify-content-center" onClick={() => handleDelete(user._id)}>
                          <img src={Reject} alt="Reject" width="45px" />
                        </button>
                      }
                    </td>
                    <td>
                      {user.status !== 'Activated' &&
                        <Link className="d-flex justify-content-center" to={`/users/Activate/${user._id}`}>
                          <img src={Accept} alt="Activate" width="32px" />
                        </Link>
                      }
                    </td>
                    <td>
                      <Link to={`/userOrders/${user._id}`} className='btn btn-outline-dark'>
                        Show
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={npage} onPageChange={setCurrentPage} />
          </>: (<p className="text-center">no users found</p>)
        }
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

export default User;

 