import React, { useState, useEffect } from "react";
import { Space, Button, Col, Row, Divider, Form, Input, Card, message, Select, DatePicker, Upload, GetProp } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { CreateConcert, GetUserById } from "../../../service/https";
import { ConcertInterface } from "../../../interface/Concerts";
import { PlusOutlined } from "@ant-design/icons";
import { UsersInterface } from "../../../interface/IUser";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";

type FileType = Parameters<GetProp<UploadProps,"beforeUpload">>[0];

const ConcertCreate = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm(); // Create form instance
  const [posterFileList, setPosterFileList] = useState<UploadFile[]>([]);
  const [benefitFileList, setBenefitFileList] = useState<UploadFile[]>([]);
  const [infoFileList, setInfoFileList] = useState<UploadFile[]>([]);
  const [user, setUser] = useState<UsersInterface | null>(null);
  // const [concertData, setConcertData] = useState<ConcertInterface | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('setUser' );
    const fetchUserProfile = async () => {
      try {
        const response = await GetUserById(id);
        if (response.status === 200) {
          setUser(response.data);
        } else {
          messageApi.error("Failed to load user data.");
        }
      } catch (error) {
        messageApi.error("An error occurred while fetching user data.");
      }
    };

    fetchUserProfile();
  }, []);

  const onChangePoster: UploadProps["onChange"] = ({ fileList: newFileList1 }) => {
    setPosterFileList(newFileList1);
  };

  const onChangeBenefit: UploadProps["onChange"] = ({ fileList: newFileList2 }) => {
    setBenefitFileList(newFileList2);
  };

  const onChangeInfo: UploadProps["onChange"] = ({ fileList: newFileList3 }) => {
    setInfoFileList(newFileList3);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: ConcertInterface) => {
    console.log("Form Values:", values);
    if (user) {
      const concertData = {
        Name: values.Name,
        ShowDate: values.ShowDate,  
        Artist: values.Artist,
        Description: values.Description,
        BenefitFile: values.BenefitFile,
        InfoFile: values.InfoFile,
        PosterFile: values.PosterFile,
        TicketSalesStartDate: values.TicketSalesStartDate,  
        Status: values.Status,
        OrganizerID: user.ID,
      };

      try {
        const res = await CreateConcert(concertData);
        if (res.status === 201) {
          messageApi.success(res.data.message);
          navigate("/concert/perform", { state: { concertData } });
        } else {
          messageApi.error(res.data.error);
        }
      } catch (error) {
        console.error("Creation Error:", error);
        messageApi.error("An error occurred while creating the concert.");
      }
    } else {
      messageApi.error("User information not available.");
    }
  };

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      console.log("Validated Values:", values);
      await onFinish(values);
    } catch (error) {
      console.error("Validation Error:", error);
      messageApi.error("Please fill in all required fields!");
    }
  };

  return (
    <div>
      {contextHolder}
      <Card>
      <h2>Create New Concert</h2>
        <Divider />
        <Form
          name="concertForm"
          layout="vertical"
          form={form}
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
            {/* Upload Poster */}
            <Col span={24}>
              <Form.Item
                label="Upload Poster"
                name="poster_file"
                rules={[{ required: true, message: "Please upload a poster!" }]}
              >
                <Upload
                  fileList={posterFileList}
                  onChange={onChangePoster}
                  onPreview={onPreview}
                  beforeUpload={(file) => {
                    const newFileList1 = [...posterFileList, file];
                    setPosterFileList(newFileList1);
                    return false; // Prevent automatic upload
                  }}
                  maxCount={1}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            {/* Upload Benefit */}
            <Col span={24}>
              <Form.Item
                label="Upload Benefit"
                name="benefit_file"
                rules={[{ required: true, message: "Please upload a benefit!" }]}
              >
                <Upload
                  fileList={benefitFileList}
                  onChange={onChangeBenefit}
                  onPreview={onPreview}
                  beforeUpload={(file) => {
                    const newFileList2 = [...benefitFileList, file];
                    setBenefitFileList(newFileList2);
                    return false; // Prevent automatic upload
                  }}
                  maxCount={1}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            {/* Upload Information */}
            <Col span={24}>
              <Form.Item
                label="Upload Information"
                name="info_file"
                rules={[{ required: true, message: "Please upload information!" }]}
              >
                <Upload
                  fileList={infoFileList}
                  onChange={onChangeInfo}
                  onPreview={onPreview}
                  beforeUpload={(file) => {
                    const newFileList3 = [...infoFileList, file];
                    setInfoFileList(newFileList3);
                    return false; // Prevent automatic upload
                  }}
                  maxCount={1}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col>
              <Form.Item>
                <Space>
                  <Link to="/concert">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      Cancel
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
};

export default ConcertCreate;
