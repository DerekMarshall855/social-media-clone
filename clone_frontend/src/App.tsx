
import {BrowserRouter as Router} from 'react-router-dom';

import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';
import NavBar from './components/navbar';


function App() {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <Main/>
        <Footer />
      </div>
      <NavBar />
    </Router>
  );
}

export default App;
