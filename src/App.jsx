import './App.css';
import axios from 'axios';
import { useState } from 'react';
import worldMap from './assets/world_map.png';
import getRegionColor from './helpers/helper';


function App() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedCountry, setSearchedCountry] = useState(null);

    async function fetchCountries() {
        try {
            setLoading(true);
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countriesData = response.data.map((country) => ({
                name: country.name.common,
                population: country.population || 'Unknown',
            }));
            const sortedCountries = countriesData.sort((a, b) =>
                a.population === 'Unknown' || b.population === 'Unknown'
                    ? 0
                    : a.population - b.population
            );
            setCountries(sortedCountries);
        } catch (e) {
            console.log('De statuscode van de fout is:', e.response?.status);
            setError('Het ophalen van de data is mislukt. Probeer het opnieuw');
        } finally {
            setLoading(false);
        }
    }

    async function searchCountry() {
        try {
            setLoading(true);
            const response = await axios.get(`https://restcountries.com/v3.1/name/{name}`);
            setSearchedCountry(response.data[0]);
            setError('');
            setSearchTerm('');
        } catch (e) {
            setError(`${searchTerm} does not exist. Please try again.`);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = async () => {
        try {
            await searchCountry();
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const convertToMillions = (population) => {
        return population ? `${(population / 1e6).toFixed(2)} million` : 'Unknown';
    };

    return (
        <>
            <header>
                <img src={worldMap} alt="WorldMap" />
                <h1>World Regions</h1>
            </header>
            <main>
                <section>
                    {!loading && (
                        <button type="button" onClick={fetchCountries}>
                            Haal landen op!
                        </button>
                    )}
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    {!loading && countries.length > 0 && (
                        <ul>
                            {countries.map((country) => (
                                <li key={country.name} className={getRegionColor(country.region)}>
                                    <div>
                                        <p>{country.name}</p>
                                        <p>Has a population of {country.population} people</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <section>
                    <div>
                        <input
                            type="text"
                            placeholder="Bijvoorbeeld Nederland of Peru"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {searchedCountry && (
                        <div>
                            <h2>{searchedCountry.name?.common}</h2>
                            <p>
                                {searchedCountry.name?.common} is situated in {searchedCountry.region} and the capital is{' '}
                                {searchedCountry.capital ? searchedCountry.capital[0] || 'Unknown' : 'Unknown'}
                            </p>
                            <p>
                                It has a population of {searchedCountry.population ? convertToMillions(searchedCountry.population) : 'Unknown'} million
                                people and it borders with {searchedCountry.borders?.length || 0} neighboring countries.
                            </p>
                            <p>
                                Websites can be found on {searchedCountry.tld ? searchedCountry.tld.join(', ') : 'Unknown'} domain(s).
                            </p>
                        </div>
                    )}
                    {!searchedCountry && !loading && (
                        <ul>
                            {countries.map((country) => (
                                <li key={country.name} className={getRegionColor(country.region)}>
                                    <div>
                                        <p>{country.name}</p>
                                        <p>Has a population of {country.population} people</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </>
    );
}


export default App
