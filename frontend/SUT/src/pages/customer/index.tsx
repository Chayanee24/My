import React from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ConcertInterface } from "../../interface/Concerts"; // เปลี่ยนเป็น path ของไฟล์ ConcertInterface
import { CreateConcert } from "../../service/https"; // เปลี่ยนเป็น path ของฟังก์ชัน CreateConcert
import { useNavigate, Link } from "react-router-dom";

const handleFileChange = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files && e.target.files[0]) {
    setFile(e.target.files[0]);
  }
};

function ConcertCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: ConcertInterface) => {
    let res = await CreateConcert(values);

    if (res.status === 201) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      setTimeout(() => {
        navigate("/concert"); // เปลี่ยนเส้นทางหลังการสร้างคอนเสิร์ต
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>เพิ่มข้อมูลคอนเสิร์ต</h2>
        <Divider />
        <Form
          name="concert"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อคอนเสิร์ต"
                name="name"
                rules={[{ required: true, message: "กรุณากรอกชื่อคอนเสิร์ต!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="วันที่แสดง"
                name="show_date"
                rules={[{ required: true, message: "กรุณาเลือกวันที่แสดง!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อศิลปิน"
                name="artist"
                rules={[{ required: true, message: "กรุณากรอกชื่อศิลปิน!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="คำอธิบาย"
                name="description"
                rules={[{ required: true, message: "กรุณากรอกคำอธิบาย!" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item label="Upload Poster" name="poster_file"
                rules={[{ required: true, message: "Please Upload Poster!" }]}>
                <Input type="*image" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="ไฟล์ข้อมูล" name="info-file">
                <Input            type="file"
            accept="image/*" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="โปสเตอร์" name="poster_file">
                <Input type="file" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="วันเริ่มขายบัตร"
                name="ticket_sales_start_date"
                rules={[{ required: true, message: "กรุณาเลือกวันเริ่มขายบัตร!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="สถานที่จัดงาน"
                name="venue"
                rules={[{ required: true, message: "กรุณากรอกสถานที่จัดงาน!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="สถานะ"
                name="status"
                rules={[{ required: true, message: "กรุณาเลือกสถานะ!" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { value: "", label: "กรุณาเลือกสถานะ", disabled: true },
                    { value: "Upcoming", label: "Upcoming" },
                    { value: "Ongoing", label: "Ongoing" },
                    { value: "Completed", label: "Completed" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/concert">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      ยกเลิก
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    ยืนยัน
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

export default ConcertCreate;
