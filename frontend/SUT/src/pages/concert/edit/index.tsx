import React, { useEffect } from "react";
import { Space, Button, Col, Row, Divider, Form, Input, Card, message, Select, DatePicker } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { UpdateConcert } from "../../../service/https"; // ฟังก์ชันสำหรับอัพเดตข้อมูล

const ConcertEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const concertData = location.state?.concertData; // รับข้อมูลคอนเสิร์ตที่มีอยู่แล้ว

  useEffect(() => {
    if (concertData) {
      form.setFieldsValue({
        name: concertData.name,
        show_date: concertData.show_date,
        artist: concertData.artist,
        description: concertData.description,
        venue: concertData.venue,
        ticket_sales_start_date: concertData.ticket_sales_start_date,
        status: concertData.status,
        // โค้ดที่นี่สำหรับการตั้งค่าฟิลด์ไฟล์ให้เหมาะสมกับข้อมูลที่มีอยู่
      });
    }
  }, [concertData]);

  const handleUpdate = async (values) => {
    try {
      const res = await UpdateConcert(concertData.id, values); // อัพเดตข้อมูลคอนเสิร์ต
      if (res.status === 200) {
        messageApi.success("Concert updated successfully!");
        navigate("/concert");
      } else {
        messageApi.error(res.data.error);
      }
    } catch (error) {
      console.error("Update Error:", error);
      messageApi.error("An error occurred while updating the concert.");
    }
  };

  const onFinish = async (values) => {
    await handleUpdate(values); // เรียกใช้ฟังก์ชันสำหรับอัพเดต
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>Edit Concert</h2>
        <Divider />
        <Form
          form={form}
          name="concertEditForm"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                label="Concert Name"
                name="name"
                rules={[{ required: true, message: "Please enter the concert name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Show Date"
                name="show_date"
                rules={[{ required: true, message: "Please select a show date!" }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Artist"
                name="artist"
                rules={[{ required: true, message: "Please enter the artist!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter the description!" }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Venue"
                name="venue"
                rules={[{ required: true, message: "Please enter the venue!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Ticket On Sales"
                name="ticket_sales_start_date"
                rules={[{ required: true, message: "Please select a ticket on sales date!" }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select a status!" }]}
              >
                <Select placeholder="Select Status">
                  <Select.Option value="coming_soon">Coming Soon</Select.Option>
                  <Select.Option value="on_sale">On Sale</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item 
                label="Upload Poster" 
                name="poster_file"
              >
                <Input type="file" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item 
                label="Upload Benefit" 
                name="benefit_file"
              >
                <Input type="file" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item 
                label="Upload Information" 
                name="info_file"
              >
                <Input type="file" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col>
              <Form.Item>
                <Space>
                  <Button htmlType="button" onClick={() => navigate("/concert")}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Save Changes
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

export default ConcertEdit;
