import React from 'react'
import moment from 'moment'
import './RollingNews.scss'

export default class RollingNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noticeList: [],
            noticeTop: 0,
            noticeIndex: 0,
            timer: null,
            ticking: null,
            pause: false
        }
    }

    fetchNoticeList(index) {
        /*ApiCaller.call(Api.user.getNoticeList, {currPage: index, pageSize: 10}, (res) => {
            if (res.code == 0) {
                const state = this.state
                state.noticeList = res.data.list || []
                this.setState(state)
                this.beginNoticeAnimate()
            }
        })*/
        const state = this.state
        state.noticeList = [1,2,3]
        this.setState(state)
        this.beginNoticeAnimate()
    }

    beginNoticeAnimate(dir) {
        dir = dir || 'down'
        const timer = setTimeout(() => {
            if (this.state.pause == false) {
                let noticeIndex = this.state.noticeIndex
                const noticeCount = this.state.noticeList.length
                if (noticeCount == 1) {
                    this.setState({noticeTop: 0})
                } else {
                    if (noticeIndex + 1 == noticeCount) {
                        dir = 'up'
                    }
                    if (noticeIndex - 1 < 0) {
                        dir = 'down'
                    }
                    noticeIndex = dir == 'down' ? noticeIndex + 1 : noticeIndex - 1
                    this.setState({noticeTop: -25 * noticeIndex, noticeIndex})
                }
            }
            this.beginNoticeAnimate(dir)
        }, 3000)
        this.setState({timer: timer})
    }

    ticking() {
        setInterval(() => {
            this.setState({ticking: this.state.ticking+1})
        }, 1000)
    }

    componentDidMount() {
        this.fetchNoticeList(1)
        this.ticking()
    }

    componentWillUnmount() {
        const state = this.state
        if (state.timer) {
            clearTimeout(state.timer)
            state.timer = null
            this.setState(state)
        }
        clearInterval(state.ticking)
    }

    render () {
        const noticeList = this.state.noticeList;
        const now = moment().format("YYYY-MM-D HH:mm:ss");
        return (
            <div className="rollingnews">
                <div className="now-date">
                    <div>{now}</div>
                    <div>这是您加入xxx的第<span style={{margin:'0 5px',color:'#1194FE',fontSize:18,fontWeight:'bold'}}>124</span>天</div>
                </div>
                <div className="notice-list"
                     onMouseOut={() => {this.setState({pause: false})}}
                     onMouseOver={() => {this.setState({pause: true})}}>
                    <ul style={{top: this.state.noticeTop}}>
                        {
                            noticeList.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div className="tip1">
                                            <i ></i>
                                            <span className="title">偷偷告诉你，明天是你亲爱的老郭姐姐的生日</span>
                                        </div>
                                        <div className="tip2">
                                            <i ></i>
                                            <span className="title">今日热议：中国舰艇跟踪侦察印隐形战舰?专…</span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

module.exports = exports['default']
