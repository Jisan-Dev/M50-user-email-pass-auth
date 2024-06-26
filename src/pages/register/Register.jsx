import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPassVisible, setIsPassVisible] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const isTermsAccepted = e.target.terms.checked;
    const name = e.target.name.value;

    // reset error message
    setRegisterError('');
    // reset success message
    setSuccess('');

    if (password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError('Password must contain at least one uppercase letter');
      return;
    } else if (!isTermsAccepted) {
      setRegisterError('You must accept the terms and conditions');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
        setSuccess('user created successfully');

        updateProfile(userCredentials.user, {
          displayName: name,
          photoURL: 'https://example.com/jane-q-user/profile.jpg',
        })
          .then(() => console.log('profile updated', userCredentials.user))
          .catch((error) => console.log(error));

        sendEmailVerification(userCredentials.user).then(() => alert('please check your email and verify the account'));
      })
      .catch((error) => setRegisterError(error.message));
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">REGISTER PAGE</h1>
      <form onSubmit={handleRegister} className="space-y-3 max-w-96 mx-auto mt-3 border border-stone-400 border-opacity-30 rounded-xl p-6">
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="email" name="email" className="grow" placeholder="Email" required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" name="name" placeholder="Username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type={isPassVisible ? 'text' : 'password'} className="grow" name="password" placeholder="password" required />
          <small onClick={() => setIsPassVisible(!isPassVisible)} className="cursor-pointer hover:text-primary select-none">
            {isPassVisible ? 'hide' : 'show'}
          </small>
        </label>
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms" className="ml-2">
          Our Terms & Conditions
        </label>
        <div className="flex justify-center">
          <input type="submit" value="Register" className="btn btn-outline btn-primary w-full" />
          {/* <button className="btn btn-outline btn-primary w-full">Register</button> */}
        </div>
      </form>
      {registerError && <p className="text-red-400 text-center"> {registerError} </p>}
      {success && <p className="text-green-400 text-center"> {success} </p>}
      <p className="text-center text-sm">
        Already have an account? Please{' '}
        <Link to="/login" className="underline hover:text-primary">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
