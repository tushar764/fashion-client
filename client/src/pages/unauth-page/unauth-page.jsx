import { Link } from "react-router-dom";

function UnauthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        You do not have permission to view this page. Please return to a safe page.
      </p>
      <div>
        <Link
          to="/"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default UnauthPage;
