import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Location({ onCountryChange, onCityChange }) {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
                    headers: {
                        'X-CSCAPI-KEY': 'NGpBYlZjZ0hWeFF5cWVXR3BWSlppcDFxV01yM2xFM1B3THhlMzU0Sg=='
                    }
                });
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        if (country) {
            const fetchCities = async () => {
                try {
                    const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/cities`, {
                        headers: {
                            'X-CSCAPI-KEY': 'NGpBYlZjZ0hWeFF5cWVXR3BWSlppcDFxV01yM2xFM1B3THhlMzU0Sg=='
                        }
                    });
                    setCities(response.data);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            };

            fetchCities();
        } else {
            setCities([]);
        }
    }, [country]);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
        onCountryChange(selectedCountry);
        setCity('');  // Reset city when country changes
    };

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);
        onCityChange(selectedCity);
    };

    return (
        <div>
            <label>
                Country:
                <select value={country} onChange={handleCountryChange}>
                    <option value="">Select a country</option>
                    {countries.map(country => (
                        <option key={country.iso2} value={country.iso2}>{country.name}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                City:
                <select value={city} onChange={handleCityChange} disabled={!country}>
                    <option value="">Select a city</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default Location;
