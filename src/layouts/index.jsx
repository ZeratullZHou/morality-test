import { history, Outlet } from 'umi';
import styles from './index.less';
import { Menu } from 'antd';
import { useState } from 'react';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const items = [
    {
        label: '道德测试',
        key: '/',
        icon: <CheckCircleOutlined />,
    },
    {
        label: '道德规则',
        key: '/rule',
        icon: <InfoCircleOutlined />,
    },
];
export default function Layout() {
    const [current, setCurrent] = useState('/');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
        history.push(e.key);
    };

    return (
        <div className={styles.navs}>
            <Menu  items={items} onClick={onClick} selectedKeys={[current]} mode="horizontal" />
            <Outlet />
        </div>
    );
}
