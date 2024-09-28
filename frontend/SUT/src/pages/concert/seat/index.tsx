import { Space, Button, Col, Row, Divider, Form, Input, Card, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SeatChartInterface } from "../../../interface/SeatChart";
import { CreateSeat } from "../../../service/https";
import { useNavigate } from "react-router-dom";
import React from "react";

const SeatChartCreate: React.FC = () => {
  const [form] = Form.useForm(); // Ant Design form instance
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: SeatChartInterface) => {
    try {
      // Convert the quantity_seat and price to numbers
      const payload = {
        ...values,
        // quantity_seat: parseInt(values.quantity_seat, 10), // Convert to integer
        // price: parseFloat(values.price), // Convert to float
      };

      const res = await CreateSeat(payload);

      if (res.status === 201) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        form.resetFields(); // Clear form fields after successful submission
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <Row justify="space-between" align="middle">
          <h2>Add Seat</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => form.submit()}
          >
            Add New Seat
          </Button>
        </Row>
        <Divider />
        <Form
          form={form} // Bind the form instance to the Form component
          name="seatChart"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24}>
              <Form.Item
                label="Zone"
                name="zone"
                rules={[{ required: true, message: "Please enter the zone!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Quantity of Seats"
                name="quantity_seat"
                rules={[{ required: true, message: "Please enter the quantity of seats!" }]}
              >
                <Input type="number" min={1} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter the price!" }]}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Availability"
                name="availability"
                rules={[{ required: true, message: "Please select the availability status!" }]}
              >
                <Select placeholder="Select availability">
                  <Select.Option value="available">Available</Select.Option>
                  <Select.Option value="reserved">Reserved</Select.Option>
                  <Select.Option value="sold">Sold</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Button 
                    htmlType="button" 
                    style={{ marginRight: "10px" }} 
                    onClick={() => navigate("/concert")}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    Add
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default SeatChartCreate;
