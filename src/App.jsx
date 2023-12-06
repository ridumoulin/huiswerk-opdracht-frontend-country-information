import './App.css';
import axios from 'axios';

async function fetchCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v3.1/all');
        console.log(result);
    }   catch (e) {
        console.error(e);
    }
}

function App() {

    return (
        <>
            <button type="button" onClick={fetchCountries}>
                Haal landen op!
            </button>
        </>
    )
}

export default App
