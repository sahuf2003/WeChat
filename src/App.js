import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navcomp from './components/Navcomp';
import Intro from './components/Intro';
import Working from './components/Working';
import Usecases from './components/Usecases';
import Footer from './components/Footer';
import { Logs } from './components/logs';

function App() {
  return (
    <div className="App">
      <Navcomp/>
      <Intro/>
      <Working/>
      <Logs/>
      <Usecases/>
      <Footer/>
    </div>
  );
}

export default App;
