import { useEffect } from "react";
import {Space,Button,Col,Row,Divider,Form,Input,Card,message,} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ConcertInterface } from "../../../interface/Concerts";
import { GetConcert,UpdateConcertById,DeleteConcertById } from "../../../service/https"; // Adjust import path and method names as needed
import { useNavigate, Link, useParams } from "react-router-dom";

function ConcertEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Adjust type if needed

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const getConcertById = async (id: string) => {
    try {
      const res = await GetConcertById(id);

      if (res.status === 200) {
        form.setFieldsValue({
          Name: res.data.Name,
          ShowDate: res.data.ShowDate,
          Artist: res.data.Artist,
          Description: res.data.Description,
          TicketSalesStartDate: res.data.TicketSalesStartDate,
          Venue: res.data.Venue,
          Status: res.data.Status,
          // Optionally set file-related fields if needed
        });
      } else {
        messageApi.open({
          type: "error",
          content: "ไม่พบข้อมูลคอนเสิร์ต",
        });
        setTimeout(() => {
          navigate("/concerts"); // Adjust path as needed
        }, 2000);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลคอนเสิร์ต",
      });
    }
  };

  const onFinish = async (values: ConcertInterface) => {
    try {
      const payload = { ...values };
      const res = await UpdateConcertById(String(id), payload); // Ensure id is converted to a number

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        setTimeout(() => {
          navigate("/concerts"); // Adjust path as needed
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการอัปเดตคอนเสิร์ต",
      });
    }
  };

  useEffect(() => {
    if (id) {
      getConcertById(String(id)); // Ensure id is converted to a number
    }
  }, [id]);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>แก้ไขข้อมูล คอนเสิร์ต</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="Concert Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อคอนเสิร์ต!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="Show Date"
                name="ShowDate"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกวันที่แสดง!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="Artist"
                name="Artist"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อศิลปิน!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="Description"
                name="Description"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกคำอธิบาย!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Ticket On Sales"
                name="TicketSalesStartDate"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกวันเริ่มขายตั๋ว!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Venue"
                name="Venue"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกสถานที่!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Status"
                name="Status"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกสถานะ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/concerts">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      ยกเลิก
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    บันทึก
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

export default ConcertEdit;
