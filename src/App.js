import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import EditTrainer from './components/pages/trainer/EditTrainer';
import EditPokemon from './components/pages/pokemon/EditPokemon';
import Pokemon from './components/pages/pokemon/Pokemon';
import NewPokemon from './components/pages/pokemon/NewPokemon';
import PokemonDetails from './components/pages/pokemon/PokemonDetails';
import NewTrainer from './components/pages/trainer/NewTrainer';
import TrainerDetails from './components/pages/trainer/TrainerDetails';
import Trainers from './components/pages/trainer/Trainers';
import NavBar from './components/partials/NavBar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trainers' element={<Trainers />} />
          <Route path='/trainers/:id' element={<TrainerDetails />} />
          <Route path='/trainers/new' element={<NewTrainer />} />
          <Route path='/trainers/:id/edit' element={<EditTrainer />} />
          <Route path='/pokemon' element={<Pokemon />} />
          <Route path='/pokemon/:id' element={<PokemonDetails />} />
          <Route path='/pokemon/new' element={<NewPokemon />} />
          <Route path='/pokemon/:id/edit' element={<EditPokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
