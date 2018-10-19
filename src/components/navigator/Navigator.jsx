import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions/index'
import { bindActionCreators } from 'redux'
import { Input, Menu, Dropdown } from 'antd'
import './Navigator.scss'
const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navigator extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            logined: false
        }
    }


    loginOut() {
        const token = Cookie.get('token', ApiCaller.getCookieOptions())
        if (token) {
            ApiCaller.call(Api.base.loginOut, {}, (res) => {
                if (res.code == 0) {
                    Cookie.remove('token', {path: '/'})
                    location.href = '/'
                }
            })
        } else {
            location.href = '/'
        }
    }

    componentDidMount(){

    }
    render () {
        const menu = (
            <Menu style={{padding:'10px 0 0 10px'}}>
                <MenuItemGroup title={<span className="nav-menu">管理中心</span>}>
                    <Menu.Item key="setting:1"><Link to="/pmhome"><span className="nav-person"><i></i>人员管理</span></Link></Menu.Item>
                    <Menu.Item key="setting:2"><Link to="/gradhome"><span className="nav-grading"><i></i>分级管理员</span></Link></Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title={<span className="nav-menu">效率工作</span>}>
                    <Menu.Item key="setting:3"><Link to="/kpihome"><span className="nav-kpi"><i></i>KPI</span></Link></Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title={<span className="nav-menu">交友吹逼</span>}>
                    <Menu.Item key="setting:4">Option 3</Menu.Item>
                    <Menu.Item key="setting:5">Option 4</Menu.Item>
                </MenuItemGroup>
            </Menu>
        );
        const loginMenu = (
            <Menu>
                <Menu.Item>
                    <div className='menu-li' onClick={() => {
                        this.setState({changePassVisible: true})
                    }}>修改密码
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div onClick={this.loginOut.bind(this)} className='menu-li'>退出</div>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className='navigator'>
                <div style={{width: 1180,margin:'0 auto',padding:'0 30px'}}>
                    <Link className="logo" to="/"><i></i><span className="tip">哈哈世界</span></Link>
                    <Search
                        placeholder="猜你喜欢..."
                        style={{width: 280,marginLeft: 30}}
                        onSearch={value => console.log(value)}
                    />
                    <ul className="top-list">
                        <li>
                            <Link to="/notice"><i className="bell shake"></i><b>2</b></Link>
                        </li>
                        <li>
                            <Dropdown overlay={menu} placement="bottomRight">
                                <i className="menu"></i>
                            </Dropdown>
                        </li>
                        <li className="">
                            <div className="center">
                                <img src="" />
                                <Dropdown overlay={loginMenu} placement="bottomRight">
                                <span className="job-title">
                                    <div className="post">产品经理</div>
                                    <div className="name">哈哈哈</div>
                                </span>
                                </Dropdown>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    global: state.global,
    user: state.user
}), dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
}))(Navigator)
module.exports = exports['default']
