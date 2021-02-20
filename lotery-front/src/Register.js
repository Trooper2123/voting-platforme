import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from "./Login";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({email: newValue})}
                        />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => handleClick()}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

function handleClick(event) {
    let apiBaseUrl = "http://localhost:4000/api/";
    console.log("values", this.state.username, this.state.email);
    //To be done:check for empty values before hitting submit
    let self = this;
    let payload = {
        "username": this.state.username,
        "email": this.state.email
    }
    axios.post(apiBaseUrl + '/register', payload)
        .then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
                //  console.log("registration successfull");
                const loginscreen = [];
                loginscreen.push(<Login parentContext={this}/>);
                let loginmessage = "Not Registered yet.Go to registration";
                self.props.parentContext.setState({
                    loginscreen: loginscreen,
                    loginmessage: loginmessage,
                    buttonLabel: "Register",
                    isLogin: true
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

const style = {
    margin: 15,
};
export default Register;