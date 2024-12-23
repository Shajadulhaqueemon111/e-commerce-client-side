import { NavLink } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
const Navbar = () => {
  const navLink = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/admin">Admin</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar fixed top-0 left-0 right-0 bg-base-100 shadow-lg z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLink}
            </ul>
          </div>
          <a className=" text-xl">
            <img
              className="w-16"
              src="https://i.ibb.co.com/RzKVTf2/Jens-designstyle-soccer-m.png"
              alt=""
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none"
            />
            {/* Search Icon */}
            <button className="absolute left-2 top-4 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M18.75 10.5a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z"
                />
              </svg>
            </button>
          </div>

          {/* Shopping Cart */}
          <button className="relative">
            <div className="badge badge-secondary p-4 flex items-center">
              <TiShoppingCart className="text-2xl" />
              <span className="ml-1">+0</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
