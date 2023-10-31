import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import axios from "axios";

export default function Welcome() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onFinish = async () => {
        if (email === "" || password === "") {
            alert("please fill credentials")
        } else {
            await axios.post("http://localhost:5000/api/getUser", { email }).then((res) => {
                console.log(res, "response");
                if (res.data[0] !== undefined) {
                    if (res.data[0].password === password) {
                        alert("Login success")
                        navigate("/home", { state: { data: res.data[0] } })
                    } else {
                        alert("Please check your password")
                    }
                } else {
                    alert("We cannot find this username, please register with us!")
                }
            })
        }
    };

    return (
        <div style={{ paddingLeft: "20%", paddingRight: "20%", paddingTop: "10%" }}>
            <h1>Welcome to Zuna ToDo list ! </h1>
            <h3>Login</h3>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please enter your Email!" }]}
                >
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        prefix={<LockOutlined />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ width: "100%", marginBottom: "5%" }}
                    >
                        Log in
                    </Button>
                    <br></br>
                    Or{" "}
                    <a
                        onClick={() => navigate("/register")}
                        style={{ fontSize: 18 }}
                        href=""
                    >
                        register now!
                    </a>
                </Form.Item>
            </Form>
        </div>
    );
}