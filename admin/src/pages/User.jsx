import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useMemo, useRef, useState } from "react";
import Table from "../components/Table";
import Swal from "sweetalert2";
import axios from "axios";
import { UserTitle } from "../until/constants";
import ExportToExcel from "../components/ExportToExcel";

export default function User() {
  const [query, setQuery] = useState("");
  const titleRef = useRef(null);
  const [users, setUsers] = useState([]);
  const columnsToExport = [
    { header: "ID", accessor: "id" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phonenumber" },
    { header: "Created At", accessor: "createdAt" },
  ];

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users`);
      const activeUsers = res.data.filter(user => user.isActive);
      setUsers(activeUsers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    if (!query.trim()) {
      return users;
    }
    return filterUsers.map((item) => {
      const day = new Date(item.createdAt);
      const formattedDate = day.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>
            <div className="font-bold">{item.username}</div>
            <div className="text-sm opacity-50 font-semibold">{item.email}</div>
          </td>
          <td>{item.phonenumber || "Not Available"}</td>
          <td>{formattedDate}</td>
          <td>
            <div className="flex text-xl gap-3 cursor-pointer ">
              <FaRegTrashCan
                onClick={() => handleDeleteUser(item.id)}
                className="text-red-500 hover:text-red-700"
              />
            </div>
          </td>
        </tr>
      );
    });
  }, [filterUsers]);

  return (
    <div className="overflow-auto bg-white sm:m-6">
      <TopSection 
        query={query} 
        setQuery={setQuery} 
        titleRef={titleRef} 
        filterUsers={filterUsers} 
        columnsToExport={columnsToExport} 
      />
      <Table title={UserTitle} RowsDisplay={rowsDisplay} />
    </div>
  );
}

function TopSection({ query, setQuery, titleRef, filterUsers, columnsToExport }) {
  return (
    <div className="flex items-center justify-between m-4 flex-wrap gap-2">
      <div className="flex items-center gap-2 border-b-2 flex-wrap">
        <IoMdSearch className="text-2xl rounded-lg hidden sm:block" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-8 focus:outline-none"
          placeholder="Search..."
        />
        <select ref={titleRef} defaultValue="username">
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