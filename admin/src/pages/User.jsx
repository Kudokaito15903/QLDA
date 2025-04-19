import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useMemo, useRef, useState } from "react";
import Table from "../components/Table";
import Swal from "sweetalert2";
import axios from "axios";
import { UserTitle } from "../until/constants";
import ExportToExcel from "../components/ExportToExcel";
import Pagination from "../components/Pagination";
import { UserColumnsToExport } from "../until/constants";
export default function User() {
  const [query, setQuery] = useState("");
  const titleRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users`);
      const activeUsers = res.data.filter(user => user.isActive);
      setUsers(activeUsers);
            
      const itemsPerPage = 10;
      setTotalPages(Math.ceil(activeUsers.length / itemsPerPage));
      
      const start = currentPage * itemsPerPage;
      const end = start + itemsPerPage;
      setUsers(activeUsers.slice(start, end));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleDeleteUser = async (id) => {
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
          const res = await axios.delete(`http://localhost:8080/api/users/delete/${id}`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.status === 204) {
            Swal.fire({
              icon: "success",
              title: "User deleted!",
              timer: 1500,
              showConfirmButton: false,
            });
            await fetchUsers(); // Refresh user list
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: error.response?.data?.message || error.message,
          });
        }
      }
    });
  };

  const filterUsers = useMemo(() => {
    if (!query.trim()) {
      return users;
    }
    return users.filter((user) => {
      const title = titleRef.current?.value;
      switch (title) {
        case "userid":
          if(!isNaN(query) && query.trim() !== ''){
            return user.id.toString().includes(query);
          }
          return false;
        case "email":
          return user.email.toLowerCase().includes(query.toLowerCase());
        default:
          return user.username.toLowerCase().includes(query.toLowerCase());
      }
    });
  }, [query, users]);

  const rowsDisplay = useMemo(() => {
    return filterUsers.map((item) => {
      const day = new Date(item.createdAt);
      const formattedDate = day.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return (
        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
          <td>{item.id}</td>
          <td>
            <div className="font-bold text-gray-800">{item.username}</div>
            <div className="text-sm text-gray-500 font-medium">{item.email}</div>
          </td>
          <td className="text-gray-700">{item.phonenumber || "Not Available"}</td>
          <td className="text-gray-700">{formattedDate}</td>
          <td>
            <div className="flex text-xl justify-center cursor-pointer">
              <button 
                onClick={() => handleDeleteUser(item.id)}
                className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 group"
              >
                <FaRegTrashCan className="text-red-500 group-hover:text-red-700" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }, [filterUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-auto bg-white rounded-xl shadow-lg sm:m-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
        <TopSection 
          query={query} 
          setQuery={setQuery} 
          titleRef={titleRef} 
          filterUsers={filterUsers} 
          columnsToExport={UserColumnsToExport} 
        />
      </div>
      <div className="px-6">
        <Table title={UserTitle} RowsDisplay={rowsDisplay} />
      </div>
      
      {totalPages > 1 && (
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

function TopSection({ query, setQuery, titleRef, filterUsers, columnsToExport }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-blue-500 transition-colors duration-200 px-2 py-1 rounded-t-md">
          <IoMdSearch className="text-2xl text-gray-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 focus:outline-none w-52"
            placeholder="Search users..."
          />
        </div>
        <select 
          ref={titleRef} 
          defaultValue="username"
          onChange={() => setQuery("")}
          className="select select-bordered rounded-md h-10 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="username">Username</option>
          <option value="userid">User ID</option>
          <option value="email">Email</option>
        </select>
      </div>
      <ExportToExcel 
        data={filterUsers} 
        fileName="Users.xlsx" 
        columns={columnsToExport} 
      />
    </div>
  );
}