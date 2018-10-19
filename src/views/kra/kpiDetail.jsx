import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import * as Actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import { Input, Button, Breadcrumb, Row, Col, Form } from 'antd'
import { CommonConfirm } from '../../components/index'
const { TextArea } = Input;
const FormItem = Form.Item;
const routes = [{
    path: '/',
    breadcrumbName: '首页'
}, {
    path: 'kpihome',
    breadcrumbName: 'KPI'
}, {
    path: 'kpidetail',
    breadcrumbName: '详情'
}];

class kpiDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            pagination: {
                pageSize: 10
            },
            todoList: [0,1,2],
            visible: false,
            rank: 'leader',
            status: '2'
        }
    }

    itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    goback() {
        browserHistory.push('/kpihome');
    }
    submit() {

    }
    pass() {

    }
    reject() {
        const state = this.state;
        state.visible = true;
        state.modalTitle = '拒绝原因';
        state.modalWidth = 400;
        this.setState(state)
    }
    handleOk(params) {
        console.log(params)
        const state = this.state
        state.visible = false
        state.btnLoading = false
        this.setState(state)
    }
    handleCancel() {
        const state = this.state
        state.visible = false
        state.btnLoading = false
        this.setState(state)
    }

    componentDidMount() {
    }
    render() {
        let { todoList } = this.state;
        const cont =  todoList.map((k, index)=>{
            return (
                <Row className="content" key={index} index={index}>
                    <Col span={3} className="middle No">{index+1}</Col>
                    <Col span={7} className="middle lh-29 txa-left">
                        <p>1.任务1</p>
                        <p>2.任务2</p>
                        <p>3.任务3</p>
                        <p>4.任务4</p>
                        <p>5.任务5</p>
                    </Col>
                    <Col span={4} className="middle">
                        <p>30%</p>
                    </Col>
                    <Col span={10} className="middle lh-29 txa-left">
                        <p><span>5分</span>超出目标</p>
                        <p><span>4分</span>达到目标</p>
                        <p><span>3分</span>高于底限值未达目标值高于底限值未达目标值</p>
                        <p><span>2分</span>超出达到底限值目标</p>
                        <p><span>1分</span>低于底限值</p>
                    </Col>
                </Row>
            )
        });
        return (
            <div className="ant-layout-content">
                <div className="kpi-box">
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb separator=">>" itemRender={this.itemRender.bind(this)} routes={routes}/>
                    </div>
                    <div className="kpi-plan">
                        <Row className="title">
                            <Col span={3}>序号</Col>
                            <Col span={7}>主要目标</Col>
                            <Col span={4}>占比</Col>
                            <Col span={10}>评分标准</Col>
                        </Row>
                        {cont}
                        <div className="detailedplan">
                            <h4>本月具体工作计划</h4>
                            <p>第一周（5.2--5.4）：任务1 v； 第二周（5.7--5.11）：任务2 vi； 第三周（5.14--5.18）：任务3 vii； 第四周（5.21--5.25）：任务4 viii；</p>
                        </div>
                        <div className="button-box">
                            {this.state.rank=='leader'&&this.state.status=='2'?<span>
                                <Button type="primary" size="large" onClick={this.pass.bind(this)}>审核通过</Button>
                                <Button size="large" onClick={this.reject.bind(this)}>审核拒绝</Button>
                            </span>:(this.state.rank=='subordinate'&&this.state.status=='1'?<Button size="large" onClick={this.submit.bind(this)}>提交审核</Button>:null)}
                            <Button size="large" onClick={this.goback.bind(this)}>返回</Button>
                        </div>
                    </div>
                </div>
                <CommonConfirm visible={this.state.visible} btnLoading={this.state.btnLoading}
                               modalWidth={this.state.modalWidth} modalTitle={this.state.modalTitle}
                               cancelModal={this.handleCancel.bind(this)} handleOk={this.handleOk.bind(this)}/>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(kpiDetail)
module.exports = exports['default']
