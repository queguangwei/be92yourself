import React, {Component} from 'react'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import Cookie from '../../utils/Cookie'
import Security from '../../utils/Security'
import {Form, Input, Button, Checkbox, message, notification, Icon} from 'antd'
import './Login.scss'

const FormItem = Form.Item

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      forgetVisible: false,
      codeBtn: {
          className: 'code-btn',
          text: '获取验证码',
          time: 0
      },
      disabled: false,

      passw: '',
      userId: '',
      sid: '',
      userName: '',
      changePassVisible: false,
      loginData: {},

    }
  }

  sendCode() {
      const state = this.state
      const props = this.props.form
      if (state.codeBtn.time != 0) {
          return
      }
      ApiCaller.call(Api.base.sendCode, {
          userName: props.getFieldValue('user')
      }, (res) => {
          if (res.code == 0) {
              const state = this.state
              state.codeBtn.text = '发送成功'
              state.codeBtn.time = 60
              state.codeBtn.className = 'code-btn disable'
              this.setState(state)
              // 倒计时
              this.setSendCodeInter()
          } else {
              notification['error']({
                  key: '登录',
                  message: res.msg,
              });
          }
      })
  }

  setSendCodeInter() {
      const timeHandle = this.timeHandle.bind(this)
      codeInterve = setInterval(() => {
          timeHandle()
      }, 1000)
  }

  timeHandle() {
      const state = this.state
      if (state.codeBtn.time == 0) {
          state.codeBtn.text = '获取验证码'
          state.codeBtn.className = 'code-btn'
          //  清除
          clearInterval(codeInterve)
      } else {
          state.codeBtn.time--
          state.codeBtn.text = '重新获取(' + state.codeBtn.time + ')'
      }
      this.setState(state)
  }

  handleLogin(e) {
    e.preventDefault();
    const state = this.state
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors)
        return
      if (!(/^1\d{10}$/.test(values.phone)))
        return message.error("手机格式不正确")
      if (values.password.length < 8)
        return message.error("密码必须是8-16位")
      this.setState({confirmLoading: true})
      ApiCaller.call(Api.base.login, {
        phone: values.phone,
        password: Security.encryptMd5(values.password)
      }, (res) => {
        this.setState({confirmLoading: false})
        if (res.code == 0) {
          res.data.auth = []
          if (res.data.passModifyStatus === '0') {
            state.userId = res.data.userId
            state.sid = res.data.sid
            state.changePassVisible = true
            this.setState(state)
          } else {
            this.gitInvite(res.data)
          }
        } else if (res.code == 10002) {
          state.passw = Security.encryptMd5(pass)
          state.visible = true
          this.setState(state)
        } else {
          notification['error']({
            key: '登录',
            message: res.message,
          });
        }
      })
    })
  }

  visitor() {
    this.props.visitor()
  }

  render() {
    const {forgetVisible} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login-bg">
        <div className="login-model">
          <div className="login-title">
            <div className="login-subtitle">
              <span className="login-title-font">哈哈世界 —— 点子王</span>
              <span>DIANZIWANG</span>
            </div>
          </div>
          {forgetVisible ?
            <div className="forget-box">
              <Form layout="horizontal" className="input-box">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, whitespace: true, min: 11, max: 11, message: '请输入手机号码'}]
                    })(
                        <Input type='text'
                               prefix={<Icon type="user" style={{fontSize: 15}}/>}
                               placeholder='请输入手机号码'
                               onPressEnter={this.handleLogin.bind(this)}/>
                    )}
                </FormItem>
                <Input type='password' style={{display: 'none'}}/>
                <FormItem>
                    {getFieldDecorator('msgCode', {
                        rules: [{required: true, min: 6, max: 6, message: '请输入6位短信验证码'}]
                    })(
                        <Input type='text' style={{width:218,marginRight:20,verticalAlign:'top'}} prefix={<Icon type="mobile" style={{fontSize: 15}}/>} placeholder='请输入6位短信验证码' maxLength='6' onPressEnter={this.handleLogin.bind(this)}/>
                    )}
                    <Button type="primary" style={{verticalAlign:'top'}} className={this.state.codeBtn.className} onClick={this.sendCode.bind(this)}>{this.state.codeBtn.text}</Button>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('newPass', {
                        rules: [{required: true, min: 8, max: 16, message: '请输入8-16位数字与字母组成的新密码'}]
                    })(
                        <Input type='password' prefix={<Icon type="unlock" style={{fontSize: 15}}/>} placeholder='请输入8-16位数字与字母组成的新密码' autoComplete='new-password' maxLength='16' minLength='8'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('checkPass', {
                        rules: [{required: true, min: 8, max: 16, message: '请再次输入8-16位数字与字母组成的新密码'}]
                    })(
                        <Input type='password' prefix={<Icon type="unlock" style={{fontSize: 15}}/>} placeholder='请再次输入8-16位数字与字母组成的新密码' autoComplete='new-password' maxLength='16' minLength='8'/>
                    )}
                </FormItem>
                <FormItem style={{textAlign:'center'}}>
                  <Button style={{width: 100, height: 40}} type="primary" onClick={this.handleLogin.bind(this)} loading={this.state.confirmLoading}>确认</Button>
                  <Button style={{width: 100, height: 40, marginLeft: 80}} onClick={()=>this.setState({forgetVisible: false})}>返回</Button>
                </FormItem>
              </Form>
            </div> :
            <div className="login-box">
              <Form layout="horizontal" className="input-box">
                <FormItem>
                    {getFieldDecorator('phone', {
                        rules: [{required: true, whitespace: true, min: 11, max: 11, message: '请输入手机号码'}]
                    })(
                        <Input type='text'
                               prefix={<Icon type="user" style={{fontSize: 15}}/>}
                               placeholder='请输入手机号码'
                               onPressEnter={this.handleLogin.bind(this)}/>
                    )}
                </FormItem>
                <Input type='password' style={{display: 'none'}}/>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, min: 8, max: 16, message: '请输入8-16位密码'}]
                    })(
                        <Input type='password' prefix={<Icon type="unlock" style={{fontSize: 15}}/>} placeholder='请输入8-16位密码' maxLength='16' minLength='8' onPressEnter={this.handleLogin.bind(this)}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox style={{fontSize:12}}>保持登录</Checkbox>
                    )}
                  <span style={{cursor:'pointer',color:'#1497FF',float:'right',fontSize:12}} onClick={()=>this.setState({forgetVisible:true})}>忘记密码</span>
                </FormItem>
                <FormItem style={{textAlign:'center'}}>
                  <Button style={{width: 140, height: 40}} type="primary" onClick={this.handleLogin.bind(this)} loading={this.state.confirmLoading}>立即登录</Button>
                  <a className="visitor" onClick={this.visitor.bind(this)}>游客</a>
                </FormItem>
              </Form>
            </div>}
        </div>
      </div>
    )
  }
}

Login = Form.create()(Login)
export default Login
module.exports = exports['default']
