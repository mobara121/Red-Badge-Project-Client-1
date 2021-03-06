import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import APIURL from "../../helpers/environment";
type acceptedProps = {
  token: any;
  updateUsername: any;
  updateMessage: any;
  updateUserRole: any;
};

type valueType = {
  username: string;
  setUsername: string;
  password: string;
  setPassword: string;
};

export default class Login extends React.Component<acceptedProps, valueType> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      username: "",
      setUsername: "",
      password: "",
      setPassword: "",
    };
  }

  handleSubmit = (event: any) => {
    console.log(this.state.username, this.state.password);
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: new Headers({
        "content-type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.token(data.sessionToken);
        this.props.updateUsername(data.user.username);
        this.props.updateMessage(data.message);
        this.props.updateUserRole(data.user.userRole);
        console.log(data.username, data.userRole);
      });
  };
  render() {
    return (
      <div>
        <h1 className="auth-header">Login</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="username" id="username">
              Username
            </Label>
            <Input
              id="auth-input"
              onChange={(e) => this.setState({ username: e.target.value })}
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password" id="password">
              Password
            </Label>
            <Input
              id="auth-input"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </FormGroup>
          <button type="submit">Login</button>
        </Form>
      </div>
    );
  }
}
