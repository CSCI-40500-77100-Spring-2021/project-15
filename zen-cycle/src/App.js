import React, { Component } from "react";
import './App.css';
import GoogleMap from './components/GoogleMap';
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Feed from './pages/Feed'
import About from './pages/About'
// import Map from './map/Map'
class App extends Component {
    // constructor to initialize the default state
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    // fetch data from the api
    callAPI() {
        fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
        .catch(err => err);
    }
    // use React's lifecycle method to call `callAPI()` after the component
    // mounts
    componentDidMount() {
        this.callAPI();
    }
    // display a header and paragrap with the text retrieved from the API
    render() {
        return (
            <div>
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route path='/' exact component={GoogleMap}/>
                        {/* <Route path='/feed' component={Feed}/> */}
                        <Route path='/about' component={About}/>
                    </Switch>
                </Router>
                
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;