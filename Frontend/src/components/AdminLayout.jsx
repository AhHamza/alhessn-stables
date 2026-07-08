import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/horses", label: "Horses" },
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/inquiries", label: "Inquiries" },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("alhessn_token");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-dark-card border-r border-dark-border fixed top-0 left-0 bottom-0 flex flex-col">
        <div className="p-6 border-b border-dark-border">
          <span className="font-serif text-xl text-gold">Al Hessn</span>
          <p className="text-xs tracking-widest text-gray-600 uppercase mt-1">
            Admin
          </p>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {links.map(({ to, label }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className={`text-left px-4 py-3 text-xs tracking-widest uppercase transition-colors ${location.pathname === to ? "text-gold bg-dark border-l-2 border-gold" : "text-gray-400 hover:text-cream"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-dark-border">
          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 text-xs tracking-widest uppercase text-gray-600 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="ml-56 flex-1 p-8">{children}</main>
    </div>
  );
}
