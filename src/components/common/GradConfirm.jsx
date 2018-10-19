import React from 'react'
import { Modal, Form, Input, Tree } from 'antd'
import './Common.scss'
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

class GradConfirm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalTitle: '操作确认',
            modalWidth: 400,
            closable: false,
            maskClosable: false,
            treeData: [],
            checkedKeys: [],
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

    onCheck (checkedKeys) {
        this.setState({ checkedKeys });
    }
    renderTreeNodes (data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }


    render () {
        const state = this.state
        const props = this.props
        const modalTitle = props.modalTitle ? props.modalTitle : state.modalTitle        //标题
        const modalWidth = props.modalWidth ? props.modalWidth : state.modalWidth        //宽度
        const closable = props.closable ? props.closable : state.closable                //是否显示右上角的关闭按钮
        const maskClosable = props.maskClosable ? props.maskClosable : state.maskClosable
        const { getFieldDecorator } = props.form;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
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
                    <FormItem
                        {...layout}
                        label='分级管理员：'>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入正确格式手机号！'}],
                        })(
                            <Input placeholder='请输入手机号' maxLength='11' />
                        )}
                    </FormItem>
                    <FormItem
                        {...layout}
                        label='管理部门：'>
                        <Tree
                            checkable
                            checkedKeys={this.state.checkedKeys}
                            onCheck={this.onCheck.bind(this)}
                        >
                            {this.renderTreeNodes(this.state.treeData)}
                        </Tree>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
GradConfirm = Form.create()(GradConfirm)

export default GradConfirm
module.exports = exports['default']
