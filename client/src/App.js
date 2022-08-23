import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedPageExample from "./pages/ProtectedPageExample";
import SignUp from "./pages/SignUp";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="z-0 grow p-2 flex flex-col bg-gray195">
              {/* bg-white rounded-xl border-2 border-black min-h-full p-4 */}
              <div className="bg-white rounded-xl border-2 border-black min-h-full p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  {/* Use <RequiredAuth> for pages that should only be accessible to a
                  user that has logged in.*/}
                  <Route
                    path="/protected"
                    element={
                      <RequireAuth>
                        <ProtectedPageExample />
                      </RequireAuth>
                    }
                  />
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
