import { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./component/Dropdown";
import axios from "axios";

function App() {
  const [countries, setContries] = useState([]);
  const [isCountrySelected, setisCountrySelected] = useState(false);
  const [selectedCountry, setselectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [isStateSelected, setisStateSelected] = useState(false);
  const [selectedState, setselectedState] = useState("");
  const [selectedCity, setselectedCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCoutries = async () => {
      try {
        const result = await axios.get('https://crio-location-selector.onrender.com/countries');
        console.log(result.data)
        setContries(result.data);
      } catch (error) {
        console.error("Error in Fetch country :" + error);
      }
    };
    fetchCoutries();
  }, []);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const result = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        console.log(result.data);
        setStates(result.data);
      } catch (error) {
        console.error("Error in Fetch state :" + error);
      }
    };
    fetchState();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const result = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        setCities(result.data);
      } catch (error) {
        console.error("Error in Fetch state :" + error);
      }
    };
    fetchCities();
  }, [selectedState]);

  const handlecountryChange = (e) => { 
      setStates([]);
      setselectedCountry(e.target.value);
      const isSelected=e.target.value!==''?true:false;
      setisCountrySelected(isSelected);
      setisStateSelected(false);
      setselectedCity('');
      
  };

  const handlestateChange = (e) =>{
    setCities([]);
    setselectedState(e.target.value);
    const isSelected=e.target.value!==''?true:false;
    setisStateSelected(isSelected);
    setselectedCity('')
    
  };

  const handlecityChange = (e) =>{
     
     
    setselectedCity(e.target.value);
     
    
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", flexDirection: "row" }}>
      
      <select id="ddlcontry" onChange={handlecountryChange}>
        <option value="">Select Country</option>
        {countries.map((data) => {
          return (<option value={data}>{data}</option>);
        })}
      </select>
      <select id="ddlstate" onChange={handlestateChange} disabled={!isCountrySelected} value={selectedState}>
        <option value="">Select State</option>
        {states.map((data) => {
          return (<option value={data}>{data}</option>);
        })}
      </select>

      <select id="ddlcity" disabled={!isStateSelected} onChange={handlecityChange} >
        <option value="">Select City</option>
        {cities.map((data) => {
          return (<option value={data}>{data}</option>);
        })}
      </select>
      </div>
      {selectedCity!=='' && <div style={{display:"flex", 
flexDirection:"column"
      }}>
      <h4> You Seleted {selectedCountry},{selectedState},{selectedCity}</h4> 
      </div>}
   
    </div>
    
  );
}

export default App;
