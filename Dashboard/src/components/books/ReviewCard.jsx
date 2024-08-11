// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { BsStarFill } from 'react-icons/bs';
// import Pagination from '../shared/Pagination';
// import { toast } from 'react-toastify';
// import Loader from '../Loader/Loader';

// function ReviewCard() {
//   const { id } = useParams();
//   const [reviews, setReviews] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true)
//   const recordsPerPage = 5; // Number of records per page

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL2}/book/${id}`
//         );
//         setReviews(data.book.reviews);
//         setLoading(false)
//       } catch (error) {
//         setLoading(false)
//         const {response} = error;
//         toast.error(response.data.message || 'Error loading reviews')
//       }finally {
//         setLoading(false)
//       }
//     };

//     fetchData();
//   }, [id]);


//   const renderStars = (rating) => {
//     return Array.from({ length: rating }, (_, index) => (
//       <BsStarFill key={index} color={'gold'} />
//     ));
//   }

//   // Pagination Logic
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage;
//   const currentReviews = reviews.slice(firstIndex, lastIndex);
//   const totalPages = Math.ceil(reviews.length / recordsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   if(loading){
//     return <Loader/>
//   }

//   return (
//     <div className="container">
//       <div className="row">
//         {currentReviews.map(review => (
//           <div key={review._id} className="col-md-12">
//             <div className="card mt-3">
//               <div className="card-body">
//                 {/* <h5 className="card-title">{review.username}</h5> */}
//                 <p className="card-text">{review.comment}</p>
//                 <p className="card-text">{renderStars(review.rating)}</p>
//                 <Link className="btn btn-danger" to={`/deleteReview/${review._id}`}>Delete</Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//     </div>
//   );
// }

// export default ReviewCard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import Pagination from '../shared/Pagination';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import ConfirmationModal from '../shared/ConfirmationModal.jsx'; // Import the ConfirmationModal component
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

function ReviewCard() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedReviewId, setSelectedReviewId] = useState(null); // State to store the selected review ID for deletion

  const recordsPerPage = 5; // Number of records per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL2}/book/${id}`
        );
        setReviews(data.book.reviews);
      } catch (error) {
        const { response } = error;
        toast.error(response.data.message || 'Error loading reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <BsStarFill key={index} color={'gold'} />
    ));
  };

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentReviews = reviews.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(reviews.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteReview = (reviewId) => {
    setSelectedReviewId(reviewId); // Set the selected review ID for deletion
  };

  const handleConfirmDelete = () => {
    // Navigate to delete review route after confirmation
    window.location.href = `/deleteReview/${selectedReviewId}`;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
        <Link to={'/books'} className="arrow">
          <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/>
        </Link>
      <div className="row">
        {currentReviews.map((review) => (
          <div key={review._id} className="col-md-12">
            <div className="card mt-3">
              <div className="card-body">
                {/* <h5 className="card-title">{review.username}</h5> */}
                <p className="card-text">{review.comment}</p>
                <p className="card-text">{renderStars(review.rating)}</p>
                <Link className="btn btn-danger" to="#" onClick={() => handleDeleteReview(review._id)} >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {/* Render ConfirmationModal for deleting reviews */}
      <ConfirmationModal
        isOpen={selectedReviewId !== null}
        message="Are you sure you want to delete this review?"
        onConfirm={handleConfirmDelete}
        onClose={() => setSelectedReviewId(null)}
      />
    </div>
  );
}

export default ReviewCard;
