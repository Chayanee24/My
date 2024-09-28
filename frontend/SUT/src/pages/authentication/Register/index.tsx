// import React from "react";
import { Card, Col, Form, Input, Row, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../../service/https"; // Ensure this path is correct
import { UsersInterface } from "../../../interface/IUser"; // Ensure this path is correct
import logo from "../../../assets/logo.png"; // Ensure this path is correct

function SignUpPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: UsersInterface) => {
    let res = await CreateUser(values);
    
    if (res.status === 201) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Card className="card-login" style={{ width: 600 }}>
          <Row align={"middle"} justify={"center"}>
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
              <img alt="logo" src={logo} className="images-logo" />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h2 className="header">Sign Up</h2>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off" className="login">
                  <Row gutter={[16, 0]} align={"middle"}>
                    <Col xs={24}>
                      <Form.Item
                        label="Username"
                        name="user"
                        rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้ !" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน !" }]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง !" },
                          { required: true, message: "กรุณากรอกอีเมล !" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "กรุณากรอกชื่อ !" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        rules={[
                          { pattern: /^[0-9]{10}$/, message: "รูปแบบเบอร์โทรไม่ถูกต้อง !" },
                          { required: true, message: "กรุณากรอกเบอร์โทร !" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: "กรุณากรอกที่อยู่ !" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item
                        label="Organization"
                        name="organization"
                        rules={[{ required: true, message: "กรุณากรอกองค์กร !" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          style={{ marginBottom: 20 }}
                        >
                          Sign up
                        </Button>
                        Or <a onClick={() => navigate("/")}>signin now !</a>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default SignUpPages;
