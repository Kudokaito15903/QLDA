import { BiUserCircle } from "react-icons/bi";
import { StarRating } from "../util/constants";
import { MdReport } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchReviews = async (page = 0) => {
    try {
      const res = await fetch(
        `http://localhost:8080/comments/pagination?page=${page}&size=5`
      );
      const data = await res.json();
      setReviews(data.content); // `content` contains the list of reviews.
      setTotalPages(data.totalPages); // Total number of pages.
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg">
          <div className="text-2xl p-5 font-semibold border-b bg-gray-100">
            Reviews
          </div>
          <div className="p-6 space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewBlock key={review.review_id} data={review} />
              ))
            ) : (
              <div className="text-center text-gray-500">
                No reviews available.
              </div>
            )}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
const ReviewBlock = ({ data }) => {
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div
        className={`collapse-title gap-4 p-4 rounded-md space-y-2 scale-hover last:mb-10`}
      >
        <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
          <div className="flex gap-4 items-center">
            <div className="bg-gray-400 text-white rounded-full size-9 sm:flex items-center justify-center gap-4 hidden">
              <BiUserCircle className="text-white text-3xl" />
            </div>
            <div>
              <div className="font-bold">{data.username}</div>
              <div className="text-sm text-gray-500">{data.date}</div>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center ">
            <StarRating star={data.rating} />
            <div className="flex text-lg text-primary items-center font-semibold ml-3">
              <MdReport />
              {data.product_id}
            </div>
          </div>
        </div>
        <div className="sm:ml-12 max-w-4xl">
          <p>{data.comment}</p>
        </div>
      </div>
      <div className="border-t-2 border-[#a1a1a1] collapse-content sm:pl-12">
        <ReviewDetails review_id={data.id} />
      </div>
    </div>
  );
};
const ReviewDetails = ({ review_id }) => {
  const deleteReview = async (review_id) => {
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
        const res = await fetch(
          `http://localhost:8080/admin/delete_review/${review_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.text();
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: data.message,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
          });
        }
      }
    });
  };
  return (
    <>
      <h2 className="text-lg my-2 font-semibold text-green-400 flex items-center">
        No Report
        <FaRegTrashCan
          onClick={() => deleteReview(review_id)}
          className=" text-red-500 hover:text-red-700 ml-auto cursor-pointer  "
        />
      </h2>
    </>
  );
};
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center items-center mt-6 pb-4 space-x-2">
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            page === currentPage
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages - 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};
