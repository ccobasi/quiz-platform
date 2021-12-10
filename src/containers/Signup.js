import React from "react";
import {UserOutlined,MailOutlined,LockOutlined} from '@ant-design/icons';
import { Form, Input, Button, Select } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import Cascader from "rc-cascader";

const {Option} = Select;

const RegistrationForm = () => {
  state = {
    confirmDirty: false
  };
  
  const [form] = Form.useForm();
  const userType = [
    {
      value:"student",
      label:"Student",
    },
    {
      value:"teacher",
      label:"Teacher",
    },
  ]

  const onFinish = () => {
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item name="userName" style={{width:"400px"}} rules={[
          {
            required:true,
            message:"Please input your Username",
          },
          ]}>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }}/>}
              placeholder="Username"
            />
        </Form.Item>
        <Form.Item name="email" label="Email" style={{width:"400px"}} rules={[
          {
            type:"email",
            message:"The input is not valid Email",
          },
          {
            required:true,
            message:"Please input your Email",
          },
          ]}>
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }}/>}
              placeholder="Email"
            />
        </Form.Item>
        <Form.Item name="password" label="Password" style={{width:"400px"}} rules={[
          {
            required:true,
            message:"Please input your password",
          },
          ]} hasFeedback>
            <Input.password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }}/>}
              placeholder="password"
            />
        </Form.Item>
        <Form.Item name="confirm" label="Confirm Password" dependencies={["password"]} style={{width:"400px"}} rules={[
          {
            required:true,
            message:"Please confirm your password",
          },
          ({getFieldValue}) => ({
            validator(_,value){
              if(!value || getFieldValue("password") === value){
                return Promise.resolve();
              }
              return Promise.reject("The two passwords that you entered do not match");
            }
            
          })
          ]} hasFeedback>
            <Input.password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }}/>}
              placeholder="password"
            />
        </Form.Item>
        <Form.Item name="userType" label="User Type" style={{width:"250px",marginLeft:"45px"}} >
            <Cascader options={userType} style={{marginLeft:"5px"}}
            />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Signup
          </Button>
          Or
          <NavLink style={{ marginRight: "10px" }} to="/login/">
            login
          </NavLink>
        </Form.Item>
        </Form >
  };
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, is_student) =>
      dispatch(
        actions.authSignup(username, email, password1, password2, is_student)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);