import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import datapic from '../../assets/datapic.svg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        window.location.href = '/Home';
      }
    }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store JWT Token
        navigate('http://localhost:5000/api/auth/Home'); // Redirect to home page
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong, please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="grid lg:grid-cols-2 h-screen">
        {/* Left Panel - Registration Form */}
        <div className="flex items-center justify-center p-8 relative z-10 
          after:absolute after:right-0 after:top-0 after:h-full after:w-32 after:bg-gradient-to-l after:from-black after:to-transparent">
          
          <div className="w-full max-w-md space-y-10">
            {/* Header Section */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100">
                Feedback.
              </h1>
              <p className="text-gray-400 font-light text-lg">
                Create your account
              </p>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-8">
            <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-black/40 border border-gray-800 rounded-xl text-gray-300 focus:outline-none focus:border-gray-600 placeholder-gray-600 transition-all"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-black/40 border border-gray-800 rounded-xl text-gray-300 focus:outline-none focus:border-gray-600 placeholder-gray-600 transition-all"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-black/40 border border-gray-800 rounded-xl text-gray-300 focus:outline-none focus:border-gray-600 placeholder-gray-600 transition-all pr-16"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-5 bg-black/60 border border-gray-800 hover:border-gray-600 rounded-xl text-gray-300 hover:text-white transition-all duration-300 font-medium relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all" />
                <span 
                  className="relative"
                  onClick={handleRegister}
                  >Register</span>
              </button>
            </form>

            {/* Login Redirect */}
            <div className="flex items-center justify-center">
              <p className="text-white">
                Already have an account?{' '}
                <span
                  className="text-blue-500 underline hover:cursor-pointer"
                  onClick={handleLoginRedirect}
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Full-screen Image */}
        <div className="hidden lg:block relative h-screen overflow-hidden 
          before:absolute before:inset-0 before:bg-gradient-to-l before:from-black/40 before:to-transparent">
          
          <img 
            src={datapic} 
            alt="Data visualization" 
            className="h-full w-full object-cover object-left-top transform scale-105 hover:scale-100 transition-transform duration-1000 pointer-events-none select-none" 
          />
        </div>
      </div>
    </div>
  );
};

export default Register;