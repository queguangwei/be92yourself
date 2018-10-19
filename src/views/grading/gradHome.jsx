import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import { GradConfirm } from '../../components/index'
import { Button, Breadcrumb, Modal, Table } from 'antd';
const confirm = Modal.confirm;

const routes = [{
    path: '/',
    breadcrumbName: '首页'
}, {
    path: 'gradhome',
    breadcrumbName: '分级管理员'
}];

class gradHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            pagination: {
                pageSize: 10
            },
            visible: false,
            modalTitle: '',
            content: '',
        }
    }

    componentDidMount() {

    }

    fetchData() {
        ApiCaller.call(Api.base.homeData, (res) => {
            if (res.code == 0) {
                const state = this.state
                state.data = res.data
                this.setState(state)
            }
        })
    }

    itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    add() {
        const state = this.state;
        state.visible = true;
        state.modalTitle = '添加分级管理员';
        state.modalWidth = 460;
        this.setState(state)
    }

    edit() {
        const state = this.state;
        state.visible = true;
        state.modalTitle = '修改人员信息';
        state.modalType = 'editMember';
        state.modalWidth = 520;
        this.setState(state)
    }

    delete() {
        confirm({
            title: '确认要删除该人员？',
            content: <div style={{opacity:0}}>pass?really?</div>,
            width: '360',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }

    handleCancel() {
        const state = this.state
        state.visible = false
        state.btnLoading = false
        this.setState(state)
    }

    handleOk() {
        const state = this.state
        state.visible = false
        state.btnLoading = false
        this.setState(state)
    }

    handleTableChange(pagination) {
        const pager = this.state.pagination
        pager.current = pagination.current
        this.state.filter.currPage = pagination.current
        this.setState({
            pagination: pager
        });
        this.fetchData()
    }

    render() {
        const that = this;
        const {  pagination, loading} = this.state;
        const data = [{
            key: '1',
            name: 'John Brown',
            department: '技术部',
            job: '前端',
        }, {
            key: '2',
            name: 'Jim Green',
            department: '技术部',
            job: 'java',
        }, {
            key: '3',
            name: 'Joe Black',
            department: '技术部',
            job: 'ios',
        }, {
            key: '4',
            name: 'Disabled User',
            department: '技术部',
            job: 'android',
        },{
            key: '5',
            name: 'John Brown',
            department: '技术部',
            job: '前端',
        }, {
            key: '6',
            name: 'Jim Green',
            department: '技术部',
            job: 'java',
        }, {
            key: '7',
            name: 'Joe Black',
            department: '技术部',
            job: 'ios',
        }, {
            key: '8',
            name: 'Disabled User',
            department: '技术部',
            job: 'android',
        },{
            key: '9',
            name: 'John Brown',
            department: '技术部',
            job: '前端',
        }, {
            key: '10',
            name: 'Jim Green',
            department: '技术部',
            job: 'java',
        }, {
            key: '11',
            name: 'Joe Black',
            department: '技术部',
            job: 'ios',
        }, {
            key: '12',
            name: 'Disabled User',
            department: '技术部',
            job: 'android',
        }];
        const columns = [
            {
                title: '姓名',
                key: 'name',
                dataIndex: 'name',
                width: '200'
            }, {
                title: '管理范围',
                key: 'department',
                dataIndex: 'department'
            }, {
                title: '权限',
                key: 'job',
                dataIndex: 'job'
            }, {
                title: '操作',
                render(x, item) {
                    return (<span>
                        <Button style={{marginRight:20}} onClick={that.edit.bind(that, item)}>编辑</Button>
                        <Button type="danger" onClick={that.delete.bind(that, item)}>删除</Button>
                    </span>)
                }
            }
        ];
        return (
            <div className="ant-layout-content">
                <div className="pm-box">
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb separator=">>" itemRender={this.itemRender.bind(this)} routes={routes}/>
                    </div>
                    <div className="grad-content">
                        {data.length==0?
                            <div className="grad-empty">
                                <div className="words">
                                    <span>这里空空如也…</span>
                                    <p>请先添加分级管理员，太空旷了～～～</p>
                                </div>
                            </div>:
                            <Table
                                rowKey={(item, index) => {
                                    return index
                                }}
                                rowClassName={(record, index) => {
                                    return index % 2 === 0 ? null : 'row-class'
                                }}
                                style={{padding: '20px 20px 0'}}
                                columns={columns}
                                dataSource={data}
                                pagination={pagination}
                                loading={loading}
                                onChange={this.handleTableChange.bind(this)}
                            />
                        }
                        <span className="addGrad-btn" onClick={this.add.bind(this)}>添加分级管理员</span>
                    </div>
                </div>
                <GradConfirm visible={this.state.visible} btnLoading={this.state.btnLoading} modalWidth={this.state.modalWidth}
                           modalTitle={this.state.modalTitle} modalType={this.state.modalType}
                           cancelModal={this.handleCancel.bind(this)} handleOk={this.handleOk.bind(this)}/>
            </div>
        )
    }
}
export default connect(state => ({
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(gradHome)
module.exports = exports['default']
