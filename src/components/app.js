import React, { Component } from 'react';

import 'antd/dist/antd.css';  // Add
import { Layout, Card } from 'antd';
import EchartsInfo from './echartsInfo.js';
import AddInfo from './addInfo.js'
const {  Content, Sider } = Layout;

class App extends Component {
  constructor() {
    super()
    this.state = {
      echartsoption: {
        ifAdd: false,
        selectName: '',
        selectIndex: -1,
        newcategory: -1,
        newname: ''
      }
    }
  }
  handleAdd(sindex, sname, scategory, name, category) {
    this.setState({
      echartsoption: {
        ifAdd: true,
        selectIndex: sindex,
        selectName: sname,
        newcategory: category,
        newname: name,
      },
    })
  }

  render() {
    return (
        <Layout style={{ padding: '10px 0', background: '#fff' }}>
          <Sider width={700} style={{ background: '#fff', paddingLeft: '15px', paddingTop: '30px' }}>
            <Card>
              <EchartsInfo eventsOption={this.state.echartsoption}></EchartsInfo>
            </Card>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <AddInfo handleAdd={this.handleAdd.bind(this)}></AddInfo>
          </Content>
      </Layout>
    );
  }
}

export default App;
