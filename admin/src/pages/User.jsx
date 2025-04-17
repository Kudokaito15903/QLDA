import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { PiExport } from "react-icons/pi";
import { useEffect, useMemo, useRef, useState } from "react";
import Table from "../components/Table";
import Swal from "sweetalert2";
import axios from "axios";
// Define UserTitle array for the table headers
const UserTitle = ["ID", "User Info", "Phone", "Created At", "Actions"];

export default function User() {
  const [query, setQuery] = useState("");
  const titleRef = useRef(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/users`);
        const data = res.data.filter(user => user.isActive);
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const filterUsers = useMemo(() => {
    return users.filter((user) => {
      const title = titleRef.current?.value;
      switch (title) {
        case "userid":
          return user.id.toString().includes(query);
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
      const fomattedDate = day.toLocaleDateString("en-US", {
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
          <td>{item.phonenumber ? item.phonenumber : "Not Available"}</td>
          <td>{fomattedDate}</td>
          <td>
            <div className="flex text-xl gap-3 cursor-pointer ">
              <FaRegTrashCan
                onClick={() => deleteUser(item.id)}
                className=" text-red-500 hover:text-red-700"
              />
            </div>
          </td>
        </tr>
      );
    });
  }, [filterUsers]);
  return (
    <div className="overflow-auto bg-white sm:m-6">
      <TopSection query={query} setQuery={setQuery} titleRef={titleRef} />
      <Table title={UserTitle} RowsDisplay={rowsDisplay} />
    </div>
  );
}

function TopSection(props) {
  return (
    <div className="flex items-center justify-between m-4 flex-wrap gap-2">
      <div className="flex items-center gap-2 border-b-2 flex-wrap">
        <IoMdSearch className="text-2xl rounded-lg hidden sm:block" />
        <input
          type="search"
          onChange={(e) => props.setQuery(e.target.value)}
          className="h-8 focus:outline-none "
          placeholder={`Search ...`}
        />
        <select ref={props.titleRef}>
          <option value="username">Username</option>
          <option value="userid">User ID</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700">
        <PiExport />
        <h2>Export</h2>
      </div>
    </div>
  );
}

export const deleteUser = async (id) => {
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
          withCredentials: true, // tương đương với credentials: 'include'
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
          setTimeout(() => {
            window.location.reload();
          }, 1500);
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

