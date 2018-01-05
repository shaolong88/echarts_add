import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';  // Add
import { Form, Input, Button, Card } from 'antd';

const FormItem = Form.Item;


class AddInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      echartsoption: {
        selectName: '',
        selectIndex: -1,
        ifAdd: false,
        selectcategory: -1,
        newname:''
      }
  }
}
  changename(e) {
    this.setState({
      newname: e.target.value
    });
  }
  changecategory(e) {
    this.setState({
      newcategory: +e.target.value
    });
  }
  handleClick() {
    const { EchartsIndexName } = this.props;
    this.props.handleAdd(EchartsIndexName.index,EchartsIndexName.name,EchartsIndexName.category,this.state.newname,this.state.category);
  }

  render() {
    return (
        <Card style={{ height: '750px', marginTop: '30px' }}>
            <Form style={{ paddingTop: '10px' }}>
              <FormItem
                label="知识点名称"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                hasFeedback
              >
                <Input onChange={this.changename.bind(this)} />
              </FormItem>
              <FormItem
                label="知识点类别"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                hasFeedback
              >
              <span><Input onChange={this.changecategory.bind(this)} />请输入0-9以内的数字</span>
              </FormItem>
              <FormItem>
                <Button type="primary" style={{ marginLeft: "100px" }} onClick={this.handleClick.bind(this)}>确定</Button>
              </FormItem>
            </Form>
        </Card>
      
    );
  }
}
AddInfo = Form.create()(AddInfo);

function mapStateToProps(state) {
  return {
    EchartsIndexName: state.reducer_echarts.EchartsIndexName
  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddInfo);