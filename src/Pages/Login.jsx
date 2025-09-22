import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../Admin/Context/AuthContext';

const BRAND_BLUE = "#2726CC";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || determineRedirectPath(currentUser);
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  // Helper function to determine where to redirect based on user role
  const determineRedirectPath = (user) => {
    if (user.role === 'admin') {
      return '/admin';
    }
    return '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login({ email, password });
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Login</h1>
        
        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              style={{ focusRingColor: BRAND_BLUE }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              style={{ focusRingColor: BRAND_BLUE }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50"
            style={{ backgroundColor: BRAND_BLUE }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d22a0')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="hover:underline"
              style={{ color: BRAND_BLUE }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#1d22a0')}
              onMouseOut={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
