import React from 'react'
import { Modal, Form, Input, Radio, Checkbox, Select, DatePicker } from 'antd'
import './Common.scss'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

class PmConfirm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalTitle: '操作确认',
            modalWidth: 400,
            closable: false,
            maskClosable: false,
            departmentList: [],
            birthday: ''
        }
    }

    nameChange() {

    }

    checkChange(e) {
        console.log(e.target.checked);
    }

    realnameChange(value) {
        const state = this.state;
        state.mData.realname = value;
        this.setState(state)
    }

    handleSelChange(item, value) {

        const state = this.state;
        state.mData[item] = value;
        this.setState(state);
    }

    birthdayChange(date, dateString) {
        const state = this.state;
        state.birthday = dateString;
        this.setState(state)
    }

    dateChange(date, dateString) {
        const state = this.state;
        state.date = dateString;
        this.setState(state)
    }

    handleOk(e) {
        e.preventDefault()
        if(this.props.modalType == 'addDepartment' || this.props.modalType == 'editDepartment') {
            console.log(1)
        }else if(this.props.modalType == 'addJobTitle') {
            console.log(2)
        }else {
            this.props.form.validateFieldsAndScroll((errors, values)=>{
                if(errors) {
                    return
                }
                let state = this.state
                let params ={}
                params = values
                params.birthday = state.birthday
                params.date = state.date
                console.log(params)
                this.props.handleOk(params)

            })
        }
    }

    bandleCancel() {
        this.props.form.setFieldsValue({
            realname: '',
            sex: '',
            phone: '',
            date: ''
        });
        this.props.cancelModal()
    }


    render () {
        const departmentLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const jobtitleLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 15 },
        };
        const memberLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        };
        const state = this.state
        const props = this.props
        const modalTitle = props.modalTitle ? props.modalTitle : state.modalTitle        //标题
        const modalWidth = props.modalWidth ? props.modalWidth : state.modalWidth        //宽度
        const closable = props.closable ? props.closable : state.closable                //是否显示右上角的关闭按钮
        const maskClosable = props.maskClosable ? props.maskClosable : state.maskClosable
        const { getFieldDecorator } = props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );
        const departmentOptions = state.departmentList.map(item =>
            <Option key={item.userId.toString()}
                    value={JSON.stringify(item)}>{item.displayName}
            </Option>
        );
        return (
            <Modal
                className="modal-class"
                visible={props.visible }
                title={modalTitle}
                width={modalWidth}
                closable={closable}
                maskClosable={maskClosable}
                onOk={this.handleOk.bind(this)}
                onCancel={this.bandleCancel.bind(this)}
                confirmLoading={props.btnLoading}
            >
                {(props.modalType == 'addMember' || props.modalType == 'editMember') ?
                    <Form>
                        <FormItem
                            {...memberLayout}
                            label='姓名：'>
                            {getFieldDecorator('realname', {
                                rules: [{ required: true, message: '请输入员工真实姓名！' }],
                            })(
                                <Input type='text' placeholder='请输入真实姓名' />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='性别：'>
                            {getFieldDecorator('sex', {
                                rules: [{ required: true, message: '请选择员工性别！'}],
                            })(
                                <RadioGroup>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='生日：'>
                            {getFieldDecorator('birthday', {
                                rules: [{ required: true,  message: '请选择员工生日！'}],
                            })(
                                <DatePicker onChange={this.birthdayChange.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='手机号：'>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入正确格式手机号！'}],
                            })(
                                <Input addonBefore={prefixSelector} placeholder='请输入手机号' maxLength='11' />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='邮箱：'>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '请输入正确格式邮箱！'}],
                            })(
                                <Input placeholder='请输入邮箱' />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='部门：'>
                            {getFieldDecorator('department', {
                                rules: [{ required: false, message: '请选择部门！'}],
                            })(
                                <Select
                                    value={state.department}
                                    showSearch
                                    placeholder="请选择部门"
                                    optionFilterProp="children"
                                    onChange={this.handleSelChange.bind(this, 'department')}
                                >
                                    {departmentOptions}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='职位：'>
                            {getFieldDecorator('job', {
                                rules: [{ required: true, message: '请输入职位！'}],
                            })(
                                <Input type='text' placeholder='请输入职位名称（15字内）' maxLength='15' />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='入职时间：'>
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: '请选择入职时间！'}],
                            })(
                                <DatePicker onChange={this.dateChange.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='工号：'>
                            {getFieldDecorator('number', {
                                rules: [{ required: false, message: '请选择工号！'}],
                            })(
                                <Input placeholder='请输入员工工号' />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='民族：'>
                            {getFieldDecorator('number', {
                                rules: [{ required: false, message: '请选择工号！'}],
                            })(
                                <Input placeholder='请输入员工工号' />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='政治面貌：'>
                            {getFieldDecorator('number', {
                                rules: [{ required: false, message: '请选择工号！'}],
                            })(
                                <Input placeholder='请输入员工工号' />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='学历：'>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入正确格式手机号！'}],
                            })(
                                <Input placeholder='请输入手机号' maxLength='11' />
                            )}
                        </FormItem>
                        <FormItem
                            {...memberLayout}
                            label='个人简介：'>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入正确格式手机号！'}],
                            })(
                                <TextArea placeholder='请输入简介（50字内）' rows='4' style={{resize:'none'}}/>
                            )}
                        </FormItem>
                        {props.modalType == 'addMember'?<div>
                            <FormItem
                                {...memberLayout}
                                label='登录密码：'>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入登录密码！'}],
                                })(
                                    <Input placeholder='请输入登录密码' />
                                )}
                            </FormItem>
                            <FormItem
                                {...memberLayout}
                                label='确认密码：'>
                                {getFieldDecorator('confirmpass', {
                                    rules: [{ required: true, message: '请再次输入登录密码！'}],
                                })(
                                    <Input placeholder='请再次输入登录密码' />
                                )}
                            </FormItem>
                        </div>:null}
                    </Form> : <Form>
                        <FormItem
                            {...departmentLayout}
                            label='部门名称：'>
                            <Input type='text' placeholder='请输入部门名称（15字内）' value={state.name} maxLength='15' onChange={this.nameChange.bind(this)} />
                        </FormItem>
                        <FormItem
                            {...departmentLayout}
                            label='部门描述：'>
                            <TextArea placeholder='请输入部门描述（50字内）' rows={4} style={{resize:'none'}} value={state.name} maxLength='50' onChange={this.nameChange.bind(this)} />
                        </FormItem>
                    </Form>
                }
            </Modal>
        )
    }
}
PmConfirm = Form.create()(PmConfirm)

export default PmConfirm
module.exports = exports['default']
