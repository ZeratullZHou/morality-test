import { history, Outlet } from 'umi';
import styles from './index.less';
import { Menu } from 'antd';
import { useState } from 'react';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Login from '../pages/login';
import { getCookie, delCookie } from '../utils';

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
    const [current, setCurrent] = useState(isLogin ? '/' : '');
    const isLogin = !!getCookie('username');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
        history.push(e.key);
    };

    const onRefresh = () => {
        setCurrent('/');
    }
    const onExit = () => {
        delCookie('username');
        delCookie('name');
    };

    if (isLogin)
        return (
            <div className={styles.navs}>
                <Menu items={items} onClick={onClick} selectedKeys={[current]} mode="horizontal" />
                <a className={styles.logout} onClick={onExit} href="">
                    退出登录
                </a>
                <Outlet/>
            </div>
        );
    else return <Login refresh={onRefresh} />;
}
