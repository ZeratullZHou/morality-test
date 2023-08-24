import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Spin, Modal } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import request from '../services';
import { setCookie } from '@/utils';

export default function Login(pros) {
    const { refresh } = pros;
    const [loading, setLoading] = useState(false);
    const [logup, setLogup] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const success = msg => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };
    const error = msg => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };
    const onFinish = values => {
        if (values.username && values.userpasswd) {
            setLoading(true);
            request('/get-userinfo', {
                params: {
                    username: values.username,
                    userpasswd: values.userpasswd,
                },
            }).then(res => {
                setLoading(false);
                if (res.isSuccess) {
                    success('登录成功');
                    setCookie('username', values.username);
                    setCookie('name', res.data.name);
                    refresh();
                } else {
                    error(res.msg);
                }
                console.log(res);
            });
        }
    };

    const onLogup = values => {
        if (values.username && values.userpasswd && values.name) {
            setLoading(true);
            request(
                '/add-user',
                {
                    data: {
                        username: values.username,
                        userpasswd: values.userpasswd,
                        name: values.name,
                    },
                },
                'post'
            ).then(res => {
                setLoading(false);
                if (res.isSuccess) {
                    success('注册成功，请登录');
                    setLogup(!logup);
                } else {
                    error(res.msg);
                    setLogup(!logup);
                }
                console.log(res);
            });
        }
    };

    return (
        <div className={styles.wrapper}>
            {contextHolder}
            <Spin spinning={loading}>
                <h2>请输入用户名密码登录系统</h2>
                <div
                    style={{
                        width: '65%',
                        height: '200px',
                        background: '#69b1ff',
                        margin: '0 auto',
                    }}
                />
                <Form
                    name="normal_login"
                    style={{ width: '65%', textAlign: 'center', margin: '50px auto' }}
                    className={styles['loginForm']}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="userpasswd"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles['login-form-button']}
                        >
                            登录
                        </Button>
                        或者{' '}
                        <a onClick={() => setLogup(!logup)}>
                            注册新用户!
                        </a>
                    </Form.Item>
                </Form>
            </Spin>
            <Modal
                title="注册新用户"
                onOK={onLogup}
                onCancel={() => {
                    setLogup(!logup);
                }}
                open={logup}
                footer={null}
            >
                <Form
                    name="normal_logup"
                    style={{ width: '65%', textAlign: 'center', margin: '50px auto' }}
                    className={styles['loginForm']}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onLogup}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="userpasswd"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名！',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="姓名" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles['login-form-button']}
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
