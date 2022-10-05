import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Predict from "./pages/Predict";
import Portfolio from "./pages/Portfolio";
import News from "./pages/News";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import NavController from "./components/Nav/NavController";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <NavController />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/news" element={<News />} />
            <Route path="/account" element={<Account />} />
            <Route path="/profile/*" element={<Profile />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
