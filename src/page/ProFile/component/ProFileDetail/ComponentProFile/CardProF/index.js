import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  message,
  Upload,
} from "antd";
import { userService } from "../../../../../../services/userService";
import Inf from "../ProfileDetail";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CardInF = ({ idUser }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { infoUser } = useSelector((state) => state.userReducer);
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.getUserID(idUser);
        const userInfo = res.data.content;
        setInfo(userInfo);
        form.setFieldsValue({
          ...userInfo,
          skill: userInfo.skill.join(", "),
          certification: userInfo.certification.join(", "),
          gender: userInfo.gender ? "Male" : "Female",
          birthday: userInfo.birthday ? moment(userInfo.birthday) : null,
          role: userInfo.role,
        });
      } catch (err) {
        message.error("Failed to fetch user info.");
      }
    };

    fetchUserInfo();
  }, [idUser, form]);

  const handleEdit = () => {
    setIsModalVisible(true);
  };

  const handleAvatarEdit = () => {
    setIsAvatarModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAvatarModalVisible(false);
  };

  const handleUpdate = async (values) => {
    try {
      const updatedValues = {
        id: idUser,
        name: values.name || "",
        email: values.email || "",
        phone: values.phone || "",
        birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
        gender: values.gender === "Male",
        role: values.role || "",
        skill: values.skill
          ? values.skill.split(",").map((item) => item.trim())
          : [],
        certification: values.certification
          ? values.certification.split(",").map((item) => item.trim())
          : [],
        avatar: values.avatar || info.avatar || "",
      };

      await userService.putInfoUser(updatedValues, idUser);
      setInfo(updatedValues);
      setIsModalVisible(false);
      message.success("User info updated successfully.");
    } catch (err) {
      message.error("Failed to update user info.");
    }
  };

  const handleAvatarUpload = async () => {
    console.log("selectedFile", selectedFile);
    if (!selectedFile) {
      message.error("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await userService.postAvatar(formData);
      message.success("Avatar updated successfully.");
      setIsAvatarModalVisible(false);
    } catch (error) {
      message.error("Failed to update avatar.");
    }
  };

  const onFileChange = ({ file }) => {
    setSelectedFile(file);
    
  };

  return (
    <div className="w-80 h-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <img
          src={info?.avatar || infoUser.avatar || "default-avatar.png"}
          alt={`${info?.name}'s avatar`}
          className="w-32 h-32 rounded-full border-4 border-gray-200 mb-4"
        />
        <h2 className="text-2xl font-semibold mb-1">{info?.name}</h2>
        <p className="text-gray-600 mb-4">{info?.email}</p>
        <div className="flex space-x-2">
          <Button
            type="primary"
            onClick={handleEdit}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:opacity-90"
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={handleAvatarEdit}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:opacity-90"
          >
            AVT
          </Button>
        </div>
      </div>

      <Modal
        title="Edit User Information"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Update
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="birthday" label="Birthday">
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="Select Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="role" label="Role">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="skill" label="Skills">
                <Input placeholder="Separate skills with commas" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="certification" label="Certifications">
                <Input placeholder="Separate certifications with commas" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="avatar" label="Avatar URL">
                <Input placeholder="Enter the image URL" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Avatar Upload Modal */}
      <Modal
        title="Upload Avatar"
        visible={isAvatarModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAvatarUpload}>
            Update
          </Button>,
        ]}
      >
        <Upload beforeUpload={() => false} onChange={onFileChange}>
          <Button icon={<UploadOutlined />}>Choose File</Button>
        </Upload>
      </Modal>

      <div className="p-6 border-t border-gray-200">
        <Inf info={info} />
      </div>
    </div>
  );
};

export default CardInF;
