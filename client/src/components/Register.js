import { Button, Form, Input, } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/addUser", { email, username, password }).then((res) => {
      console.log(res.status, "response");
      if(res.status === 201) {
        alert("Succesufully Registered")
        navigate("/")
      } else if(res.status === 500) {
        alert("error while registering, please try after some time")
      }
    })
  };

  return (
    <div style={{ paddingLeft: "20%", paddingRight: "20%", paddingTop: "10%" }}>
      <h2>Please fill following to register with us!</h2>
      <Form form={form} name="register" onFinish={handleSubmit}>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
              required: true
            },
            {
              message: "Please input your E-Mail",
            },
          ]}
        >
          <Input
            placeholder="please enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              message: "Please input your nickname!",
              whitespace: true,
              required: true
            },
          ]}
        >
          <Input placeholder="please enter your username" onChange={(e) => setUserName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              message: "Please input your password",
              required: true
            },
            {
              min: 8,
              message: "password should contain atlease 8 digits",
            },
          ]}
        >
          <Input.Password placeholder="please enter your password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              message: "This field is required",
              required: true
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            placeholder="please re-enter your password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginBottom: "5%" }}
          >
            Register
          </Button>
          <br></br>
          Or{" "}
          <a
            onClick={() => navigate("/")}
            style={{ fontSize: 18 }}
            href=""
          >
            login
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
