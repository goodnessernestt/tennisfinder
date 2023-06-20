import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Map from './Map';
import Signup from "./SignUp";
import { Switch, Route } from 'react-router-dom';

  
export default class Tennis extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            tennisName: "",
            authenticated: false,
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({ authenticated: true });
            } else {
              this.setState({ authenticated: false });
            }
          });
        let tennisId = window.location.href.split("/").pop()
        let selectedTennis = tennisData.filter(t => t.id === tennisId)[0]
        this.setState({tennisName: selectedTennis.name})
    }

    render() {
        return (
            <div>
              <Switch>
                <Route
                  path="/"
                  element={this.state.authenticated ? <Map /> : <Route to="/signin" />}
                />
                <Route path="/signUp" element={<Signup />} />
              </Switch>
            </div>
          );
        }
}
let tennisData = [
    {
        id: "1",
        name: "Rolls-Royce Tennis Club",
        latitude: 52.892076733383405,
        longitude: -1.4637906865669459
    },  

    {
        id: "2",
        name: "Derbyshire Tennis Centre",
        latitude: 52.90524364434027,
        longitude: -1.486565219373306
    },  

    {
        id: "3",
        name: "CURC TENNIS CLUB" ,
        latitude: 52.90581573001509,
        longitude: -1.500253088860739
    },  
    
    {
        id: "4",
        name: "Littleover Tennis Club" , 
        latitude: 52.91223433853976,
        longitude: -1.5043729616405646
    },  

    {
        id: "5",
        name: "Derby Community Table Tennis Club",
        latitude: 52.91309690889294,
        longitude: -1.4720489707139295
    },  

    {
        id: "6",
        name: "Ockbrook & Borrowash Lawn Tennis Club", 
        latitude: 52.9105958158651,
        longitude: -1.3789555025189832
    }, 
    {
        id: "7",
        name: "Alvaston park tennis court", 
        latitude: 52.9121703438316,
        longitude: -1.442890243713539
    }, 
    {
        id: "8",
        name: "Woodlands Tennis Club", 
        latitude: 52.948601786185236,
        longitude: -1.5033098853109428
    }, 
    
]
