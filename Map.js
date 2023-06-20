import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GoogleMapReact from 'google-map-react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './styles.css';
import { FormControl, Select, MenuItem, Menu } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import { useAuth } from './AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { Form, Card, Alert } from "react-bootstrap";








export default class Map extends React.Component {

    constructor(props) {
        super();
        this.state = {
            latitude: 24.99835602,
            longitude: 46.01502627,
            tennis: [],
            selectTennisId: null,
            markerClicked: false,
            searchText: "",
            distance: 40,
            amenities: [],
            courtType: "",
            filteredCourts: [], 
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        };
    

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    tennis: tennisData,
                })
            },
            (error) => {
                console.log("Error Getting Location: " + error.message)
            }
        )
    }

    header = () =>{
        const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
            const earthRadiusKm = 6371;
              
                const degToRad = (deg) => {
                  return deg * (Math.PI / 180);
                };
              
                const dLat = degToRad(lat2 - lat1);
                const dLon = degToRad(lon2 - lon1);
              
                const a =
                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(degToRad(lat1)) *
                    Math.cos(degToRad(lat2)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
              
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = earthRadiusKm * c;
              
                return distance;
              };

        const handleSearch = () => {
            let filteredTennisCourts = this.state.tennis.filter(
                t =>
                t.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                &&
                (getDistanceFromLatLonInKm(
                    this.state.latitude,
                    this.state.longitude,
                    t.latitude, t.longitude) < this.state.distance) &&
                    (this.state.amenities === "" || (t.amenities && t.amenities.includes(this.state.amenities))) &&
                    (this.state.courtType === "" || (t.courtType && t.courtType.includes(this.state.courtType))) 
                );
            this.setState({
                filteredCourts: filteredTennisCourts
            })
        }

        const resetAll = () => {
            this.setState({
                tennis: tennisData,
                distance: 40,
                searchText: "",
                amenities: "", 
                courtType: "", 
            })
        }

        return (
            
            <div 
            style={{
                backgroundColor: "pink",
                marginBottom: 10 ,
                }}>
                        <Typography variant='h4'
                            style={{ 
                                textAlign: "center", 
                                color: "white",
                                marginTop: "30px", 
                                marginBottom: "10px"
                            }}>
                        <span>TENNIS</span> <span>COURT</span> <span>FINDER</span>
                        </Typography>
                        <div>
                        <TextField 
                            placeholder="Search for a Tennis Court near you..."
                            ref={search => this.search = search}
                            inputProps={{ style: { borderRadius: '20px 0 0 20px' } }}
                            value={this.state.searchText}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: '10px', backgroundColor: "#ffe9ec" }}
                            onChange={(event) => this.setState({ searchText: event.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => this.setState({ searchText: "" })}>
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        </div>

                        <div style={{ 
                            backgroundColor: "pink", 
                            marginTop: "10px", 
                            display: "flex", 
                            justifyContent: "space-around"}}>

                        <div style={{ textAlign: "center" }}>
                        <Typography>Amenities</Typography>
                        <FormControl style={{ 
                            marginBottom: "10px", 
                            backgroundColor: "#ffe9ec"
                            }}>
                        <Select
                            value={this.state.amenities}
                            onChange={(event) => {
                                this.setState({ amenities: event.target.value });
                        }}
                        variant="outlined"
                        renderValue={(selected) => (
                            <div>
                              {selected}
                              {selected && (
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    this.setState({ amenities: "" });
                                  }}
                                  style={{ marginLeft: "5px", verticalAlign: "middle" }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              )}
                            </div>
                          )}
                        >
                        <MenuItem value="floodlit courts">Floodlit Courts</MenuItem>
                        <MenuItem value="relaxing surroundings">Relaxing Surroundings</MenuItem>
                        <MenuItem value="social event">Social Event</MenuItem>
                        </Select>
                    </FormControl>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Typography>Court Type</Typography>
                            <FormControl style={{ 
                                marginBottom: "10px", 
                                backgroundColor: "#ffe9ec"
                                }}>
                            <Select
                                value={this.state.courtType}
                                onChange={(event) => {
                                    this.setState({ courtType: event.target.value });
                            }}
                            variant="outlined"
                            renderValue={(selected) => (
                                <div>
                                  {selected}
                                  {selected && (
                                    <IconButton
                                      size="small"
                                      onClick={() => {
                                        this.setState({ courtType: "" });
                                      }}
                                      style={{ marginLeft: "5px", verticalAlign: "middle" }}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  )}
                                </div>
                              )}
                            >
                            <MenuItem value="grass court">Grass Court</MenuItem>
                            <MenuItem value="hard court">Hard Court</MenuItem>
                            <MenuItem value="clay court">Clay Court</MenuItem>

                            </Select>
                        </FormControl>
                        </div>
                        </div>  
                        <div 
                        style={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent:"center", 
                            alignItems: "center"}} >
                            <Typography variant="h6"style={{ textAlign: "center", color: "white" }}>
                                Distance: {this.state.distance} km
                            </Typography>
                            <Slider style={{ 
                                width: "100%", 
                                "& .MuiSlider-rail": {backgroundColor: "#ff6a80 !important",},
                                "& .MuiSlider-thumb": {color: "#ff6a80 !important",},
                                "& .MuiSlider-valueLabel": {backgroundColor: "#ff6a80 !important", color: "#fff !important",  
                                }}}
                                color="secondary"
                                value={this.state.distance}
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={50}
                                onChange={(event, value) => {this.setState({distance: value})}} 
                            />
                        </div>
                        
                        <div 
                        style={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            margin: "0 auto",
                            width: "75%" }}>
                            <Button 
                                variant="outlined"
                                onClick={resetAll}
                                style={{ 
                                    width: "65%", 
                                    height: "50px", 
                                    borderRadius: "20px", 
                                    color: "white", 
                                    borderColor: "#ff6a80",
                                    fontSize: "18px" 
                                }}>
                                <RestartAltIcon />
                                Reset
                                </Button>
                            <Button
                                variant="contained"
                                onClick={handleSearch}
                                style={{ 
                                    width: "65%", 
                                    height: "50px",
                                    borderRadius: "50px",
                                    backgroundColor: "#ff6a80",
                                    fontSize: "18px"
                                }}>
                                <SearchIcon />
                                Search
                                </Button>
                        </div>
                    </div>

        )
    }
    
    map = () => {

        const clickedOutside = (x, y, lat, lng, event) => {
            if (this.state.markerClicked == true) {
                this.setState({
                    selectedTennisId: null,
                    markerClicked: false
                })
            }
            else {
                console.log("You Clicked on the map")
            }
        }
        const handletennisClick = (tennis) => {
            const selectedTennis = tennisData.find((t) => t.id === tennis.id);
            if (selectedTennis) {
                window.location.href = selectedTennis.website;
            }
        }
        return (
            <div style={{ height: "80vh" }}>
                <GoogleMapReact
                    onClick={() => {this.setState({ selectedTennisId: null }) }}
                    bootstrapURLKeys={{ key: "AIzaSyD7ZJXiGTq1uzSUmYOiLaxa2DMRZjzWKEE" }}
                    defaultCenter={{
                        lat: 10.99835602,
                        lng: 77.01502627
                    }}
                    defaultZoom={14}
                    center={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                    }}
            >
                    {
                        this.state.filteredCourts.map((tennis) => {
                            return (
                                <LocationOnIcon color={"secondary"}
                                    lat={tennis.latitude}
                                    lng= {tennis.longitude}
                                    text={tennis.name}
                                    onClick={() => {
                                        this.setState({ selectedTennisId: tennis.id, markerClicked: true });
                                        handletennisClick(tennis);
                                    }}
                                />
                            );
                        })
                    }
                    {
                        this.state.filteredCourts.map((tennis) => {
                            if(this.state.selectedTennisId === tennis.id && this.state.markerClicked) {
                                return (
                                    <div 
                                        lat={tennis.latitude}
                                        lng= {tennis.longitude}
                                        onClick={() => {handletennisClick(tennis)}}
                                        style={{ position: "relative", top: "25px" }}
                                    >
                                        <Typography>
                                            {tennis.name}
                                        </Typography>
                                        <Typography>
                                            Amenities: {tennis.amenities.join(", ")}
                                        </Typography>
                                    </div>
                                )  
                            }
                            else {
                                return null
                            }
                        })
                    }

                <MyLocationIcon color={"primary"}
                    lat={this.state.latitude}
                    lng= {this.state.longitude}
                />
        
            </GoogleMapReact>
                            </div>
                    
                )
            }

    render() {
        return (
            <div style={{ backgroundColor: "pink"}}>
                <Dashboard />
                {this.header()}
                {this.map()}
            </div>
            
        )
    }
}
let tennisData = [
    {
        id: "1",
        name: "Rolls-Royce Tennis Club",
        courtType: ["grass court", "hard court"],
        amenities: ["social event"],
        latitude: 52.892076733383405,
        longitude: -1.4637906865669459,
        website: "https://rrtennis.co.uk/"
    },  

    {
        id: "2",
        name: "Derbyshire Tennis Centre",
        courtType: ["hard court"],
        amenities: ["floodlit courts"],
        latitude: 52.90524364434027,
        longitude: -1.486565219373306,
        website: "https://www.derbyshiretenniscentre.co.uk/"
    },  

    {
        id: "3",
        name: "CURC TENNIS CLUB" ,
        courtType: ["grass court"],
        amenities: ["relaxing surroundings"],
        latitude: 52.90581573001509,
        longitude: -1.500253088860739,
        website: "https://clubspark.lta.org.uk/CURCTennisClub"
    },  
    
    {
        id: "4",
        name: "Littleover Tennis Club",
        courtType: ["hard court"], 
        latitude: 52.91223433853976,
        longitude: -1.5043729616405646,
        website: "https://clubspark.lta.org.uk/LittleoverTennisClub"
    },  

    {
        id: "5",
        name: "Ockbrook & Borrowash Lawn Tennis Club", 
        courtType: ["grass court"],
        latitude: 52.9105958158651,
        longitude: -1.3789555025189832,
        website:"https://www.obtc.uk/"
    }, 
    {
        id: "6",
        name: "Alvaston park tennis court", 
        courtType: ["clay court"],
        latitude: 52.9121703438316,
        longitude: -1.442890243713539,
        website:"https://clubspark.lta.org.uk/AlvastonPark"
    }, 
    {
        id: "7",
        name: "Woodlands Tennis Club", 
        courtType: ["grass court", "clay court"],
        amenities: ["floodlit courts"],
        latitude: 52.948601786185236,
        longitude: -1.5033098853109428,
        website:"https://clubspark.lta.org.uk/woodlandstennisclub"
    }, 
    
]

function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    
  
    const handleLogout = async () => {
      setError("");
  
      try {
        await logout();
        history.push("/login");
      } catch {
        setError("Failed to log out");
      }
    };
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Avatar onClick={handleMenuOpen} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Typography variant="body1">{currentUser.email}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: 1 }} />
              <Typography variant="body1">Logout</Typography>
            </MenuItem>
          </Menu>
        </div>
      );
    }
    

