import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Brief from './pages/Brief';
import Plan from './pages/Plan';
import Design from './pages/Design';
import Flow from './pages/Flow';
import Prototype from './pages/Prototype';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brief" element={<Brief />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/design" element={<Design />} />
        <Route path="/flow" element={<Flow />} />
        <Route path="/prototype" element={<Prototype />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
