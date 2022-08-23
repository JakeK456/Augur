import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";

const initialFormState = {
  email: "",
  password: "",
  passwordConfirm: "",
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
      <form className="bg-white px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Email Address
          </label> */}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formState.email.value}
            onChange={handleInputChange}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formState.password.value}
            onChange={handleInputChange}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            value={formState.passwordConfirm.value}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="w-full px-6 my-2">
            <button
              className="bg-green-500 hover:bg-green-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
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

    //   {/* <div>
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
    // </div> */}
  );
}
