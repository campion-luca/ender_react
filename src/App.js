import './App.css';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css' // import di bootstrap
import Footer from './components/Footer';
import Title from './components/Title';
import Body from './components/Body';

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <body>
        <Title />
        <Body />
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
