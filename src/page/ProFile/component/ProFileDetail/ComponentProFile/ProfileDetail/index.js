import React from "react";

const Inf = ({ info }) => {
  // Ensure info and its properties are defined
  const safeInfo = info || {};
  const skills = safeInfo.skill || [];
  const certifications = safeInfo.certification || [];
  const bookingJobs = safeInfo.bookingJob || [];

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Information</h2>

      <div className="space-y-2">
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Name:</span>
          <span className="text-gray-600">{safeInfo.name || "N/A"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Email:</span>
          <span className="text-gray-600">{safeInfo.email || "N/A"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Phone:</span>
          <span className="text-gray-600">{safeInfo.phone || "N/A"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Birthday:</span>
          <span className="text-gray-600">{safeInfo.birthday || "N/A"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Gender:</span>
          <span className="text-gray-600">{safeInfo.gender ? "Male" : "Female"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Role:</span>
          <span className="text-gray-600">{safeInfo.role || "N/A"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Skills:</span>
          <span className="text-gray-600">{skills.length > 0 ? skills.join(", ") : "No skills listed"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Certification:</span>
          <span className="text-gray-600">{certifications.length > 0 ? certifications.join(", ") : "No certifications listed"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-32">Booking Jobs:</span>
          <span className="text-gray-600">{bookingJobs.length > 0 ? bookingJobs.join(", ") : "No booking jobs"}</span>
        </div>
      </div>
    </div>
  );
};

export default Inf;
