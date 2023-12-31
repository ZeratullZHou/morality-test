import { Button, Form, Select, Space, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import rules from '../public/rules';
import request from '../services';
import { getCookie } from '@/utils';

const { data } = rules;
export default function HomePage() {
    const [chuguiValue, setChugui] = useState();
    const [pituiValue, setPitui] = useState();
    const [banlvValue, setBanlv] = useState();
    const [weifaValue, setWeifa] = useState();
    const [finish, setFinish] = useState(false);
    const [score, setScore] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const method = [
        { state: chuguiValue, setState: setChugui },
        { state: pituiValue, setState: setPitui },
        { state: banlvValue, setState: setBanlv },
        { state: weifaValue, setState: setWeifa },
    ];
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
        let s = 100;
        Object.values(values).forEach(item => (s -= item));
        setScore(s);
        setFinish(true);
        const username = getCookie('username');
        request(
            '/set-score',
            {
                data: {
                    username,
                    score: s,
                },
            },
            'put'
        ).then(res => {
            if (res.isSuccess) {
                success(res.msg);
            } else {
                error(res.msg);
            }
        });
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const name = getCookie('name');
    return (
        <div className={styles.wrapper}>
            <h2>{name}欢迎来到道德测试表</h2>
            <p>可以点击顶部道德规则导航栏查看具体规则</p>
            <p>请如实填写以下表单</p>
            {contextHolder}
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
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    {data.map((item, index) => {
                        if (item.children) {
                            return (
                                <Form.Item
                                    style={{
                                        margin: '0 auto',
                                        width: '50%',
                                    }}
                                    key={item.type}
                                    label={item.type}
                                    name={item.type}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择!',
                                        },
                                    ]}
                                >
                                    <Select
                                        value={method[index].state}
                                        options={item.children.map(i => {
                                            return {
                                                value: i.score,
                                                label: i.type,
                                            };
                                        })}
                                        onChange={e => {
                                            method[index].setState(e);
                                        }}
                                    />
                                </Form.Item>
                            );
                        } else return <Form.Item label={item.type} name={item.type} />;
                    })}
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
            {finish ? <h2>{`你的性道德得分是${score}`}</h2> : <></>}
        </div>
    );
}
