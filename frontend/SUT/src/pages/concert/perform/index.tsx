import { Space, Button, Col, Row, Divider, Form, Input, Card, message, DatePicker } from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
// import { CreatePerformanceSchedule } from "../../../service/https"; // Function for saving data

const PerformanceCreate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const concertData = location.state?.concertData;

  // State for storing the entered values
  const [performanceData, setPerformanceData] = useState({
    performance_date: null,
    duration: null,
    venue: '',
  });

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      console.log("Validated Values:", values);

      // Store the entered values in state without saving to the database yet
      setPerformanceData(values);
      
      // Navigate to seat chart page with performance data and concert data
      navigate("/concert/seat", { state: { performanceData: values, concertData } });

    } catch (error) {
      console.error("Validation Error:", error);
      messageApi.error("Please fill in all required fields!");
    }
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>Add Performance Schedule</h2>
        <Divider />
        <Form
          form={form}
          name="performanceSchedule"
          layout="vertical"
          autoComplete="off"
          initialValues={performanceData} // Set initial values from state
        >
          <Row gutter={[16, 0]}>
            <Col xs={24}>
              <Form.Item
                label="Performance Date"
                name="performance_date"
                rules={[{ required: true, message: "Please select a performance date!" }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Duration (minutes)"
                name="duration"
                rules={[{ required: true, message: "Please enter the duration!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Venue"
                name="venue"
                rules={[{ required: true, message: "Please enter the venue!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/concert">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      Back
                    </Button>
                  </Link>
                  <Button type="primary" onClick={handleNext} style={{ marginRight: "10px" }}>
                    Next
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default PerformanceCreate;
