import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Predict from "./pages/Predict";
import Portfolio from "./pages/Portfolio";
import Charts from "./pages/Charts";
import News from "./pages/News";
import Account from "./pages/Account";
import NavController from "./components/Nav/NavController";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <div>
            <NavController />
            <div>
              <div>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/predict" element={<Predict />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/account" element={<Account />} />
                  {/* <Route
                    path="/predict"
                    element={
                      <RequireAuth>
                        <Predict />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/portfolio"
                    element={
                      <RequireAuth>
                        <Portfolio />
                      </RequireAuth>
                    }
                  /> */}
                </Routes>
              </div>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
