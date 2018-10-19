import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { Button, Breadcrumb } from 'antd'
const routes = [{
    path: '/',
    breadcrumbName: '首页'
}, {
    path: 'artifact',
    breadcrumbName: '我的神器'
}];

class Artifact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            pagination: {
                pageSize: 10
            },
            btnType: false
        }
    }

    itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    edit() {
       const state = this.state;
       state.btnType = true;
       this.setState(state);
    }
    set() {
        const state = this.state;
        state.btnType = false;
        this.setState(state);
    }

    componentDidMount() {

    }
    render() {
        return (
            <div className="ant-layout-content">
                <div className="artifact-box">
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb separator=">>" itemRender={this.itemRender.bind(this)} routes={routes}/>
                    </div>
                    <div className="arti-content">
                        <div className="my">
                            <h3>我的神器{this.state.btnType?
                                <Button type="primary" size="large" style={{float:'right'}} onClick={this.set.bind(this)}>保存</Button>:
                                <Button size="large" style={{float:'right'}} onClick={this.edit.bind(this)}>编辑</Button>}
                            </h3>
                            <ul>
                                <li className="kpi">
                                    <span>KPI</span>
                                    <i className="reduce"></i>
                                </li>
                                <li className="gitlab">
                                    <span>gitlab</span>
                                    <i className="reduce"></i>
                                </li>
                                <li className="tower">
                                    <span>tower</span>
                                    <i className="reduce"></i>
                                </li>
                                <li className="dandelion">
                                    <span>蒲公英</span>
                                    <i className="reduce"></i>
                                </li>
                                <li className="mockingbot">
                                    <span>墨刀</span>
                                    <i className="reduce"></i>
                                </li>
                                <li className="bluelake">
                                    <span>蓝湖</span>
                                    <i className="reduce"></i>
                                </li>
                            </ul>
                        </div>
                        <div className="all">
                            <h3>全部神器</h3>
                            <ul>
                                <li className="kpi">
                                    <span>KPI</span>
                                </li>
                                <li className="gitlab">
                                    <span>gitlab</span>
                                </li>
                                <li className="tower">
                                    <span>tower</span>
                                </li>
                                <li className="dandelion">
                                    <span>蒲公英</span>
                                </li>
                                <li className="mockingbot">
                                    <span>墨刀</span>
                                </li>
                                <li className="bluelake">
                                    <span>蓝湖</span>
                                </li>
                                <li className="bluelake">
                                    <span>蓝湖</span>
                                    <i className="add"></i>
                                </li>
                                <li className="bluelake">
                                    <span>蓝湖</span>
                                    <i className="add"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(Artifact)
module.exports = exports['default']
