import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Predict from "./pages/Predict";
import Portfolio from "./pages/Portfolio";
import Charts from "./pages/Charts";
import News from "./pages/News";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import NavController from "./components/Nav/NavController";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <div className="h-screen w-screen">
            <NavController />
            <div className="w-full h-[calc(100%-6rem)] sm:h-[calc(100%-5rem)] overflow-auto sm:overflow-visible bg-gray-100">
              <div className=" bg-gray-100">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/predict" element={<Predict />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/profile/*" element={<Profile />} />
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
