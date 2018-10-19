import React from 'react'
import { Modal, Form, Input } from 'antd'
import './Common.scss'
const { TextArea } = Input
const FormItem = Form.Item;

class CommonConfirm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalTitle: '操作确认',
            modalWidth: 400,
            closable: false,
            maskClosable: false,
        }
    }

    handleOk(e) {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((errors, values)=>{
            if(errors) {
                return
            }
            this.props.handleOk(values)

        })
    }

    bandleCancel() {
        this.props.form.setFieldsValue({
            reason: '',
        });
        this.props.cancelModal()
    }


    render () {
        const state = this.state
        const props = this.props
        const modalTitle = props.modalTitle ? props.modalTitle : state.modalTitle        //标题
        const modalWidth = props.modalWidth ? props.modalWidth : state.modalWidth        //宽度
        const closable = props.closable ? props.closable : state.closable                //是否显示右上角的关闭按钮
        const maskClosable = props.maskClosable ? props.maskClosable : state.maskClosable
        const { getFieldDecorator } = props.form;
        return (
            <Modal
                className="modal-class"
                visible={props.visible}
                title={modalTitle}
                width={modalWidth}
                closable={closable}
                maskClosable={maskClosable}
                onOk={this.handleOk.bind(this)}
                onCancel={this.bandleCancel.bind(this)}
                confirmLoading={props.btnLoading}
            >
                <Form>
                    <FormItem>
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请告诉我哪里做的不好哦！' }],
                        })(
                            <TextArea rows={4} style={{resize:'none'}} maxLength={25} placeholder="不超过25个字"/>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}
CommonConfirm = Form.create()(CommonConfirm)

export default CommonConfirm
module.exports = exports['default']
