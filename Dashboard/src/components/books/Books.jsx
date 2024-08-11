// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Loader from "../Loader/Loader.jsx";
// import Delete from "../../assets/decline.png";
// import Update from "../../assets/pen.png";
// import { UserContext } from "../context/User.jsx";
// import Error from "./../shared/Error";
// import { TbArrowBigLeftLineFilled } from "react-icons/tb";

// function Books() {
//   const [error, setError] = useState(null);
//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const { token } = useContext(UserContext);

//   const fetchBooks = async () => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL2}/book`,
//         { headers: { Authorization: `AmanGRAD__${token}` } }
//       );
//       setBooks(data.Books);
//       console.log(data.Books)
//       setIsLoading(false);
//     } catch (error) {
//       const { response } = error;
//       if (response) {
//         setError(response.data.message);
//       } else {
//         setError(error.message);
//       }
//       setIsLoading(false);
//     }
//   };

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 3;
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage;
//   const records = books.slice(firstIndex, lastIndex);
//   const npage = Math.ceil(books.length / recordsPerPage);
//   const numbers = [...Array(npage + 1).keys()].slice(1);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item active" aria-current="page">
//             Pages
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             Book
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             Books
//           </li>
//         </ol>
//       </nav>

//       <div
//         className="table-container border container"
//       >
//         <Link to={'/'} className="arrow"><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/></Link>
//         {error != null ? (
//           <Error message={error} />
//         ) : (
//           <>
//             <table className="generaltable">
//               <thead>
//                 <tr>
//                   <th>Isbn</th>
//                   <th>Title</th>
//                   <th>Category</th>
//                   {/* <th>Description</th> */}
//                   <th>Publishing House</th>
//                   <th>Book Image</th>
//                   <th>Status</th>
//                   <th>Stock</th>
//                   <th>Discount</th>
//                   <th>Price</th>
//                   <th>Final Price</th>
//                   <th>Delete</th>
//                   <th>Update</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {records.map((book) => (
//                   <tr key={book._id}>
//                     <td>{book.isbn}</td>
//                     <td>{book.title}</td>
//                     <td>{book.categoryName}</td>
//                     {/* <td>{book.description}</td> */}
//                     <td>{book.publishingHouse}</td>
//                     <td>
//                       <img
//                         src={book.mainImage?.secure_url}
//                         style={{
//                           borderRadius: "50%",
//                           width: "fit-content",
//                           height: "5em",
//                         }}
//                         alt="Book image"
//                       />
//                     </td>
//                     <td>{book.status}</td>
//                     <td>{book.stock}</td>
//                     <td>{book.Discount}</td>
//                     <td>{book.price}</td>
//                     <td>{book.finalPrice}</td>
//                     <td>
//                       <Link
//                         className="d-flex justify-content-center"
//                         to={`/delete/${book.id}`}
//                       >
//                         <img src={Delete} alt="Delete" width={"45px"} />
//                       </Link>
//                     </td>
//                     <td>
//                       <Link
//                         to={`/Update/${book.id}`}
//                         className="d-flex justify-content-center"
//                       >
//                         <img src={Update} alt="Update" width={"30px"} />
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <nav className="pagination-style"
//             >
//               <ul className="pagination">
//                 <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                   <button className="page-link" onClick={prePage} disabled={currentPage === 1}>
//                     Prev
//                   </button>
//                 </li>
//                 {numbers.map((n, i) => (
//                   <li
//                     className={`page-item ${currentPage === n ? "active" : ""}`}
//                     key={i}
//                   >
//                     <button className="page-link" onClick={() => changeCPage(n)}>
//                       {n}
//                     </button>
//                   </li>
//                 ))}
//                 <li className={`page-item ${currentPage === npage ? "disabled" : ""}`}>
//                   <button className="page-link" onClick={nextPage} disabled={currentPage === npage}>
//                     Next
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </>
//         )}
//       </div>
//     </>
//   );

//   function prePage() {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }

//   function changeCPage(id) {
//     setCurrentPage(id);
//   }

//   function nextPage() {
//     if (currentPage < npage) {
//       setCurrentPage(currentPage + 1);
//     }
//   }
// }

// export default Books;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import Delete from "../../assets/decline.png";
import Update from "../../assets/pen.png";
import { UserContext } from "../context/User.jsx";
import Error from "./../shared/Error";
import { TbArrowBigLeftLineFilled } from "react-icons/tb";
import './book.css'
import ConfirmationModal from "../shared/ConfirmationModal.jsx";
import Pagination from "../shared/Pagination.jsx";

function Books() {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => {});

  const [searchCriteria, setSearchCriteria] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL2}/book`,
        { headers: { Authorization: `AmanGRAD__${token}` } }
      );
      setBooks(data.Books);
      setIsLoading(false);
    } catch (error) {
      const { response } = error;
      if (response) {
        setError(response.data.message);
      } else {
        setError(error.message);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
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

  const handledelete= (bookId) => {
    openModal('Are you sure you want to delete the book? This action cannot be undone.', () => {
        navigate(`/delete/${bookId}`);
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBooks = books.filter(book =>
    book[searchCriteria]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = filteredBooks.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredBooks.length / recordsPerPage);


  if(isLoading){
    return <Loader/>
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Pages
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Book
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Books
          </li>
        </ol>
      </nav>

      <div className="table-container border container">
        <Link to={'/'} className="arrow">
          <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/>
        </Link>
        {error != null ? (
          <Error message={error} />
        ) : 
          books?.length > 0 ?
          <>
            <div className="search-container">
              <select
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
                className="form-control mb-3 dropdown"
              >
                <option value="title">Title</option>
                <option value="isbn">ISBN</option>
                <option value="categoryName">Category</option>
                <option value="publishingHouse">Publishing House</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${searchCriteria}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
               <Link className='button' to={'/addbook'}>
                add book
              </Link>
            </div>
            <table className="generaltable">
              <thead>
                <tr>
                  <th>Isbn</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Publishing House</th>
                  <th>Book Image</th>
                  <th>Status</th>
                  <th>Stock</th>
                  <th>Discount</th>
                  <th>Price</th>
                  <th>Final Price</th>
                  <th>Reviews</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {records.map((book) => (
                  <tr key={book._id}>
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{book.categoryName}</td>
                    <td>{book.publishingHouse}</td>
                    <td>
                      <img
                        src={book.mainImage?.secure_url}
                        style={{
                          borderRadius: "50%",
                          width: "fit-content",
                          height: "5em",
                        }}
                        alt="Book image"
                      />
                    </td>
                    <td>{book.status}</td>
                    <td>{book.stock}</td>
                    <td>{book.Discount}</td>
                    <td>{book.price}</td>
                    <td>{book.finalPrice}</td>
                    <td>
                    <Link to={`/bookreview/${book._id}`} className='btn btn-outline-dark'>
                    Reviews
                      </Link>
                    </td>
                    <td>
                      <button
                        className="d-flex justify-content-center"
                        onClick={()=>handledelete(book.id)}
                      >
                        <img src={Delete} alt="Delete" width={"45px"} />
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/Update/${book.id}`}
                        className="d-flex justify-content-center"
                      >
                        <img src={Update} alt="Update" width={"30px"} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination currentPage={currentPage} totalPages={npage} onPageChange={handlePageChange} />
          </>
        :  (<p className="text-center">no Books found</p>)}
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

export default Books;
