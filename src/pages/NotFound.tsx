/**
 * 404 Not Found Page Component
 * 
 * This page is displayed when users navigate to a non-existent route.
 * It provides a user-friendly error message and navigation back to home.
 * 
 * Features:
 * - Logs 404 errors to console for debugging
 * - Displays friendly error message
 * - Provides link back to homepage
 * - Responsive design
 * 
 * @component
 */

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * NotFound Component
 * 
 * Displays 404 error page and logs the attempted route.
 */
const NotFound = () => {
  const location = useLocation();

  /**
   * Effect: Log 404 errors for debugging
   * Logs the pathname of non-existent routes to help identify broken links
   */
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  /**
   * Render 404 error page with:
   * - Error code display (404)
   * - Friendly error message
   * - Link to return to homepage
   */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
