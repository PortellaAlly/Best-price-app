import './App.css';
import SearchBar from './Components/SearchBar';

function App() {
  return (
    <div className="App">
    <head>
      <title>Best Price App</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
    </head>
      <SearchBar onSearch={(query) => console.log(query)} loading={false} />
    </div>
  );
}

export default App;
