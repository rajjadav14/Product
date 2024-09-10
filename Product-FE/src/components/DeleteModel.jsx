import React from "react";
import { Modal, Button } from "antd";

const DeleteModal = ({ show, onOk, onCancel, product }) => {
  return (
    <Modal
      title="Confirm Delete"
      open={show}
      onOk={() => onOk(product._id)}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
    >
      <p>
        Are you sure you want to delete the product titled{" "}
        <strong>{product?.title}</strong> ?
      </p>
    </Modal>
  );
};

export default DeleteModal;
