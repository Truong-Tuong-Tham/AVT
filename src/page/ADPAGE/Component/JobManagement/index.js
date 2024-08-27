import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";
import { Modal, Input, Form, Button, notification, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const JobManagement = () => {
  const { iduser } = useParams();
  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); // New state for view modal
  const [newJob, setNewJob] = useState({
    tenCongViec: "",
    danhGia: 0,
    giaTien: 0,
    nguoiTao: 0,
    hinhAnh: "",
    moTa: "",
    maChiTietLoaiCongViec: 0,
    moTaNgan: "",
    saoCongViec: 0,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUserData = async () => {
    try {
      const res = await jobService.getListJobs();
      const jobs = res.data.content;
      setJobData(jobs);
      setFilteredJobs(jobs);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const filtered = jobData.filter((job) =>
      job.tenCongViec.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page when search query changes
  }, [searchQuery, jobData]);

  const handleEditClick = async (jobId) => {
    try {
      const res = await jobService.getJobWithID(jobId);
      setSelectedJob(res.data.content);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Error getting job for editing:", error);
    }
  };

  const handleCreateClick = () => {
    setIsCreateModalVisible(true);
  };

  const handleViewClick = async (jobId) => {
    try {
      const res = await jobService.getJobWithID(jobId);
      setSelectedJob(res.data.content);
      setIsViewModalVisible(true);
    } catch (error) {
      console.error("Error getting job for viewing:", error);
    }
  };

  const handleModalOk = async () => {
    if (!selectedJob || !selectedJob.id) {
      console.error("No job selected or job ID missing.");
      return;
    }
    try {
      await jobService.putJob(selectedJob.id, selectedJob);
      notification.success({
        message: "Job Updated",
        description: "The job has been updated successfully.",
      });
      setIsEditModalVisible(false);
      fetchUserData();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleCreateJob = async () => {
    try {
      await jobService.postJob(newJob);
      notification.success({
        message: "Job Created",
        description: "The new job has been created successfully.",
      });
      setIsCreateModalVisible(false);
      fetchUserData();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleModalCancel = () => {
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
    setIsViewModalVisible(false); // Close the view modal
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;
    setSelectedJob({ ...selectedJob, [name]: parsedValue });
  };

  const handleNewJobChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;
    setNewJob({ ...newJob, [name]: parsedValue });
  };

  const handleDeleteClick = (jobId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this job?",
      onOk: async () => {
        try {
          await jobService.deleteJob(jobId);
          notification.success({
            message: "Job Deleted",
            description: "The job has been deleted successfully.",
          });
          fetchUserData();
        } catch (error) {
          console.error("Error deleting job:", error);
        }
      },
    });
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-center mb-4">Job Listings</h1>
        <div className="flex justify-between items-center mb-6">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-sm"
          />
          <Button
            type="primary"
            onClick={handleCreateClick}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 ml-4"
          >
            Create New Job
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={job.hinhAnh}
              alt={job.tenCongViec}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{job.tenCongViec}</h2>
              <p className="text-gray-700 mb-4 truncate">{job.moTaNgan}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-gray-900">
                  ${job.giaTien}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-xl">
                    {"★".repeat(job.saoCongViec)}
                  </span>
                  <span className="text-gray-600 ml-2">
                    ({job.danhGia} reviews)
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEditClick(job.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(job.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleViewClick(job.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          current={currentPage}
          total={filteredJobs.length}
          pageSize={jobsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="pagination"
        />
      </div>

      <Modal
        title="Edit Job"
        visible={isEditModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Job Title">
            <Input
              name="tenCongViec"
              value={selectedJob?.tenCongViec || ""}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              name="moTa"
              value={selectedJob?.moTa || ""}
              onChange={handleInputChange}
            />
          </Form.Item>
          {/* Add other fields as necessary */}
        </Form>
      </Modal>

      <Modal
        title="Create New Job"
        visible={isCreateModalVisible}
        onOk={handleCreateJob}
        onCancel={handleModalCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Job Title">
            <Input
              name="tenCongViec"
              value={newJob.tenCongViec}
              onChange={handleNewJobChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              name="moTa"
              value={newJob.moTa}
              onChange={handleNewJobChange}
            />
          </Form.Item>
          {/* Add other fields as necessary */}
        </Form>
      </Modal>

      <Modal
        title="Job Details"
        visible={isViewModalVisible}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        okText="Close"
      >
        {selectedJob && (
          <div>
            <img
              src={selectedJob.hinhAnh}
              alt={selectedJob.tenCongViec}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedJob.tenCongViec}</h2>
            <p className="text-gray-700 mb-4">{selectedJob.moTa}</p>
            <p className="text-xl font-semibold text-gray-900 mb-2">
              ${selectedJob.giaTien}
            </p>
            <div className="flex items-center">
              <span className="text-yellow-500 text-xl">
                {"★".repeat(selectedJob.saoCongViec)}
              </span>
              <span className="text-gray-600 ml-2">
                ({selectedJob.danhGia} reviews)
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobManagement;
