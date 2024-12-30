import React from "react";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { userStore } from "../../stores/UserStore.js";

export const AuthForm = observer(() => {
    const onFinish = (values) => {
        userStore.loginUser(values);
    };
    // const onFinishFailed = (errorInfo) => {
    //     console.log("Failed:", errorInfo);
    // };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Login"
                name="login"
                rules={[
                    {
                        required: true,
                        message: "Please input your login!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
});
