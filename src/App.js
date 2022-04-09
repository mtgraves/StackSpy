import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as ROUTES from './constants/routes';
import StackCalls from './components/StackCalls';
import io from 'socket.io-client';
import { Layout } from 'antd';
const { Content } = Layout;


const server_hostname = 'http://localhost:5000';

let socket = io.connect(server_hostname);

class App extends React.Component {

  state = {
    server_hostname: server_hostname,
    stack_call_list: [],
    current_message: undefined,
    app_name: "StackSpy"
  }

  componentDidMount() {
   this.getMessages();
  }

  getMessages = () => {
    socket.on("message", msg => {
      let new_stack_list = [...this.state.stack_call_list];
     
      msg = JSON.parse(msg);
      // set a key for the antd table
      msg['key'] = msg['uuid'];

      new_stack_list.push(msg);
      console.log(msg);
      this.setState({
        stack_call_list: new_stack_list,
      })
    })
  }

  render() {
    return (
      <Layout style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navigation
          app_name={this.state.app_name}
          server_hostname={this.state.server_hostname}
        />
        <Content style={{ flex: "1", background: "#fff" }}>
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={<StackCalls
                server_hostname={this.state.server_hostname}
                stack_call_list = {this.state.stack_call_list}
              />}
            />
          </Routes>
        </Content>
      </Layout>
    );
  }
}

export default App;