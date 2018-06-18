import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "0dabe35d6c1cc81769fe3138eafec2f6";

class App extends React.Component{
  /* The word “async” before a function means one simple thing: a function always returns a promise. If the code has return <non-promise> in it, then JavaScript automatically wraps it into a resolved promise with that value.  */
  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }
 getWeather = async (e) => {
    e.preventDefault();
    const city    = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    //The keyword await makes JavaScript wait until that promise settles and returns its result.
    const data = await api_call.json();
   
   if(city && country){
     // console.log(data);
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
   }else{
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please enter the value."
    });
   }
   
  }
  render(){
   return(
      <div>
         <div className="wrapper">
           <div className="main">
             <div className="container">
                <div className="row">
                   <div className="col-xs-5 title-container">
                   <Titles />
                   </div>
                   <div className="col-xs-7 form-container">
                   <Form getWeather={this.getWeather} />
                   <Weather 
                    temperature = {this.state.temperature}
                    city        = {this.state.city}
                    country     = {this.state.country}
                    humidity    = {this.state.humidity}
                    description = {this.state.description}
                    error       = {this.state.error}
                   />
                   </div>
                </div>
             </div>
           </div>
         </div>
      </div>
    );
  }
 
         


};
export default App;