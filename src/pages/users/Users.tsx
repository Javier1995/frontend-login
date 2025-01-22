import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`user?page=${page}`);
        setUsers(data.data);
        setLastPage(data.meta.last_page);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page]);

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`user/${id}`);
        setUsers(users.filter((u: User) => u.id !== id)); // Remove the deleted user from the list
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/users/create" className="btn btn-sm btn-outline-secondary">Add</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role?.name || "N/A"}</td> {/* Handle potential undefined role */}
                <td>
                  <div className="btn-group mr-2">
                    <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary">
                      Edit
                    </Link>
                    <a 
                      href="#" 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        del(user.id);
                      }}
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wrapper>
  );
};

export default Users;
