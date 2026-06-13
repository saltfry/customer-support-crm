import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          Customer Support CRM
        </h1>

        <div className="flex gap-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/tickets"
            className="text-gray-700 hover:text-blue-600"
          >
            Tickets
          </Link>

          <Link
            to="/create-ticket"
            className="text-gray-700 hover:text-blue-600"
          >
            Create Ticket
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;