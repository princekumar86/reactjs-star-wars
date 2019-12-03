import React, { Component } from 'react';
import { Container, Row, Col, Button, Nav, Modal, Alert} from 'react-bootstrap';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            authenticatedLoggedUser : "",
            searchKeyword : "",
            planets : [],
            show : false,
            planetDetail: {},
            apiFetchRequestCounter: 0,
            maxRequestPerUser: 15,
            timer: ""
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleMoreInfo = this.handleMoreInfo.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.timer = setInterval(() => {
            this.setState({
                apiFetchRequestCounter: 0
            });
            console.log(`timer reset done after 1 minute, ${this.state.apiFetchRequestCounter}`);
        }, 60000);

    }
    componentDidMount() {
        if (localStorage.getItem("authenticatedUser") === null) {
            this.props.history.push("/");
        } else {
            this.setState({
                authenticatedLoggedUser:localStorage.getItem("authenticatedUser")
            });
        }
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    handleLogout(){
        localStorage.removeItem("authenticatedUser");
        this.props.history.push("/");
    }
    
    handleSearch(e){
        this.setState({
            searchKeyword : e.target.value,
            apiFetchRequestCounter : this.state.apiFetchRequestCounter + 1
        });
        console.log(e.target.value);
        if(this.state.apiFetchRequestCounter<=15) {
            if(e.target.value.length >=1 ) {
                fetch(`https://swapi.co/api/planets/?search=${e.target.value}`)
                .then(response => response.json())
                .then( data => {    
                        console.log(data);
                        this.setState({
                            planets : data.results
                        });
                        console.log(this.state.planets);
                    }
                )
                .catch(error => this.setState({ error}));
            }
        } else {
            console.log('you have exceeded the limit, please try after 1 min gap, max allowed 15 api calls per min');
        }
    }
    handleMoreInfo(url){
        console.log(`handle planet more info function ${url}`);
        if(url.length >=10 ) {
            fetch(`${url}`)
            .then(response => response.json())
            .then( data => {    
                    console.log(data);
                    this.setState({
                        planetDetail : data
                    });
                }
            )
            .catch(error => this.setState({ error}));
        }
        this.setState({
            show: true
        });
    }
    handleClose(){
        this.setState({
            show: false,
            planetDetail: {}
        });
    }
    render() {
        return (
            <div>
                <Nav className="navbar navbar-light bg-light">
                    Star Wars > 
                    {" Logged in as :" + this.state.authenticatedLoggedUser}
                <ul className="nav navbar-nav navbar-right">
                    <li><button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleLogout}>Logout</button></li>
                </ul>
                </Nav>
                <Container>
                    <Row>
                        <Col md="10">
                            <input type="text" 
                                placeholder="Search a planet..." 
                                className="searchinput"
                                value={this.state.searchKeyword}
                                onChange={this.handleSearch}
                            />
                        </Col>
                        <Col>
                            <Button>Search</Button>
                        </Col>
                    </Row>
                    <div className="search-results">
                    {   this.state.apiFetchRequestCounter>15 && <Alert variant="danger">
                                    You have exceeded the per min limit for searching, please try after 1 min gap
                                </Alert>
                                }
                        Search results...<br/>
                        {
                            this.state.planets.map( planet => (
                                        
                                <div key={planet.name} className="card card-body">
                                    
                                    <span className="symboliccircle" 
                                    style={{width:planet.diameter/100|25, height:planet.diameter/100|25}}>
                                    </span>
                                    <span className="card-content">
                                        Planet <h4 className="card-title">{planet.name}</h4>
                                        <p className="card-text">
                                            Climate: {planet.climate}<br/>
                                            Diameter: {planet.diameter}<br/>
                                            Population: {planet.population}<br/>
                                            Terrain: {planet.terrain}<br/>
                                        </p>
                                        <Button href="#" className="btn btn-info" 
                                            onClick={this.handleMoreInfo.bind(this, planet.url)}>More</Button>
                                    </span>
                                </div>

                            )
                                
                            )
                        }

                    </div>
                </Container>

                <Modal show={this.state.show}>
                <Modal.Header>
                    <Modal.Title>{this.state.planetDetail.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Climate: {this.state.planetDetail.climate}</p>
                    <p>Population: {this.state.planetDetail.population}</p>
                    <p>Diameter: {this.state.planetDetail.diameter}</p>
                    <p>Terrain: {this.state.planetDetail.terrain}</p>
                    <p>Rotation period: {this.state.planetDetail.rotation_period}</p>
                    <p>Orbital period: {this.state.planetDetail.orbital_period}</p>
                    <p>Gravity: {this.state.planetDetail.gravity}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>OK</Button>
                </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default Search;
