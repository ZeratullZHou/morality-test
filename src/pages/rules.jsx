import { Button, Form, Input, Spin, Select, message } from 'antd';
import { history } from 'umi';
import { useState } from 'react';

import request from '../services';
import RuleOption from '@/component/RuleOption';
import { getCookie } from '@/utils';
import styles from './index.less';

const RulesPage = () => {
    const [messageMethod, messageContext] = message.useMessage();
    const [number, setNumber] = useState(2);
    const [loading, setLoading] = useState(false);

    const onFinish = values => {
        const rule_option = [];
        const username = getCookie('username');
        for (let i in values) {
            if (i !== 'rule_type' && i !== 'rule_name') {
                rule_option.push(values[i]);
            }
        }
        const data = {
            username,
            rule: {
                rule_type: values.rule_type,
                rule_name: values.rule_name,
                rule_option,
            },
        };
        setLoading(true);
        request(
            '/add-rule',
            {
                data,
            },
            'post'
        ).then(res => {
            setLoading(false);
            if (res.isSuccess) {
                history.push('/');
                return messageMethod.success(res.msg);
            } else {
                return messageMethod.error(res.msg);
            }
        });
    };
    const onNumberPlus = () => {
        if (number >= 5) {
            return messageMethod.error('选项数量不能超过5个');
        }
        setNumber(number + 1);
    };
    const onNumberMinus = () => {
        if (number <= 2) {
            return messageMethod.error('选项数量不能少于2个');
        }
        const temp = [];
        setNumber(number - 1);
    };

    const checkOption = (_, value) => {
        if (value && value.option_name.length > 0 && value.option_score >= 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('请输入规则选项!'));
    };

    const renderOption = num => {
        let i,
            Component = [];
        for (i = 0; i < num; i++) {
            Component.push(i);
        }
        return Component.map(item => {
            return (
                <div key={item}>
                    <p>选项{item + 1}</p>
                    <Form.Item
                        name={`rule_option${item}`}
                        rules={[
                            {
                                validator: checkOption,
                            },
                        ]}
                    >
                        <RuleOption />
                    </Form.Item>
                </div>
            );
        });
    };

    return (
        <div>
            {messageContext}
            <Spin spinning={loading}>
                <Form
                    name="normal_rules"
                    style={{ width: '65%', textAlign: 'center', margin: '50px auto' }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="rule_type"
                        rules={[
                            {
                                required: true,
                                message: '请选择规则类别！',
                            },
                        ]}
                    >
                        <Select placeholder="规则类别">
                            <Select.Option value="1">出轨劈腿类</Select.Option>
                            <Select.Option value="2">性伴侣类</Select.Option>
                            <Select.Option value="3">违法类</Select.Option>
                            <Select.Option value="4">其他关系类</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="rule_name"
                        rules={[
                            {
                                required: true,
                                message: '请输入规则名称！',
                            },
                        ]}
                    >
                        <Input
                            placeholder="规则名称"
                            style={{ display: 'flex', margin: '12px 8px' }}
                        />
                    </Form.Item>
                    <span>增加选项</span>
                    <Button
                        onClick={onNumberPlus}
                        style={{
                            width: 24,
                            padding: '0',
                            margin: '0 12px',
                        }}
                    >
                        +
                    </Button>
                    <Button
                        onClick={onNumberMinus}
                        style={{
                            width: 24,
                            padding: '0',
                        }}
                    >
                        -
                    </Button>
                    {renderOption(number)}
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
            </Spin>
        </div>
    );
};

export default RulesPage;
