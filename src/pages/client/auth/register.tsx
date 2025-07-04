import type { FormProps } from 'antd';
import { Button, Divider, Form, Input } from 'antd';
import { Card } from 'antd';
import { useState } from 'react';
type FieldType = {
    fullName?: string;
    email?: string;
    password?: string;
    phone?: string;
};

const RegisterPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Received values:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Card
                style={{
                    width: 600,
                    margin: 'auto',
                    marginTop: '50px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px'
                }}
            >
                <h1>Register</h1>
                <Form
                    name="basic"
                    style={{ maxWidth: 600 }}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Register
                        </Button>
                    </Form.Item>
                    <Divider>OR</Divider>
                    Has an account? <a href="/login">Login</a>
                </Form>
            </Card>
        </>
    )
}
export default RegisterPage;