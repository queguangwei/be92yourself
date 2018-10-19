import React from 'react'
import './ImportantNews.scss'

export default class ImportantNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="importantnews">
                <div className="news-title">
                    <i className=""></i>
                    哈哈要闻
                </div>
                <div className="newsphoto">
                    <img src="" />
                    <div className="newstitle">
                        中国舰艇跟踪侦察印隐形战舰?专家:缺乏常识的 误判
                    </div>
                    <div className="newscontent">
                        据“今日印度电视台”网站5日报道，印度军舰与越南海军结束联合军演后 ，遭到中国海军的追踪和监视。不过中国专家5日告诉《环球时报》，这 只是印度媒体缺乏常识的误判。
                    </div>
                </div>
                <div className="nwes-list">
                    <ul>
                        <li>欧足联官方：布冯因与皇马比赛过激抗议被禁赛三场</li>
                        <li>贾静雯一家逛公园被偶遇 咘咘与波妞玩泡泡萌翻</li>
                        <li>欧足联官方：布冯因与皇马比赛过激抗议被禁赛三场</li>
                        <li>马龙的老婆夏露又上热搜了，她才不是一个没故事的女同..</li>
                    </ul>
                </div>
            </div>
        )
    }
}

module.exports = exports['default']
