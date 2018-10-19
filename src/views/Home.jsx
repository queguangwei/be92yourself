import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { RollingNews, ImportantNews } from '../components/index'
import { DatePicker, Calendar, Card, Input, Collapse, Button, notification, BackTop } from 'antd'

const { TextArea } = Input;
const Panel = Collapse.Panel;

class Textarea extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            onUploading: false,
            count: 0,
            content: ''
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.onUploading != this.state.onUploading ) {
            const state = this.state
            state.count = 0
            state.content = ''
            state.onUploading = nextProps.onUploading
        }
    }

    onChangeValue(e) {
        const state = this.state
        let value = e.target.value
        if (value.length > 300) {
            value = value.slice(0,300)
        }
        state.content = value
        state.count = value.length
        this.setState(state)
    }

    publish() {
        const state = this.state
        const content = state.content
        if(state.count < 5) {
            notification['warning']({
                message: '警告',
                description: '内容请不要少于5个字哦！',
            });
        }else {
            this.setState({
                onUploading: true
            });
            this.props.handlePublish(content)
        }
    }

    render(){
        return(
            <div className="comments-textarea">
                <TextArea style={{width:540,height:100,margin:'20px 20px 10px',background:'rgba(246,246,246,1)',fontSize:14,resize:'none'}}
                          onChange={this.onChangeValue.bind(this)}
                          value={this.state.content}
                          placeholder="请输入动态..." />
                <div className="operating">
                    <span className="count">{this.state.count}/300</span>
                    <Button type="primary" disabled={this.state.onUploading} size="large" onClick={this.publish.bind(this)} style={{width:65,height:32,fontSize:14}}>发表</Button></div>
            </div>
        )
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onUploading: false,
            data: [],
            momentHeader: [1],
            momentList: [1],
            artifactStatus: true,
            calendarVisible: false,
        }
    }

    componentDidMount() {

    }

    onChange(date, dateString) {
        console.log(date, dateString);
    }

    publish(content) {
        const state = this.state

    }

    showCalendar() {
        const state = this.state
        state.calendarVisible = true
        this.setState(state)
    }
    getListData(value) {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'normal', content: 'This is usual event.' },
                ]; break;
            case 10:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'normal', content: 'This is usual event.' },
                    { type: 'error', content: 'This is error event.' },
                ]; break;
            case 15:
                listData = [
                    { type: 'warning', content: 'This is warning event' },
                    { type: 'normal', content: 'This is very long usual event。。....' },
                    { type: 'error', content: 'This is error event 1.' },
                    { type: 'error', content: 'This is error event 2.' },
                    { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: 'This is error event 4.' },
                ]; break;
            default:
        }
        return listData || [];
    }
    dateCellRender(value) {
        const listData = this.getListData(value);
        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <span className={`event-${item.type}`}>●</span>
                            {item.content}
                        </li>
                    ))
                }
            </ul>
        );
    }

    render() {
        const momentHeader = this.state.momentHeader.map((k, index)=>{
            return (
                <div>
                    <div className="comment-box">
                        <div className="infomation">
                            <img src="" />
                            <span className="info-person">
                                <div className="name">王小姐</div>
                                <div className="from"><span className="last">38分钟前</span><span>来着爱疯x</span></div>
                            </span>
                        </div>
                        <div className="content">
                            多少人在异地工作，忍受着孤独寂寞，下雨没人送伞，开心没人可以分享，难过没人可以倾诉，一个人走完四季，冷暖自知。人生就是这样，耐得住寂寞才能守得住繁华，该奋斗的年龄不要选择了安逸，度过了一段自己都能感动的日子，就会遇见那个最好的自己，踏实一些，你想要的岁月统统会还给你。
                        </div>
                    </div>
                    <div className="operational-zone">
                        <span className="comment">2</span>
                        <span className="like">5</span>
                    </div>
                </div>
            )
        });
        const momentList = this.state.momentList.map((l, index)=>{
            return (
                <div className="comment-list">
                    <div className="review">
                        <img src="" />
                        <span>
                            <input type="text"/>
                            <span className="comment-btn">评论</span>
                        </span>
                    </div>
                    <ul className="">
                        <li>
                            <img src=""/>
                            <span className="tips">
                                <b>路人甲</b><span>今天 09:30</span><span>华为荣耀v7</span>
                            </span>
                            <p>钱老师生日快乐 阿弥陀佛 么阿弥陀佛 好可爱～～～</p>
                        </li>
                        <li>
                            <img src=""/>
                            <span className="tips">
                                <b>路人甲</b><span>今天 09:30</span><span>华为荣耀v7</span>
                            </span>
                            <p>钱老师生日快乐 阿弥陀佛 么老师生日快乐 阿弥陀佛 么么哒！！钱老师生日快乐 阿弥陀佛 么么哒阿弥陀佛 好可爱～～～</p>
                        </li>
                        <li>
                            <img src=""/>
                            <span className="tips">
                                <b>路人甲</b><span>今天 09:30</span><span>华为荣耀v7</span>
                            </span>
                            <p>钱老师生日快乐 阿弥陀佛 么么哒！！钱老师生日快乐 阿弥陀佛 么么哒阿弥陀佛 钱老师生日快乐好可爱～～～钱老师生日快乐 阿弥陀佛 么么哒！！钱老师生日快乐 阿弥陀佛 么么哒阿弥陀佛 好可爱～～～</p>
                        </li>
                    </ul>
                </div>
            )
        });

        return (
            <div className="ant-layout-content">
                <RollingNews />
                <ImportantNews />
                {this.state.calendarVisible ?
                <div className="calendar">
                    <span className="back-btn" onClick={()=>(this.setState({calendarVisible:false}))}>返回</span>
                    <Calendar dateCellRender={this.dateCellRender.bind(this)}/>
                </div> :
                <div className="substance">
                    <DatePicker size="small" open={true} showToday={false} style={{float:'left'}}
                                renderExtraFooter={() => <a href="javascript:void(0)" onClick={this.showCalendar.bind(this)} style={{width:'100%',textAlign:'center',display:'block'}}>展示全部</a>}
                                onChange={this.onChange.bind(this)} />
                    <div className="moments">
                        <Textarea onUploading={this.state.onUploading} handlePublish={this.publish.bind(this)} />
                        <Collapse accordion className="moments-list">
                            <Panel header={momentHeader} key="1">
                                {momentList}
                            </Panel>
                            <Panel header={momentHeader} key="2">
                                {momentList}
                            </Panel>
                            <Panel header={momentHeader} key="3">
                                {momentList}
                            </Panel>
                            <Panel header={momentHeader} key="4">
                                {momentList}
                            </Panel>
                        </Collapse>
                    </div>
                    <Card title="我的神器" extra={<Link to="/artifact">More</Link>} bodyStyle={{padding: '10px 10px 0'}} style={{ width:280,position:'absolute',top:0,right:0 }}>
                        {this.state.artifactStatus?
                            <ul className="artifact">
                                <li>
                                    <Link className="kpi" to="/" >
                                        <i /><p>KPI</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="gitlab" to="/" >
                                        <i /><p>gitlab</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="tower" to="/" >
                                        <i /><p>tower</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dandelion" to="/" >
                                        <i /><p>蒲公英</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="bluelake" to="/" >
                                        <i /><p>蓝湖</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="mockingbot" to="/" >
                                        <i /><p>磨刀</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dandelion" to="/" >
                                        <i /><p>蒲公英</p>
                                    </Link>
                                </li>
                            </ul>:
                            <div className="empty-box">
                                <span></span>
                                <p>亲～ 当前没有你的神器，点击“更多” 进行设置</p>
                            </div>
                        }
                    </Card>
                </div>
                }
                <BackTop>
                    <div className="ant-back-top-inner"></div>
                </BackTop>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(Home)
module.exports = exports['default']
