import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import ApperIcon from "@/components/ApperIcon";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isInitialized } = useContext(AuthContext);
  
  useEffect(() => {
    if (isInitialized) {
      // Show login UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
  }, [isInitialized]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-16 h-16 shrink-0 rounded-xl flex items-center justify-center bg-gradient-primary text-white text-2xl font-bold">
            <ApperIcon name="Image" className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-xl font-bold text-gray-900">
              Sign in to QuickResize
            </div>
            <div className="text-center text-sm text-gray-600">
              Welcome back, please sign in to continue
            </div>
          </div>
        </div>
        <div id="authentication" />
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary-500 hover:text-primary-600 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;