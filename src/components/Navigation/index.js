import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import 'antd/dist/antd.min.css';

export default function Navigation(props){

    const location = useLocation();

    return (
        <Menu
            mode="horizontal"
            theme="dark"
            style={{ position: "sticky", top: "0", zIndex: "1" }}
            triggerSubMenuAction='click'
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname,]}
        >
            <Menu.Item id='nav_appname_icon' disabled={true} key='nav_title_key_loggedin' style={{ backgroundColor: '#001529' }}>
                {props.app_name}
            </Menu.Item>
            <Menu.Item className="menu_item_styled" key={ROUTES.HOME}>
                Call Inspector
                <Link to={ROUTES.HOME} />
            </Menu.Item>
        </Menu>
    )
}