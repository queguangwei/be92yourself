import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import * as Actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import { Input, Button, Breadcrumb, Table, Tabs, DatePicker, Popover } from 'antd'
const TabPane = Tabs.TabPane;
const { MonthPicker } = DatePicker;
const routes = [{
    path: '/',
    breadcrumbName: '首页'
}, {
    path: 'kpihome',
    breadcrumbName: 'KPI'
}];
const popcont = (
    <div className="pop">Dear,想改改？编辑也在这里哦！</div>
);
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折线图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class kpiHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            pagination: {
                pageSize: 10
            },
            filterDropdownVisible: false,

        }
    }

    query6mon() {
        this.setChart(1);
    }
    query1year() {
        this.setChart(2);
    }
    queryall() {
        this.setChart(3);
    }

    setChart(type) {
        let data = [],
            date = [];
        if(type == 1) {
            date = ["2018-01", "2018-02", "2018-03", "2018-04", "2018-05", "2018-06"];
            data = [77, 66, 36, 88, 10, 98];
        }else if(type == 2) {
            date = ["2018-01", "2018-02", "2018-03", "2018-04", "2018-05", "2018-06", "2018-07", "2018-08", "2018-09", "2018-10", "2018-11", "2018-12"];
            data = [77, 66, 36, 88, 10, 98, 77, 66, 36, 68, 10, 58];
        }else {
            date = ["2017-01", "2017-02", "2017-03", "2017-04", "2017-05", "2017-06", "2017-07", "2017-08", "2017-09", "2017-10", "2017-11", "2017-12", "2018-01", "2018-02", "2018-03", "2018-04", "2018-05", "2018-06", "2018-07", "2018-08", "2018-09", "2018-10", "2018-11", "2018-12"];
            data = [77, 66, 36, 88, 10, 98, 77, 66, 36, 68, 10, 58, 77, 66, 36, 88, 10, 98, 77, 66, 36, 68, 10, 58];
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '我的KPI得分走势图',
                padding: 20
            },
            tooltip: {
                trigger: 'axis'
            },
            backgroundColor: '#fff',
            grid: {
                left: '5%',
                right: '5%',
                bottom: '10%'
            },
            xAxis: {
                nameTextStyle: {
                    color: '#7D8BA6'
                },
                axisLine: {
                    symbol: ['none', 'arrow'],
                    symbolSize: [5, 7]
                },
                data: date
            },
            yAxis: {

            },
            series: [
                {
                    name: '评分',
                    type: 'line',
                    smooth: true,
                    lineStyle: {

                    },
                    data: data
                },
            ]
        });
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

    handleTableChange(pagination) {
        const pager = this.state.pagination
        pager.current = pagination.current
        this.state.filter.currPage = pagination.current
        this.setState({
            pagination: pager
        });
        this.fetchData()
    }

    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    }
    onSearch() {

    }
    monthPick() {

    }

    showDetail() {
        browserHistory.push({
            pathname: '/kpidetail',
            query: {
                num: 123
            }
        });
    }
    push() {
        browserHistory.push({
            pathname: '/kpigrade',
            query: {
                num: 123
            }
        });
    }

    componentDidMount() {
        this.setChart(1)
        this.fetchData()
    }
    render() {
        const that = this
        const { pagination, loading} = this.state;
        const columns = [{
            title: '工号',
            dataIndex: 'number',
        }, {
            title: '年月',
            dataIndex: 'date',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <MonthPicker onChange={this.monthPick.bind(this)} open={true} placeholder="Select month" format="YYYY-MM" />
                </div>
            ),
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                });
            },
        }, {
            title: '部门',
            dataIndex: 'address',
            filters: [{
                text: 'London',
                value: 'London',
            }, {
                text: 'New York',
                value: 'New York',
            }],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        }, {
            title: '职位',
            dataIndex: 'job',
            filters: [{
                text: 'London',
                value: 'London',
            }, {
                text: 'New York',
                value: 'New York',
            }],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        }, {
            title: '姓名',
            dataIndex: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange.bind(this)}
                        onPressEnter={this.onSearch.bind(this)}
                    />
                </div>
            ),
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput.focus());
            },
        }, {
            title: '自评分',
            dataIndex: '',
        }, {
            title: '上级评分',
            dataIndex: '',
        }, {
            title: '状态',
            dataIndex: '',
            filters: [{
                text: 'London',
                value: 'London',
            }, {
                text: 'New York',
                value: 'New York',
            }],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        }, {
            title: '当前操作人',
            dataIndex: '',
        }, {
            title: '操作',
            render(x, item) {
                return (<span>
                    <Button style={{marginRight:12}} onClick={that.showDetail.bind(this)}>查看详情</Button>
                    <Button onClick={that.push.bind(this)}>催一下</Button>
                </span>)
            }
        }];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '5',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '6',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '7',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '8',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        }];
        return (
            <div className="ant-layout-content">
                <div className="kpi-box">
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb separator=">>" itemRender={this.itemRender.bind(this)} routes={routes}/>
                    </div>
                    <div className="kpi-content">
                        <div className="query-btn">
                            <Button onClick={this.query6mon.bind(this)}>查半年</Button>
                            <Button onClick={this.query1year.bind(this)}>查一年</Button>
                            <Button onClick={this.queryall.bind(this)}>查全部</Button>
                        </div>
                        <div className="kpi-chart" id="main">
                        </div>
                        <div className="kpi-button">
                            <Popover content={popcont} placement="right">
                                <Link to="/kpiplan" className="drawup">制定我的本月KPI</Link>
                            </Popover>
                            <div className="bosspower">
                                <span className="urge">一键催单</span>
                                <span className="export">一键导出</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-container">
                        <Tabs type="card" tabBarStyle={{marginBottom:0}}>
                            <TabPane tab="查看下属本月KPI" key="1">
                                <Table
                                    rowKey={(item, index) => {
                                        return index
                                    }}
                                    rowClassName={(record, index) => {
                                        return index % 2 === 0 ? null : 'row-class'
                                    }}
                                    bordered
                                    columns={columns}
                                    dataSource={data}
                                    pagination={pagination}
                                    loading={loading}
                                    onChange={this.handleTableChange.bind(this)}
                                />
                            </TabPane>
                            <TabPane tab="查看上级本月KPI" key="2">
                                <p>Content of Tab Pane 2</p>
                                <p>Content of Tab Pane 2</p>
                                <p>Content of Tab Pane 2</p>
                            </TabPane>
                        </Tabs>
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
}))(kpiHome)
module.exports = exports['default']
