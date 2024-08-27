import React, { useEffect, useState } from "react";
import { userService } from "../../../../services/userService";
import { useParams } from "react-router-dom";
import UserDetailModal from "./Component/Modal";
import UserEditModal from "./Component/EditModal";
import { notification } from "antd"; // For displaying success/error notifications
import { Button, Modal, Input, Form, Select, DatePicker, Checkbox } from "antd";

const UserManagement = () => {
  const { iduser } = useParams();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6; // Number of users per page

  const fetchUserData = async () => {
    try {
      const res = await userService.getListUser();
      const users = res.data.content;
      setUserData(users);
    } catch (error) {
      setError("Error fetching user data. Please try again later.");
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleViewDetails = async (userId) => {
    try {
      const res = await userService.getUserID(userId);
      setSelectedUser(res.data);
      setIsDetailModalVisible(true);
    } catch (error) {
      setError("Error fetching user details. Please try again later.");
      console.error("Error fetching user details:", error);
    }
  };

  const handleDelete = async (Id) => {
    try {
      await userService.deleteUser(Id);
      await fetchUserData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = async (userId) => {
    try {
      const res = await userService.getUserID(userId);
      setSelectedUser(res.data);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Error getting user for editing:", error);
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedUser(null);
  };

  const handleUpdate = (userId, updatedUser) => {
    setUserData((prevUserData) => {
      const updatedData = prevUserData.map((user) => {
        if (user.id === userId) {
          const updatedAvatar = updatedUser.avatar || user.avatar;
          return {
            ...user,
            ...updatedUser,
            avatar: updatedAvatar,
          };
        }
        return user;
      });
      return updatedData;
    });
  };

  const handleAddUser = async (values) => {
    try {
      await userService.postUser(values);
      notification.success({
        message: 'Success',
        description: 'User added successfully!',
      });
      setIsAddModalVisible(false);
      fetchUserData();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error adding user. Please try again later.',
      });
      console.error("Error adding user:", error);
    }
  };

  // Filter users based on search query
  const filteredUsers = userData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">{error}</div>;
  if (userData.length === 0)
    return <div className="text-center py-4">No users found.</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Add Administrator Button */}
      <div className="mb-4 flex justify-end">
        <Button
          type="primary"
          onClick={() => setIsAddModalVisible(true)}
        >
          Add Administrator
        </Button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700">Avatar</th>
              <th className="px-6 py-3 text-left text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-gray-700">Gender</th>
              <th className="px-6 py-3 text-left text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.gender ? "Nam" : "Nữ"}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(user.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-700 transition"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800"
            } rounded-md shadow-md hover:bg-gray-400 transition`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition"
        >
          Next
        </button>
      </div>

      {/* Add User Modal */}
      <Modal
        title="Add Administrator"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleAddUser}
          initialValues={{
            gender: true, // Default value
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter the password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[{ required: true, message: 'Please select the birthday!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            valuePropName="checked"
          >
            <Checkbox>Male</Checkbox>
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
              {/* Add more roles if needed */}
            </Select>
          </Form.Item>
          <Form.Item
            name="skill"
            label="Skills"
          >
            <Select mode="tags" placeholder="Add skills">
              {/* Add options if needed */}
            </Select>
          </Form.Item>
          <Form.Item
            name="certification"
            label="Certifications"
          >
            <Select mode="tags" placeholder="Add certifications">
              {/* Add options if needed */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* User Detail Modal */}
      <UserDetailModal
        visible={isDetailModalVisible}
        user={selectedUser}
        onClose={handleCloseDetailModal}
      />

      {/* User Edit Modal */}
      <UserEditModal
        visible={isEditModalVisible}
        user={selectedUser}
        onClose={handleCloseEditModal}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default UserManagement;
