import React, { useEffect, useState } from "react";
import { Modal } from "antd";

const UserDetailModal = ({ visible, onClose, user }) => {
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  if (!localUser) return null;
console.log(localUser)
  return (
    <Modal
      title="User Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="p-4">
        <img
          src={localUser.content.avatar }
          alt={localUser.content.name}
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold text-center mt-4">
          {localUser.content.name}
        </h2>
        <p className="text-center text-gray-600">
          {localUser.content.gender ? "Nam" : "Nữ"}
        </p>
        <p className="text-center text-gray-600">
          Role: {localUser.content.role}
        </p>
        <p className="text-center text-gray-600">
          Email: {localUser.content.email}
        </p>
        <p className="text-center text-gray-600">
          Phone: {localUser.content.phone}
        </p>
        <p className="text-center text-gray-600">
          Birthday: {localUser.content.birthday || "Not Provided"}
        </p>
        <p className="text-center text-gray-600">
          Skills:{" "}
          {localUser.content.skill.length
            ? localUser.content.skill.join(", ")
            : "None"}
        </p>
        <p className="text-center text-gray-600">
          Certifications:{" "}
          {localUser.content.certification.length
            ? localUser.content.certification.join(", ")
            : "None"}
        </p>
        <p className="text-center text-gray-600">
          Booking Jobs:{" "}
          {localUser.content.bookingJob.length
            ? localUser.content.bookingJob.join(", ")
            : "None"}
        </p>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
