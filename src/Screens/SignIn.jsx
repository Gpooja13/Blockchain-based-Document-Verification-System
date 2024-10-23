import React, { useState, useEffect } from "react";
import Background from "../Components/Background";
import { firebaseAuth } from "../Utils/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { connect, setEmail } = useGlobalContext();

  const handleLoginIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      connect();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
        setEmail(currentUser.email);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="relative h-screen">
      <Background />
      <div className="absolute top-0 left-0 bg-black bg-opacity-60 h-screen w-screen ">
        <div className="flex flex-col items-center justify-center gap-8 h-[100%]">
          <div className="flex flex-col items-center justify-center p-8 bg-white bg-opacity-90 text-white w-96 rounded-3xl ">
            <h1 className="text-4xl font-semibold text-black">
              <div className="flex items-center">
                <img src="/logo.webp" alt="" width={"60px"} />
                <p className="text-3xl">
                  <strong>DocCheck</strong>
                </p>
              </div>
            </h1>
            <h3 className="text-xl font-semibold text-black m-4">Login</h3>
            <div className="flex flex-col items-center gap-6">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                className="px-4 py-2 w-72 border border-gray-500 bg-gray-800 text-white rounded"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                className="px-4 py-2 w-72 border border-gray-500 bg-gray-800 text-white rounded"
              />
              <button
                onClick={handleLoginIn}
                className="px-4 py-2 bg-red-600 rounded font-bold text-white w-1/2 hover:bg-red-700"
              >
                Login
              </button>
              <p className="text-black mb-1 -mt-1 text-sm text-center">
                Don't have an account?
                <Link
                  to={"/signup"}
                  className="text-green-600 font-semibold ml-1"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
