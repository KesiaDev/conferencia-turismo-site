import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Keynotes from "./pages/Keynotes";
import Program from "./pages/Program";
import Call from "./pages/Call";
import Fees from "./pages/Fees";
import Committees from "./pages/Committees";
import Contact from "./pages/Contact";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keynotes" element={<Keynotes />} />
        <Route path="/program" element={<Program />} />
        <Route path="/call" element={<Call />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/committees" element={<Committees />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App;
