import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import * as Actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import { Input, InputNumber, Button, Radio, Breadcrumb, Row, Col, Form, Tooltip } from 'antd'
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
const routes = [{
    path: '/',
    breadcrumbName: '首页'
}, {
    path: 'kpihome',
    breadcrumbName: 'KPI'
}, {
    path: 'kpigrade',
    breadcrumbName: '评分'
}];

class kpiGrade extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            pagination: {
                pageSize: 10
            },
            todoList: [0,1,2],
            type: ''
        }
    }

    itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    gradeChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    goback() {
        browserHistory.push('/kpihome');
    }
    submit() {

    }

    componentDidMount() {
    }
    render() {
        let { todoList } = this.state;
        const radioStyle = {
            display: 'block',
            height: '29px',
            lineHeight: '29px',
        };
        const cont =  todoList.map((k, index)=>{
            return (
                <Row className="content" key={index} index={index}>
                    <Col span={2} className="middle No">{index+1}</Col>
                    <Col span={6} className="middle lh-29 txa-left">
                        <p>1.任务1（3.0）</p>
                        <p>2.任务2 （0.2）</p>
                        <p>3.任务3</p>
                        <p>4.任务4 （1.6）</p>
                        <p>4.任务5</p>
                    </Col>
                    <Col span={1} className="middle">
                        <p>30%</p>
                    </Col>
                    <Col span={6} className="middle lh-29 txa-left">
                        <p><span>5分</span>超出目标</p>
                        <p><span>4分</span>达到目标</p>
                        <p><span>3分</span>高于底限值未达目标值高于底限值未达目标值</p>
                        <p><span>2分</span>超出达到底限值目标</p>
                        <p><span>1分</span>低于底限值</p>
                    </Col>
                    <Col span={2} className="middle">
                        {
                            this.state.type == 'leader' ? <p>4分</p> : <InputNumber min={1} max={5} style={{width:100}} placeholder="输入范围1到5"/>/*<RadioGroup>
                                <Radio style={radioStyle} value={5}>5分</Radio>
                                <Radio style={radioStyle} value={4}>4分</Radio>
                                <Radio style={radioStyle} value={3}>3分</Radio>
                                <Radio style={radioStyle} value={2}>2分</Radio>
                                <Radio style={radioStyle} value={1}>1分</Radio>
                            </RadioGroup>*/
                        }
                    </Col>
                    <Col span={2} className="middle">
                        {
                            this.state.type == 'leader' ? <InputNumber min={1} max={5} style={{width:100}} placeholder="输入范围1到5"/>/*<RadioGroup>
                                <Radio style={radioStyle} value={5}>5分</Radio>
                                <Radio style={radioStyle} value={4}>4分</Radio>
                                <Radio style={radioStyle} value={3}>3分</Radio>
                                <Radio style={radioStyle} value={2}>2分</Radio>
                                <Radio style={radioStyle} value={1}>1分</Radio>
                            </RadioGroup>*/ :
                                <p>暂无</p>
                        }
                    </Col>
                    <Col span={5} className="middle">
                        {
                            this.state.type == 'leader' ?
                                <p>暂无</p> :
                                <TextArea rows={7} style={{resize:'none',background:'#f7f7f7'}} placeholder="如有工作内容变更可在此填写，不超过200字" maxLength={200}/>
                        }
                    </Col>
                </Row>
            )
        });
        const tips = (<div style={{background:'#fff',color:'#333333',padding:'10px 14px 8px 10px',lineHeight:1.8}}>
            <p>1. 95≤总得分﹤100 发放月度全额绩效工资</p>
            <p>2. 80≤总得分﹤95 按实际得分发放月度绩效工资，例如85分，发 放绩效工资金额=85/100*绩效工资</p>
            <p>3. 60≤总得分﹤80 实际得分发放月度绩效工资，例如65分，发放 绩效工资金额=65/100*绩效工资</p>
            <p>4. 60≤总得分﹤80连续两次或者﹤60分时，月度绩效工资为0，列 为重点关注对象，经培训与辅导，仍绩效低于60分，则实行岗位 淘汰</p>
        </div>);
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
                            <Col span={1}>占比</Col>
                            <Col span={6}>评分标准</Col>
                            <Col span={2}>自我评分</Col>
                            <Col span={2}>主管评分</Col>
                            <Col span={5}>备注</Col>
                        </Row>
                        {cont}
                        <Row className="title">
                            <Col span={2}>序号</Col>
                            <Col span={6}>特殊事件</Col>
                            <Col span={3}>占比</Col>
                            <Col span={7}></Col>
                            <Col span={3}>自我评分</Col>
                            <Col span={3}>主管评分</Col>
                        </Row>
                        <Row className="content">
                            <Col span={2} className="middle">1</Col>
                            <Col span={6} className="middle lh-29 txa-left">
                                {this.state.type=='leader'?<p>没有特别事件，可以不写，不超过500个字，固 定占比20%，必须要详细写明事情的起因、经过 、结果，打分范围是-5到+5</p>:
                                    <TextArea rows={7} style={{resize:'none',background:'#f7f7f7'}} placeholder="没有特别事件，可以不写，不超过200个字，固 定占比20%，必须要详细写明事情的起因、经过 、结果，打分范围是-5到+5" maxLength={200}/>}
                            </Col>
                            <Col span={3} className="middle">20%</Col>
                            <Col span={7}></Col>
                            <Col span={3} className="middle">
                                {this.state.type=='leader'?<p>5分</p>:<InputNumber min={-5} max={5} style={{width:100}} placeholder="输入范围-5到5"/>}
                            </Col>
                            <Col span={3} className="middle">
                                {this.state.type=='leader'?<InputNumber min={-5} max={5} style={{width:100}} placeholder="输入范围-5到5"/>:<p>暂无</p>}
                            </Col>
                        </Row>
                        <Row className="title total">
                            <Col span={8}>累计评分
                                <Tooltip placement="right" title={tips}><i className="scroll-tip"></i></Tooltip>
                            </Col>
                            <Col span={3}>120%</Col>
                            <Col span={7}></Col>
                            <Col span={3}>98分</Col>
                            <Col span={3}>暂无</Col>
                        </Row>
                        <div className="detailedplan">
                            <h4>本月具体工作计划</h4>
                            <p>第一周（5.2--5.4）：任务1 v； 第二周（5.7--5.11）：任务2 vi； 第三周（5.14--5.18）：任务3 vii； 第四周（5.21--5.25）：任务4 viii；</p>
                        </div>
                        <Row className="summarize">
                            <Col span={12} className="pdr-10">
                                <h4>自我总结</h4>
                                {this.state.type=='leader'?<p>本人性格开朗、稳重、有活力，待人热情、真诚；工作认真负责，积极主动，能吃苦耐劳，用于承受压 力，勇于创新；有很强的组织能力和团队协作精神，具有较强的适应能力；纪律性强，工作积极配合； 意志坚强，具有较强的无私奉献精神。</p>:
                                    <TextArea rows={5} style={{resize:'none',background:'#f7f7f7'}} placeholder="填写本月个人总结，如本月工作计划完成情况等，必填，不超过500字" maxLength={500}/>}
                            </Col>
                            <Col span={12} className="pdl-10">
                                <h4>主管总结</h4>
                                <TextArea rows={5} disabled={this.state.type=='leader'?false:true} style={{resize:'none',background:'#f7f7f7'}} placeholder="自我评价阶段不可输入，主管评分阶段为必填项，不超过500字" maxLength={500}/>
                            </Col>
                        </Row>
                        <div className="button-box">
                            <Button size="large" onClick={this.submit.bind(this)}>确定</Button>
                            <Button size="large" onClick={this.goback.bind(this)}>返回</Button>
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
}))(kpiGrade)
module.exports = exports['default']
