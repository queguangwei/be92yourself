import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import { PmConfirm } from '../../components/index'
import { Button, Breadcrumb, Menu, Modal, Table, Tooltip } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const confirm = Modal.confirm;

const routes = [{
    path: '/',
    breadcrumbName: '首页'
}, {
    path: 'pmhome',
    breadcrumbName: '人员管理'
}];

class pmHome extends React.Component {
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
            mData: {

            }
        }
    }

    componentDidMount() {

    }

    fetchData() {
        ApiCaller.call(Api.base.homeData, (res) => {
            if (res.code == 0) {
                const state = this.state
                state.data = res.data || {}
                this.setState(state)
            }
        })
    }

    itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    handleClick(e) {
        console.log('click ', e);
    }

    handleTitleClick(e) {
        console.log(e);
    }

    initDepartment(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const state = this.state;
        state.visible = true;
        state.modalTitle = '添加一级部门';
        state.modalType = 'initDepartment';
        state.modalWidth = 400;
        this.setState(state)
    }

    newDepartment() {
        const state = this.state;
        state.visible = true;
        state.modalTitle = '创建子部门';
        state.modalType = 'addDepartment';
        state.modalWidth = 400;
        this.setState(state)
    }

    editDepartment() {
        const state = this.state;
        state.visible = true;
        state.modalTitle = '编辑部门';
        state.modalType = 'editDepartment';
        state.modalWidth = 400;
        this.setState(state)
    }

    delDepartment() {
        confirm({
            title: '确认要删除该部门？',
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

    addMember() {
        const state = this.state;
        state.visible = true;
        state.modalTitle = '创建人员';
        state.modalType = 'addMember';
        state.modalWidth = 520;
        this.setState(state)
    }

    editMember() {
        const state = this.state;
        state.visible = true;
        state.modalTitle = '修改人员信息';
        state.modalType = 'editMember';
        state.modalWidth = 520;
        this.setState(state)
    }

    setEnabled() {
        confirm({
            title: '确认要启用该人员？',
            content: <div style={{opacity:0}}>forbidden?really?</div>,
            width: '360',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }

    setDisabled() {
        confirm({
            title: '确认要禁用该人员？',
            content: <div style={{opacity:0}}>forbidden?really?</div>,
            width: '360',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
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
        const { pagination, loading} = this.state;
        const data = [{
            key: '1',
            name: 'John Brown',
            department: '技术部',
            job: '前端',
            phone: '15606516578',
            time: '2016-05-06',
            number: 1,
            birthday: '管理员',
            status: '启用'
        }, {
            key: '2',
            name: 'Jim Green',
            department: '技术部',
            job: 'java',
            phone: '15606516578',
            time: '2016-05-06',
            number: 42,
            birthday: '管理员',
            status: '启用'
        }, {
            key: '3',
            name: 'Joe Black',
            department: '技术部',
            job: 'ios',
            phone: '15606516578',
            time: '2016-05-06',
            number: 32,
            birthday: '管理员',
            status: '禁用'
        }, {
            key: '4',
            name: 'Disabled User',
            department: '技术部',
            job: 'android',
            phone: '15606516578',
            time: '2016-05-06',
            number: 99,
            birthday: '成员',
            status: '启用'
        },{
            key: '5',
            name: 'John Brown',
            department: '技术部',
            job: '前端',
            phone: '15606516578',
            time: '2016-05-06',
            number: 1,
            birthday: '成员',
            status: '启用'
        }, {
            key: '6',
            name: 'Jim Green',
            department: '技术部',
            job: 'java',
            phone: '15606516578',
            time: '2016-05-06',
            number: 42,
            birthday: '成员',
            status: '启用'
        }, {
            key: '7',
            name: 'Joe Black',
            department: '技术部',
            job: 'ios',
            phone: '15606516578',
            time: '2016-05-06',
            number: 32,
            birthday: '成员',
            status: '禁用'
        }, {
            key: '8',
            name: 'Disabled User',
            department: '技术部',
            job: 'android',
            phone: '15606516578',
            time: '2016-05-06',
            number: 99,
            birthday: '成员',
            status: '启用'
        },{
            key: '9',
            name: 'John Brown',
            department: '技术部',
            job: '前端',
            phone: '15606516578',
            time: '2016-05-06',
            number: 1,
            birthday: '成员',
            status: '启用'
        }, {
            key: '10',
            name: 'Jim Green',
            department: '技术部',
            job: 'java',
            phone: '15606516578',
            time: '2016-05-06',
            number: 42,
            birthday: '成员',
            status: '启用'
        }, {
            key: '11',
            name: 'Joe Black',
            department: '技术部',
            job: 'ios',
            phone: '15606516578',
            time: '2016-05-06',
            number: 32,
            birthday: '成员',
            status: '禁用'
        }, {
            key: '12',
            name: 'Disabled User',
            department: '技术部',
            job: 'android',
            phone: '15606516578',
            time: '2016-05-06',
            number: 99,
            birthday: '成员',
            status: '启用'
        }];
        const columns = [
            {
                title: '姓名',
                key: 'name',
                dataIndex: 'name',
                render(x, item) {
                    return (<Tooltip placement="left" title="点我可编辑哦！">
                        <span style={{color:'#1194FE',cursor:'pointer'}} onClick={that.editMember.bind(that, item)}>{x}</span>
                    </Tooltip>)
                }
            }, {
                title: '部门',
                key: 'department',
                dataIndex: 'department'
            }, {
                title: '职位',
                key: 'job',
                dataIndex: 'job'
            }, {
                title: '手机号',
                key: 'phone',
                dataIndex: 'phone'
            }, {
                title: '入职时间',
                key: 'time',
                dataIndex: 'time',
            }, {
                title: '工号',
                key: 'number',
                dataIndex: 'number',
            }, {
                title: '账号类型',
                key: 'birthday',
                dataIndex: 'birthday',
            }, {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render(x) {
                    return (<span className={x=='启用'?'blue-status':'red-status'}>{x}</span>)
                }
            }
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
        };

        return (
            <div className="ant-layout-content">
                <div className="pm-box">
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb separator=">>" itemRender={this.itemRender.bind(this)} routes={routes}/>
                    </div>
                    <div className="initial-department" onClick={this.initDepartment.bind(this)}>添加一级部门</div>
                    <Menu
                        onClick={this.handleClick.bind(this)}
                        style={{ width:240,float:'left',position:'absolute',top:132 }}
                        mode="inline"
                        defaultOpenKeys={['sub1']}
                    >
                        <SubMenu key="sub1" title={<span>哈哈世界<span>（30）</span></span>} onTitleClick={this.handleTitleClick.bind(this)}>
                            <Menu.Item key="1"><span>总裁办<span>（2）</span></span></Menu.Item>
                            <Menu.Item key="2"><span>财务部<span>（9）</span></span></Menu.Item>
                            <Menu.Item key="3"><span>产品技术部<span>（20）</span></span></Menu.Item>
                            <Menu.Item key="4">招商部</Menu.Item>
                            <Menu.Item key="5">风控部</Menu.Item>
                            <Menu.Item key="6">行政人事部</Menu.Item>
                            <SubMenu key="sub3" title="事业部">
                                <Menu.Item key="7">销售一部</Menu.Item>
                                <Menu.Item key="8">销售二部</Menu.Item>
                                <Menu.Item key="9">销售三部</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="10">客服部</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="pm-content">
                        <div className="title">
                            <h4>产品技术部
                                <span className="editbtn" onClick={this.editDepartment.bind(this)}></span>
                                <span className="delbtn" onClick={this.delDepartment.bind(this)}></span>
                            </h4>
                            <p>部门描述部门描述部门描述部门描述部门描述部门描述部门描述</p>
                            <Button type="primary" style={{width:90,marginRight:20}} onClick={this.newDepartment.bind(this)}>新建子部门</Button>
                            <Button type="primary" style={{width:90,marginRight:20}} onClick={this.addMember.bind(this)}>添加成员</Button>
                            <Button style={{width:90,marginRight:20}} onClick={this.setEnabled.bind(this)}>启用</Button>
                            <Button style={{width:90,marginRight:20}} onClick={this.setDisabled.bind(this)}>禁用</Button>
                            <Button type="primary" style={{width:90,marginRight:20}} >设为管理员</Button>
                            <Button type="danger" style={{width:90}} onClick={this.delete.bind(this)}>删除</Button>
                        </div>
                        <Table
                            rowKey={(item, index) => {
                                return index
                            }}
                            rowClassName={(record, index) => {
                                return index % 2 === 0 ? null : 'row-class'
                            }}
                            style={{padding: '0 20px'}}
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={data}
                            pagination={pagination}
                            loading={loading}
                            onChange={this.handleTableChange.bind(this)}
                        />
                    </div>
                </div>
                <PmConfirm visible={this.state.visible} btnLoading={this.state.btnLoading} modalWidth={this.state.modalWidth}
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
}))(pmHome)
module.exports = exports['default']
