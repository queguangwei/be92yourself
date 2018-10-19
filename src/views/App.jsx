import React, {Component} from "react";
import {connect} from "react-redux";
import * as Actions from "../store/actions";
import {bindActionCreators} from "redux";
import ApiCaller from "../utils/ApiCaller";
import Api from "../constants/Api";
import Cookie from "../utils/Cookie";
import {Link} from "react-router";
import { Navigator, Login } from '../components/index';
import bgImg from "../static/images/background.png";
import 'antd/dist/antd.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        // this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
        this.state = {
            isLogined: false,
        }
    }

    componentDidMount() {
        //获取用户信息
        this.handleLogined()
    }

    isLogined() {
        return !!Cookie.get('token', ApiCaller.getCookieOptions())
    }

    handleLogined() {
        // 登录之后再次获取用户信息
        this.props.actions.loadInfo(() => {

        })
    }

    render() {
        // const isLogined = this.isLogined()
        return this.state.isLogined ? (
            <div style={{backgroundColor:'#1B7CA9',backgroundImage:'url('+ bgImg +')',backgroundRepeat:'no-repeat'}}>
                <Navigator user={this.props.user} />
                <div className="ant-layout-container">
                    {this.props.children}
                </div>
            </div>
        ) : <Login onLogined={this.handleLogined.bind(this)} visitor={()=>{this.setState({isLogined: !this.state.isLogined})}}/>
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(state => ({
    global: state.global,
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(App)
module.exports = exports['default']
