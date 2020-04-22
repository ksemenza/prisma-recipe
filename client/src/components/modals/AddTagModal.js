import React from 'react';
import { Modal, Form, Input, Switch } from 'antd';

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 14 } };

const AddTagModal = ({
  modalOpen,
  handleSubmit,
  handleCloseModal,
  handleChecked,
  handleChange,
  name,
  isPublished,
  ...props
}) => (
  <Modal
    name="Add new Tag"
    centered
    visible={modalOpen}
    onOk={handleSubmit}
    onCancel={handleCloseModal}
  >
    <Form layout="horizontal">
      <Form.Item label="Title" {...formItemLayout}>
        <Input
          value={name}
          onChange={handleChange}
          placeholder="recipe title"
          name="name"
        />
      </Form.Item>
      <Form.Item label="Published" {...formItemLayout}>
        <Switch checked={isPublished} onChange={handleChecked} />
      </Form.Item>
    </Form>
  </Modal>
);

const WrappedForm = Form.create({ name: 'add-new-tag' })(AddTagModal);

export default WrappedForm;