import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import * as Actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import { Input, Button, Breadcrumb, Row, Col, Form } from 'antd'
const { TextArea } = Input;
const FormItem = Form.Item;
const routes = [{
    path: '/',
    breadcrumbName: '首页'
}, {
    path: 'kpihome',
    breadcrumbName: 'KPI'
}, {
    path: 'kpiplan',
    breadcrumbName: '制定我的本月KPI'
}];

function filter_array(array) {
    for(var i = 0 ;i<array.length;i++)
    {
        if(array[i] == "" || typeof(array[i]) == "undefined")
        {
            array.splice(i,1);
            i= i-1;

        }
    }
    return array;
}

class kpiPlan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            pagination: {
                pageSize: 10
            },
            todoList: [],
        }
    }

    itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    add() {
        const state = this.state;
        state.todoList.push(<Row className="content" key={this.state.todoList.length} index={this.state.todoList.length}>
            <Col span={2} className="middle No">1</Col>
            <Col span={6} className="middle">
                <TextArea rows={7} style={{resize:'none',background:'#f7f7f7',padding:'5px 9px'}} placeholder="这里是一个主要目标，限字数200字" maxLength={200}/>
            </Col>
            <Col span={4} className="middle">
                <Input addonAfter="%"  placeholder="请输入占比" style={{verticalAlign:'middle'}}/>
            </Col>
            <Col span={8} className="middle lh-29">
                <Input addonBefore="5分" placeholder="超出目标"/>
                <Input addonBefore="4分" placeholder="达到目标"/>
                <Input addonBefore="3分" placeholder="高于底限值未达到目标值"/>
                <Input addonBefore="2分" placeholder="达到底限值"/>
                <Input addonBefore="1分" placeholder="低于底限值"/>
            </Col>
            <Col span={4} className="middle">
                <Button type="danger" data-index={this.state.todoList.length} onClick={this.delete.bind(this)}>删除</Button>
            </Col>
        </Row>);
        // state.todoList.push(state.todoList.length);
        this.setState(state);
    }

    delete(e) {
        let index = e.target.getAttribute("data-index");
        const state = this.state;
        state.todoList.splice(index, 1, '');
        this.setState(state);
    }

    goback() {
        browserHistory.push('/kpihome');
    }

    componentDidMount() {
        this.add()
    }
    componentDidUpdate() {
        let list = document.getElementsByClassName('No');
        for(let i=0;i<list.length;i++) {
            document.getElementsByClassName('No')[i].innerText=i+1
        }
    }
    render() {
        let { todoList } = this.state;
        return (
            <div className="ant-layout-content">
                <div className="kpi-box">
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb separator=">>" itemRender={this.itemRender.bind(this)} routes={routes}/>
                    </div>
                    <div className="kpi-plan">
                        <Row className="title">
                            <Col span={2}>序号</Col>
                            <Col span={6}>主要目标</Col>
                            <Col span={4}>占比</Col>
                            <Col span={8}>评分标准</Col>
                            <Col span={4}>相关操作</Col>
                        </Row>
                        {todoList}
                        <div className="add">
                            <Button type="primary" size="large" onClick={this.add.bind(this)}>继续添加</Button>
                        </div>
                        <div className="detailedplan">
                            <h4>本月具体工作计划</h4>
                            <TextArea rows={7} style={{resize:'none',background:'#f7f7f7',padding:'10px 17px'}} maxLength={500} placeholder="请指定本月工作计划，按周设置具体工作计划，限字数500字"/>
                        </div>
                        <div className="button-box">
                            <Button size="large">保存</Button>
                            <Button size="large">提交审核</Button>
                            <Button size="large" onClick={this.goback.bind(this)}>返回</Button>
                            <Button size="large" style={{float:'right',marginRight:0}}>复制上个月KPI</Button>
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
}))(kpiPlan)
module.exports = exports['default']
