// import { Link, useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
// import { useState } from "react";
// import axios from "axios";
// import API_URL from '../../constants';
// import './Signup.css';



// function Signup() {
//   const navigate = useNavigate();
//   const [username, setusername] = useState('');
//   const [password, setpassword] = useState('');
//   const [email, setemail] = useState('');
//   const [mobile, setmobile] = useState('');
//   const [error, setError] = useState('');

//   const handleApi = () => {
//     setError('');

//     // Basic input validation
//     if (!username || !password || !email || !mobile) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     // More specific input validations
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long.');
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     // Mobile validation (you can customize this based on your requirements)
//     const mobileRegex = /^\d{10}$/;
//     if (!mobileRegex.test(mobile)) {
//       setError('Please enter a valid 10-digit mobile number.');
//       return;
//     }

//     // Server-side validation
//     const url = API_URL + '/signup';
//     const data = { username, password, mobile, email };

//     axios.post(url, data)
//       .then((res) => {
//         if (res.data.message) {
//           alert(res.data.message);
//           navigate('/login');
//           // Redirect or perform any additional actions upon successful signup
//         }
//       })
//       .catch((err) => {
//         setError('Error signing up. Please try again.');
//       });
//   };

//   return (
//     <center>
//       <div>
//         <Header />
//         <div className="p-3 m-3">
//           <h3 className="mb-4">Welcome to Signup Page</h3>
//           <form>
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">USERNAME</label>
//              <center> <input
//                 id="username"
//                 className="form-control"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setusername(e.target.value)}
//               /></center>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="mobile" className="form-label">MOBILE</label>
//               <center><input
//                 id="mobile"
//                 className="form-control"
//                 type="text"
//                 value={mobile}
//                 onChange={(e) => setmobile(e.target.value)}
//               /></center>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">EMAIL</label>
//              <center> <input
//                 id="email"
//                 className="form-control"
//                 type="text"
//                 value={email}
//                 onChange={(e) => setemail(e.target.value)}
//               /></center>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">PASSWORD</label>
//               <center><input
//                 id="password"
//                 className="form-control"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setpassword(e.target.value)}
//               /></center>
//             </div>
//             {error && <div className="text-danger mb-3">{error}</div>}
//             <button type="button" className="btn" onClick={handleApi}>SIGNUP</button>

//             <Link className="btn" to="/login">LOGIN</Link>

//           </form>
//         </div>
//       </div>
//     </center>
//   );
// }

// export default Signup;

import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useState } from "react";
import axios from "axios";
import API_URL from '../../constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleApi = () => {
    // Basic input validation
    if (!username || !password || !email || !mobile) {
      toast.error('Please fill in all fields.');
      return;
    }

    // More specific input validations
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Mobile validation
    const mobileRegex = /^[6-9]\d{9}$/; // Updated regex
    if (!mobileRegex.test(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    // Server-side validation
    const url = API_URL + '/signup';
    const data = { username, password, mobile, email };

    axios.post(url, data)
      .then((res) => {
        console.log(res)
        if (res.data.message) {
          toast.success(res.data.message);
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error('Error signing up. Please try again.');
      });
  };

  const handleMobileChange = (e) => {
    const inputValue = e.target.value;
    // Limit the input to maximum 10 characters
    if (inputValue.length <= 10) {
      setMobile(inputValue);
    }
  };

  return (
    <center > {/* Set background color to gray */}
      <div >
        <Header />
        <div className="p-3 m-3 ">
          {/*<h3 className="mb-4">Welcome to Signup Page</h3>*/}
          <form >
            <div className="mb-3 ">
              <label htmlFor="username" className="block mb-1 ">FULL NAME</label>
              <input
                id="username"
                className="form-control"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="block mb-1">MOBILE</label>
              <input
                id="mobile"
                className="form-control"
                type="text"
                value={mobile}
                onChange={handleMobileChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block mb-1">EMAIL</label>
              <input
                id="email"
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-1">PASSWORD</label>
              <input
                id="password"
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" className="btn mt-2 btn-primary" onClick={handleApi}>SIGNUP</button>
            <Link className="btn mt-1 btn-secondary" to="/login">LOGIN</Link>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </center>
  );
}

export default Signup;
