import { Fragment, useEffect, useState } from "react";
import UserPorfile from "./UserProfile";
import { login, signup } from "../api";
import { ToastContainer,toast } from "react-toastify";

function Navbar({ Login, setLogin, user, setUser }) {

    const [Signup, setSignup] = useState(false);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
      const emailValid = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/;
      return emailValid.test(email);
    };
  
    const validateUsername = (username) => {
      return username.length >= 8;
    };
  
    const validatePassword = (password) => {
      const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordValid.test(password);
    };

    const validateFields = () => {
        let newErrors = {};
        if (!validateEmail(email)) newErrors.email = "Email must be a valid Gmail, Yahoo, or Outlook address.";
        if (!validateUsername(username)) newErrors.username = "Username must be at least 8 characters long.";
        if (!validatePassword(password)) newErrors.password = "Password must contain at least one uppercase letter, one number, and one special character.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
    const loginUser = async () => {

        let is_login = await login(email, password)
        if (is_login) {
            toast.success("Login Successful", { position: "top-right", autoClose: 3000, style:{color:"#09AFF4"} });
        } else {
            toast.error("Invalid email or password", { position: "top-right", autoClose: 3000 });
        }
        setLogin(!is_login)
        setEmail(""); // Clear email input
        setPass("");  // Clear password input
        setUser(is_login);
    }

    const createUser = async () => {

        if (!validateFields()) return;

        let is_signup = await signup(username, email, password)
        if (is_signup) {
            toast.success("Signup Successful", { position: "top-right", autoClose: 3000, style:{color:"#09AFF4"}});
        } else {
            toast.error("Signup Failed", { position: "top-right", autoClose: 3000 });
        }
        setSignup(!is_signup);
        setLogin(!is_signup);
        setUsername(""); // Clear input fields
        setEmail("");
        setPass("");
        setUser(is_signup);
    }

    return (

        <Fragment >
            <div className="pb-6">
                {/* Navbar */}
                <nav className="absolute top-0 right-0 p-4 flex space-x-4">
                    {user ? (
                        <UserPorfile />
                    ) : (
                        <>
                            <button
                                className="text-blue-600 hover:underline-offset-8 hover:decoration-2 hover:underline px-4 py-2 rounded-lg"
                                onClick={() => setLogin(true)}
                            >
                                Login
                            </button>
                            <button
                                className=" px-4 py-2  flex justify-center bg-[#09AFF4] hover:bg-white hover:text-[#09AFF4] text-white border-2 hover:border-[#09AFF3] rounded-lg"
                                onClick={() => setSignup(true)}
                            >
                                Signup
                            </button>
                        </>
                    )}

                </nav>

                {/* Login PopUp Model */}
                {Login && <LoginComp setLogin={setLogin}
                    setSignup={setSignup}
                    setEmail={setEmail}
                    setPass={setPass}
                    loginUser={loginUser}
                     />}

                {/* Signup PopUp Model */}
                {Signup && <SignUpComp setSignup={setSignup}
                    setEmail={setEmail}
                    setUsername={setUsername}
                    setPass={setPass}
                    createUser={createUser}
                    errors={errors} />}

                <ToastContainer/>
            </div>
        </Fragment>
    );
}

export default Navbar;


export function LoginComp({ setLogin, setSignup, setEmail, setPass, loginUser }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input type="email" onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full p-2 mb-3 border border-gray-300 rounded" />
                <input type="password" onChange={(event) => setPass(event.target.value)} placeholder="Password" className="w-full p-2 mb-4 border border-gray-300 rounded" />
                <div className="flex justify-between">
                    <div className="flex ">
                        <button
                            className="font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 bg-transparent hover:bg-[#09AFF4] text-[#09AFF4] hover:text-white border-2 border-[#09AFF3] hover:border-transparent rounded-lg"
                            onClick={loginUser}
                        >
                            Login
                        </button>
                        <button
                            className="font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 bg-transparent hover:bg-[#09AFF4] text-[#09AFF4] hover:text-white border-2 border-[#09AFF3] hover:border-transparent rounded-lg"
                            onClick={() => {
                                setSignup(true);
                                setLogin(false);
                            }}
                        >
                            Signup
                        </button>
                    </div>
                    <button className="text-red-600 hover:underline" onClick={() => setLogin(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}

export function SignUpComp({ setSignup, setEmail, setPass, setUsername, createUser , errors }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <input type="text" onChange={(event) => setUsername(event.target.value)} placeholder="Username" className="w-full p-2 mb-3 border border-gray-300 rounded" />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                <input type="email" onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full p-2 mb-3 border border-gray-300 rounded" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <input type="password" onChange={(event) => setPass(event.target.value)} placeholder="Password" className="w-full p-2 mb-4 border border-gray-300 rounded" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <div className="flex justify-between">
                    <button className="font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 bg-transparent hover:bg-[#09AFF4] text-[#09AFF4] hover:text-white border-2 border-[#09AFF3] hover:border-transparent rounded-lg"
                        onClick={createUser}>
                        Signup
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => setSignup(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}



