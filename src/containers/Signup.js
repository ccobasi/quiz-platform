// import React from "react";
// import {
//   Button,
//   Form,
//   Grid,
//   Header,
//   Message,
//   Segment, 
//   Select,
//   Option
// } from "semantic-ui-react";
// import { connect } from "react-redux";
// import { NavLink, Redirect } from "react-router-dom";
// import { authSignup } from "../store/actions/auth";

// class RegistrationForm extends React.Component {
//   state = {
//     username: "",
//     email: "",
//     password1: "",
//     password2: ""
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     let is_student = false;
//     // if (value.userType === "student") is_student = true;
//     const { username, email, password1, password2 } = this.state;
//     this.props.signup(username, email, password1, password2);
//   };

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   render() {
//     const { username, email, password1, password2 } = this.state;
//     const { error, loading, token } = this.props;
//     if (token) {
//       return <Redirect to="/" />;
//     }
//     return (
//       <Grid
//         textAlign="center"
//         style={{ height: "100vh" }}
//         verticalAlign="middle"
//       >
//         <Grid.Column style={{ maxWidth: 450 }}>
//           <Header as="h2" color="teal" textAlign="center">
//             Signup to your account
//           </Header>
//           {error && <p>{this.props.error.message}</p>}

//           <React.Fragment>
//             <Form size="large" onSubmit={this.handleSubmit}>
//               <Segment stacked>
//                 <Form.Input
//                   onChange={this.handleChange}
//                   value={username}
//                   name="username"
//                   fluid
//                   icon="user"
//                   iconPosition="left"
//                   placeholder="Username"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   value={email}
//                   name="email"
//                   fluid
//                   icon="mail"
//                   iconPosition="left"
//                   placeholder="E-mail address"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   fluid
//                   value={password1}
//                   name="password1"
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="Password"
//                   type="password"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   fluid
//                   value={password2}
//                   name="password2"
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="Confirm password"
//                   type="password"
//                 />
          
//               <FormItem>
//                 {getFieldDecorator("userType", {
//                   rules: [
//                     {
//                       required: true,
//                       message: "Please select user!"
//                     }
//                   ]
//                 })(
//                   <Select placeholder="Select user type"> 
//                   <Option value="student">Student</Option>
//                   <Option value="teacher">Teacher</Option>
//                 </Select>
//                 )}
                
//                </FormItem>

//                 <Button
//                   color="teal"
//                   fluid
//                   size="large"
//                   loading={loading}
//                   disabled={loading}
//                 >
//                   Signup
//                 </Button>
//               </Segment>
//             </Form>
//             <Message>
//               Already have an account? <NavLink to="/login">Login</NavLink>
//             </Message>
//           </React.Fragment>
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error,
//     token: state.auth.token
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     signup: (username, email, password1, password2) =>
//       dispatch(authSignup(username, email, password1, password2))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RegistrationForm);
import React from "react";
import { Form, Input, Icon, Button, Select } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        if (values.userType === "student") is_student = true;
        this.props.onAuth(
          values.userName,
          values.email,
          values.password,
          values.confirm,
          is_student
        );
        // this.props.history.push("/");
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("userType", {
            rules: [
              {
                required: true,
                message: "Please select a user!"
              }
            ]
          })(
            <Select placeholder="Select a user type">
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
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
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

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
)(WrappedRegistrationForm);