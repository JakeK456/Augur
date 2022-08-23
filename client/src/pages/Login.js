import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";

const styles = {
  formControl: {
    display: "flex",
    padding: "0.25em",
  },
  label: {
    flex: "0 1 6em",
    paddingRight: "0.25em",
  },
};

const initialFormState = {
  email: "",
  password: "",
};

export default function Login() {
  const { isLoggedIn, login, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);
  const location = useLocation();

  useEffect(() => {
    if (error) {
      // TODO: replace window alert with custom alert
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    login(formState);
  };

  if (isLoggedIn) {
    // navigate to page user was redirected from or the home page.
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <div className="w-full max-w-lg">
      <form className="bg-white px-4 pt-6 pb-8 mb-4">
        <div className="mb-4">
          {/* <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label> */}
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="mb-4">
          {/* <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label> */}
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="w-full px-6 my-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Log In
            </button>
          </div>
          <a
            className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 my-2"
            href="/Home"
          >
            Forgot your Password?
          </a>
          <p>
            Don't have an account?
            <a
              className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 ml-1 my-2"
              href="/SignUp"
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <div style={styles.formControl}>
    //       <label htmlFor="email" style={styles.label}>
    //         Email
    //       </label>
    //       <input
    //         disabled={loading}
    //         id="email"
    //         type="email"
    //         name="email"
    //         placeholder="Enter email"
    //         value={formState.email.value}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div style={styles.formControl}>
    //       <label htmlFor="new-password" style={styles.label}>
    //         Password
    //       </label>
    //       <input
    //         disabled={loading}
    //         id="new-password"
    //         type="password"
    //         name="password"
    //         placeholder="Enter password"
    //         value={formState.password.value}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div style={styles.formControl}>
    //       <button disabled={loading} type="submit">
    //         {loading ? "Loading..." : "Submit"}
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
}
