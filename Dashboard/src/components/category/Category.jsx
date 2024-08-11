// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader.jsx';
// import Delete from '../../assets/decline.png';
// import Update from '../../assets/pen.png'
// import { UserContext } from '../context/User.jsx';
// import Error from '../shared/Error.jsx';
// import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

// function Category() {
//   const [Categories, setCategories] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const {token} = useContext(UserContext)
//   const fetchCategories = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/category/`,
//        {headers:{Authorization: `AmanGRAD__${token}`}}
//       );
//       setCategories(data.Categories);
//       setIsLoading(false)
//     } catch (error) {
//       console.log(error);
//       setError(error.message); // Set error state
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 4;
//   const LastIndex = currentPage * recordsPerPage;
//   const firstIndex = LastIndex - recordsPerPage;
//   const records = Categories.slice(firstIndex, LastIndex);
//   const npage = Math.ceil(Categories.length / recordsPerPage);
//   const numbers = [...Array(npage + 1).keys()].slice(1);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (

//     <>
//     <nav aria-label="breadcrumb">
//     <ol className="breadcrumb">
//       <li className="breadcrumb-item active" aria-current="page">
//         Pages
//       </li>
//       <li className="breadcrumb-item active" aria-current="page">
//         Category
//       </li>
//       <li className="breadcrumb-item active" aria-current="page">
//        Categories
//       </li>
//     </ol>
//   </nav>
//     <div className='table-container border container'>
//     <Link to={'/'} className='arrow'><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/></Link>
//       {error != null? <Error/>: <>
      
//       <table className="generaltable">
//         <thead>
//           <tr>
//             <th>ID </th>
//             <th>Category Name</th>
//             <th>Status</th>
//             <th>Category image</th>
//             <th>Delete</th>
//             <th>Update</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records?.map((category, index) =>
//             <tr key={category._id}>
//               <td>{index + 1}</td>
//               <td>{category.name}</td>
//               <td style={category.status === 'active' ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{category.status}</td>
//               <td><img src={category.image.secure_url} className=' img-fluid' style={{ borderRadius: '50%', width: 'fit-content', height: '5em' }} alt='category image' /></td>
//               <td><Link className='d-flex justify-content-center' to={`/deleteCategory/${category._id}`}><img src={Delete} alt='Delete' width={"45px"} /></Link></td>
//               <td>
//                 <Link
//                   className='d-flex justify-content-center'
//                   to={ `/updateCategory/${category.slug}`}
//                     state= { {id: category._id} } 
//                 >
//                   <img src={Update} alt='Update' width={"30px"} />
//                 </Link>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <ul className='pagination'>
//           <li className='page-item'>
//             <a href='#' className='page-link' onClick={prePage}> Prev</a>
//           </li>
//           {
//             numbers.map((n, i) => (
//               <li className={`'page-item' ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`} key={i}>
//                 <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
//               </li>
//             ))
//           }
//           <li className='page-item'>
//             <a href='#' className='page-link' onClick={nextPage}> Next</a>
//           </li>
//         </ul>
//       </nav>
//       </>}

   
//     </div>
//     </>
//   );


//   function prePage() {
//     if (currentPage !== 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }

//   function changeCPage(id) {
//     setCurrentPage(id);
//   }

//   function nextPage() {
//     if (currentPage !== npage) {
//       setCurrentPage(currentPage + 1);
//     }
//   }
// }

// export default Category;
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import Delete from '../../assets/decline.png';
import Update from '../../assets/pen.png'
import { UserContext } from '../context/User.jsx';
import Error from '../shared/Error.jsx';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import ConfirmationModal from '../shared/ConfirmationModal.jsx';
import Pagination from '../shared/Pagination.jsx';

function Category() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => {});

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/category/`, {
        headers: { Authorization: `AmanGRAD__${token}` }
      });
      setCategories(data.Categories);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
    openModal('Are you sure you want to delete the category? This action cannot be undone.', () => {
      console.log(id)
      navigate(`/deleteCategory/${id}`);
    });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const displayedCategories = filteredCategories.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredCategories.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Pages
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Category
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Categories
          </li>
        </ol>
      </nav>
      <div className='table-container border container'>
        <Link to={'/'} className='arrow'>
          <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/>
        </Link>
        {error != null ? (
          <Error message={error} />
        ) : 
        categories?.length > 0 ?
          <>
            <div className="search-container my-3">
              <input
                type="text"
                placeholder="Search by Category Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
              <Link className='button' to={'/addCategory'}>
                add category
              </Link>
            </div>
            <table className="generaltable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Category Image</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {displayedCategories.map((category, index) => (
                  <tr key={category._id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>{category.name}</td>
                    <td style={category.status === 'active' ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{category.status}</td>
                    <td>
                      <img
                        src={category.image.secure_url}
                        className=' img-fluid'
                        style={{ borderRadius: '50%', width: 'fit-content', height: '5em' }}
                        alt='category image'
                      />
                    </td>
                    <td>
                      <button onClick={()=>handleDelete(category._id)}
                        className='d-flex justify-content-center'
                      >
                        <img src={Delete} alt='Delete' width={"45px"} />
                      </button>
                    </td>
                    <td>
                      <Link
                        className='d-flex justify-content-center'
                        to={`/updateCategory/${category.slug}`}
                        state={{ id: category._id }}
                      >
                        <img src={Update} alt='Update' width={"30px"} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={npage} onPageChange={handlePageChange} />
          </>
       : (<p className="text-center">no categories found</p>)}
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

export default Category;
