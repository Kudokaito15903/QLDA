import { BiUserCircle } from "react-icons/bi";
import { StarRating } from "../until/constants";
import { MdReport } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import Pagination from "../components/Pagination";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async (page = 0) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/comments/pagination?page=${page}&size=5`
      );
      const data = res.data || {};
      setReviews(data.content || []); 
      setTotalPages(data.totalPages || 0); 
    } catch (err) {
      console.error(err);
      setReviews([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg sm:m-6 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Management</h2>
        <p className="text-gray-600">Manage customer reviews and feedback</p>
      </div>

      <div className="px-6 py-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewBlock 
                key={review.id || review.review_id || Math.random().toString()} 
                data={review} 
                onDelete={() => fetchReviews(currentPage)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-xl font-medium">No reviews available</p>
            <p className="mt-2">There are currently no reviews to display.</p>
          </div>
        )}
      </div>

      {totalPages > 0 && (
        <div className="px-6 pb-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

const ReviewBlock = ({ data, onDelete }) => {
  if (!data) return null;
  
  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    try {
      const date = new Date(data.createdAt);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  return (
    <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4 space-y-3">
        <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
          <div className="flex gap-4 items-center">
            <div className="bg-blue-500 text-white rounded-full size-10 flex items-center justify-center">
              <BiUserCircle className="text-white text-3xl" />
            </div>
            <div>
              <div className="font-bold text-gray-800">{data.username || 'Anonymous'}</div>
              <div className="text-sm text-gray-500">{formatDate(data.createdAt)}</div>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center">
            <div className="rating">
              <StarRating star={data.rating} />
            </div>
            <div className="flex text-lg text-primary items-center font-semibold ml-3">
              <span>Product #{data.productId || 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="text-gray-700 mt-2">
          <p>{data.comment || 'No comment'}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-100 p-3 flex justify-between items-center">
        <span className="text-sm font-medium text-green-500 flex items-center">
          No Reports
        </span>
        <button
          onClick={() => handleDeleteReview(data.id || data.review_id, onDelete)}
          className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 group"
        >
          <FaRegTrashCan className="text-red-500 group-hover:text-red-700" />
        </button>
      </div>
    </div>
  );
};

const handleDeleteReview = (review_id, onDelete) => {
  if (!review_id) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Review ID is missing!",
    });
    return;
  }

  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:8080/api/comments/delete_review/${review_id}`);
        
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Review deleted successfully!",
            timer: 1500,
            showConfirmButton: false,
          });
          
          if (typeof onDelete === 'function') {
            onDelete();
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Could not delete the review.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Could not delete the review.",
        });
      }
    }
  });
};