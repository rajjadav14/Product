// src/pages/ProductPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Spin,
  Layout,
  Switch,
  Button,
  Form,
  Tooltip,
  notification,
} from "antd";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  updateProductSwitch,
} from "../redux/actions/productActions";
import CustomModel from "./CustomModel";
import DeleteModal from "./DeleteModel";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const { Content } = Layout;

const ProductTable = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { products, status, message } = useSelector((state) => state.products);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status == "succeeded") {
      notification.success({ message });
    }
    if (status == "failed") {
      notification.error({ message });
    }
  }, [status, message]);

  const showEditModal = (record) => {
    setSelectedProduct(record);
    setIsEditVisible(true);
  };

  const showDeleteModal = (record) => {
    setSelectedProduct(record);
    setIsDeleteVisible(true);
  };

  const showAddModal = () => {
    setIsAddVisible(true);
  };

  const showViewModal = (record) => {
    setSelectedProduct(record);
    setIsViewVisible(true);
  };

  const handleViewOk = () => {
    setIsViewVisible(false);
  };

  const handleSwitchToggle = async (value, key, id) => {
    try {
      const keyMapper = {
        b: "isBestSeller",
        r: "isRecommended",
        s: "status",
      };
      await dispatch(
        updateProductSwitch({ value, field: keyMapper[key], id })
      ).unwrap();
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditForm = async (values) => {
    try {
      await dispatch(
        updateProduct({ ...values, id: selectedProduct._id })
      ).unwrap(); // Ensure Edit was successful
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
    }
    setSelectedProduct(null);
    setIsEditVisible(false);
  };

  const handleAddForm = async (values) => {
    try {
      await dispatch(addProduct(values)).unwrap(); // Ensure Add was successful
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
    }
    setSelectedProduct(null);
    setIsAddVisible(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap(); // Ensure delete was successful
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
    }
    setIsDeleteVisible(false);
  };

  const handleCancel = () => {
    setIsEditVisible(false);
    setIsViewVisible(false);
    setIsDeleteVisible(false);
    setIsAddVisible(false);
    setSelectedProduct(null);
  };

  // Columns for Product Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => "$" + record.price,
    },
    {
      title: "IsRecommended",
      key: "isRecommended",
      render: (_, record) => (
        <Switch
          checked={record?.isRecommended}
          onChange={(checked) => handleSwitchToggle(checked, "r", record._id)}
        />
      ),
    },
    {
      title: "IsBestSeller",
      key: "isBestSeller",
      render: (_, record) => (
        <Switch
          checked={record?.isBestSeller}
          onChange={(checked) => handleSwitchToggle(checked, "b", record._id)}
        />
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record?.status}
          onChange={(checked) => handleSwitchToggle(checked, "s", record._id)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="actions">
          <Button type="link" onClick={() => showViewModal(record)}>
            <Tooltip title="View Product">
              <EyeOutlined />
            </Tooltip>
          </Button>
          <Button type="link" onClick={() => showEditModal(record)}>
            <Tooltip title="Edit Product">
              <EditOutlined />
            </Tooltip>
          </Button>
          <Button type="link" onClick={() => showDeleteModal(record)}>
            <Tooltip title="Delete Product">
              <DeleteOutlined />
            </Tooltip>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showAddModal} className="addBtn">
        Add New Product
      </Button>
      <Content style={{ padding: "20px" }}>
        {status === "loading" ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={products}
            className="customTable"
            columns={columns}
            rowKey="id"
          />
        )}
        <CustomModel
          show={isViewVisible}
          type={"v"}
          onOk={handleViewOk}
          onCancel={handleCancel}
          product={selectedProduct}
        />
        <CustomModel
          show={isEditVisible}
          type={"e"}
          onOk={handleEditForm}
          onCancel={handleCancel}
          product={selectedProduct}
          form={form}
        />
        <DeleteModal
          show={isDeleteVisible}
          onOk={handleDeleteProduct}
          onCancel={handleCancel}
          product={selectedProduct}
        />
        <CustomModel
          show={isAddVisible}
          type={"a"}
          onOk={handleAddForm}
          onCancel={handleCancel}
          form={form}
        />
      </Content>
    </>
  );
};

export default React.memo(ProductTable);
