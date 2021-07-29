
import {BrowserRouter as Router} from 'react-router-dom';

import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';


function App() {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <Main/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
