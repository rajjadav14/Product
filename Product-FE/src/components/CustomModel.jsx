import { Descriptions, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

const CustomModel = ({ show, type, onOk, onCancel, product, form }) => {
  // Handle form submission
  const handleOk = () => {
    if (type == "v") {
      onOk();
    } else {
      form
        .validateFields()
        .then((values) => {
          // Call the onOk function with the form values
          onOk(values);
        })
        .catch((errorInfo) => {
          console.log("Validation Failed:", errorInfo);
        });
    }
  };
  const map = {
    a: "Add Product",
    e: "Edit Product",
    v: "View Product",
  };
  return (
    <Modal title={map[type]} open={show} onOk={handleOk} onCancel={onCancel}>
      <Form
        name="register_form"
        form={form}
        layout="vertical"
        initialValues={{
          name: product?.name,
          description: product?.description,
          price: product?.price,
          id: product?._id,
        }}
      >
        <div>
          <p>
            <strong>Name * :</strong>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name is Required.",
                },
                {
                  validator: (_, value) => {
                    if (value && value.trim() !== value) {
                      return Promise.reject(
                        "Name cannot have leading or trailing spaces."
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input size="large" disabled={type == "v"} placeholder="Title" />
            </Form.Item>
          </p>
          <p>
            <strong>Description* :</strong>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Description is Required.",
                },
                {
                  validator: (_, value) => {
                    if (value && value.trim() !== value) {
                      return Promise.reject(
                        "Description cannot have leading or trailing spaces."
                      );
                    }
                    if (value.lenght > 300) {
                      return Promise.reject(
                        "Description can not be more than 300 words."
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <TextArea
                size="large"
                disabled={type == "v"}
                placeholder="Description"
              />
            </Form.Item>
          </p>
          <p>
            <strong>Price* :</strong>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Price is Required.",
                },
                {
                  validator: (_, value) => {
                    if (value <= 0) {
                      return Promise.reject(
                        "Price cannot be less than or equal to zero."
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                size="large"
                type="number"
                disabled={type == "v"}
                placeholder="Price"
              />
            </Form.Item>
          </p>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomModel;
