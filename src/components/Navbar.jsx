import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="backdrop-blur-md bg-white/20 sticky top-0 z-40 shadow-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 flex items-center justify-center text-white font-black shadow-sm">BL</div>
          <div>
            <div className="text-lg font-black">BloodLink</div>
            <div className="text-xs text-gray-500">Donor Finder</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          {[
            ["/", "Home"],
            ["/donors", "Find Donor"],
            ["/register", "Register"],
            ["/team", "Team"],
            ["/contact", "Contact"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-red-50'}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="md:hidden">
          <Link to="/donors" className="px-3 py-2 rounded-md text-sm bg-red-600 text-white font-bold">Find</Link>
        </div>
      </div>
    </header>
  );
}
