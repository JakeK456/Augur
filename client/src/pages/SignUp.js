import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";

// This signup form is intentionally minimalist to reduce effort required to
// customize it to your app's needs. See the excellent best practices guide for
// sign informs on web.dev https://web.dev/sign-in-form-best-practices/

// TODO: customize styles or import styles with favorite css approach
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
  username: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const { isLoggedIn, signup, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (error) {
      // TODO: replace window alert with custom alert.
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    signup(formState);
  };

  if (isLoggedIn) {
    // navigate to the home page
    return <Navigate to="/" replace />;
  }
  return (
    <div className="w-full max-w-lg">
      <form className="bg-white px-4 pt-6 pb-8 mb-4">
        <div className="mb-4">
          {/* <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Email Address
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
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          {/* <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Confirm Password
          </label> */}
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="repeatPassword"
            type="password"
            placeholder="Repeat Password"
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="w-full px-6 my-2">
            <button
              className="bg-green-500 hover:bg-blue-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
          </div>
          <p>
            Already have an account?
            <a
              className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 ml-1 my-2"
              href="/Login"
            >
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>

    // <div>
    //   <h1>Sign Up</h1>
    //   <hr />
    //   <form onSubmit={handleSubmit}>
    //     <div style={styles.formControl}>
    //       <label htmlFor="username" style={styles.label}>
    //         Username
    //       </label>
    //       <input
    //         autoFocus
    //         disabled={loading}
    //         id="username"
    //         type="text"
    //         placeholder="Enter username"
    //         name="username"
    //         value={formState.username.value}
    //         onChange={handleInputChange}
    //       />
    //     </div>
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
