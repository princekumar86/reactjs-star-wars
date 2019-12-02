import React, { Component } from 'react';
import star_wars_logo from '../Assets/star_wars_logo.svg';
import { Container, Row, Col, Button, Alert} from 'react-bootstrap';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username : "",
            password: "",
            user: {},
            error : {},
            wrongCredentialsWarning : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    handleChange(e){
        this.setState({
            [e.target.id] : e.target.value,
             wrongCredentialsWarning : false
        });
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.username.length >=2 && this.state.password.length >=2) {
            fetch(`https://swapi.co/api/people/?search=${this.state.username}`)
            .then(response => response.json())
            .then( data => {    
                    console.log(data);
                    if(data.count >= 1 && 
                        data.results[0].name === this.state.username && 
                        data.results[0].birth_year === this.state.password ) {
                        this.setState({
                            user: data.results[0]
                        })
                    localStorage.setItem("authenticatedUser",data.results[0].name);
                    this.props.history.push("/search");
                    } else {
                        this.setState({wrongCredentialsWarning : true});
                    }
                }
            ).catch(error => this.setState({ error}));
        }
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className="login-advertisement">
                            <img src={star_wars_logo} alt="logo" />
                        </Col>
                        <Col className="login-block">
                            Login to search planets <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" className="form-control" 
                                        id="username" value={this.state.username} 
                                        onChange={this.handleChange}>
                                    </input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" 
                                        id="password" value={this.state.password}
                                        onChange={this.handleChange}>
                                </input>
                                </div>
                                 
                                <Button type="submit">Login</Button>
                            </form>
                              {   this.state.wrongCredentialsWarning && <Alert variant="danger">
                                    Wrong credentials, Please enter correct username and password to login
                                </Alert>
                                }
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Login;
