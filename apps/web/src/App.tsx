import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ThematicLines from "./pages/ThematicLines";
import Keynotes from "./pages/Keynotes";
import Program from "./pages/Program";
import Call from "./pages/Call";
import Committees from "./pages/Committees";
import Venue from "./pages/Venue";
import VillaDeiTroni from "./pages/VillaDeiTroni";
import Anais from "./pages/Anais";
import Contact from "./pages/Contact";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";
import AnaisAutorizacao from "./pages/AnaisAutorizacao";
import AnaisAdminAutorizacoes from "./pages/AnaisAdminAutorizacoes";
import AssistaOnline from "./pages/AssistaOnline";

function App() {
  return (
    <Routes>
      <Route
        path="/anais/autorizacao"
        element={
          <Layout>
            <AnaisAutorizacao />
          </Layout>
        }
      />
      <Route path="/anais/autorizacoes" element={<Navigate to="/anais/autorizacao" replace />} />
      <Route path="/anais/autorizações" element={<Navigate to="/anais/autorizacao" replace />} />
      <Route path="/anais/admin/autorizacoes" element={<AnaisAdminAutorizacoes />} />
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/keynotes"
        element={
          <Layout>
            <Keynotes />
          </Layout>
        }
      />
      <Route
        path="/program"
        element={
          <Layout>
            <Program />
          </Layout>
        }
      />
      <Route
        path="/thematic-lines"
        element={
          <Layout>
            <ThematicLines />
          </Layout>
        }
      />
      <Route
        path="/call"
        element={
          <Layout>
            <Call />
          </Layout>
        }
      />
      <Route
        path="/committees"
        element={
          <Layout>
            <Committees />
          </Layout>
        }
      />
      <Route
        path="/venue"
        element={
          <Layout>
            <Venue />
          </Layout>
        }
      />
      <Route
        path="/villa-dei-troni"
        element={
          <Layout>
            <VillaDeiTroni />
          </Layout>
        }
      />
      <Route
        path="/anais"
        element={
          <Layout>
            <Anais />
          </Layout>
        }
      />
      <Route
        path="/assista-online"
        element={
          <Layout>
            <AssistaOnline />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/accessibility"
        element={
          <Layout>
            <Accessibility />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
