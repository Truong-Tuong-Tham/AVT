import React, { useEffect } from "react";
import { Modal, Input, Select, Form, DatePicker } from "antd";
import moment from "moment";
import { userService } from "../../../../../../services/userService";

const { Option } = Select;

const UserEditModal = ({ visible, onClose, user, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue({
        avatar: user.content.avatar,
        id: user.content.id,
        name: user.content.name,
        email: user.content.email,
        phone: user.content.phone,
        birthday: user.content.birthday
          ? moment(user.content.birthday, "DD-MM-YYYY")
          : null,
        gender: user.content.gender,
        role: user.content.role,
        skill: user.content.skill || [],
      });
    }
  }, [visible, user, form]);

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      await userService.putInfoUser(values, user.content.id);
      console.log("User updated successfully");
      console.log("Updated values:", values);

      if (onUpdate) onUpdate(user.content.id, values);

      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onCancel={onClose}
      onOk={handleUpdate}
      okText="Update"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" name="userEditForm">
        <Form.Item
          name="avatar"
          label="Avatar"
          rules={[{ required: true, message: "Please enter the avatar URL!" }]}
        >
          <Input placeholder="Enter avatar URL" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the user's name!" }]}
        >
          <Input placeholder="Enter user's name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the user's email!" },
          ]}
        >
          <Input placeholder="Enter user's email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please enter the user's phone number!",
            },
          ]}
        >
          <Input placeholder="Enter user's phone number" />
        </Form.Item>

        <Form.Item
          name="birthday"
          label="Birthday"
          rules={[
            { required: true, message: "Please select the user's birthday!" },
          ]}
        >
          <DatePicker
            format="DD-MM-YYYY"
            placeholder="Select user's birthday"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            { required: true, message: "Please select the user's gender!" },
          ]}
        >
          <Select placeholder="Select gender">
            <Option value={true}>Male</Option>
            <Option value={false}>Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please enter the user's role!" }]}
        >
          <Input placeholder="Enter user's role" />
        </Form.Item>

        <Form.Item name="skill" label="Skill">
          <Select
            mode="tags"
            placeholder="Add skills"
            style={{ width: "100%" }}
          >
            <Option value="skill1">Skill 1</Option>
            <Option value="skill2">Skill 2</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
