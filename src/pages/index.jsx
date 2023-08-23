import { Button, Checkbox, Form, Input } from 'antd';
import rules from '../public/rules';

export default function HomePage() {
    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const { ruleType } = rules;
    return (
        <div>
            <h2>欢迎来到道德测试表</h2>
            <p>请如实填写以下表单</p>
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
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {ruleType.map(item => {
                    return item.subType.map(i => {
                        return (
                            <Form.Item
                                label={i.name}
                                name={i.name}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Checkbox />
                            </Form.Item>
                        );
                    });
                })}
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
