import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = 1; // Number of buttons displayed around the current page

  const handlePrevious = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  const generatePageNumbers = () => {
    const pages = [];

    // Display first page
    if (currentPage > range) {
      pages.push(0);
      if (currentPage > range + 1) pages.push("...");
    }

    // Display pages around current page
    for (
      let i = Math.max(0, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    // Display last page
    if (currentPage < totalPages - range - 1) {
      if (currentPage < totalPages - range - 2) pages.push("...");
      pages.push(totalPages - 1);
    }

    return pages;
  };

  // If there are no pages, don't render pagination
  if (totalPages <= 1) return null;

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center mt-6 pb-4 space-x-2">
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 ${
          currentPage === 0
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={currentPage === 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Previous
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && onPageChange(page)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : page === "..."
              ? "cursor-default text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          disabled={page === "..."}
        >
          {page === "..." ? "..." : page + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 ${
          currentPage === totalPages - 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={currentPage === totalPages - 1}
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default Pagination; 