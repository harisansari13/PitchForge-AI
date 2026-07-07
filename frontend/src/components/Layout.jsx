import { Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export function Shell({ children }) {
  return <main className="min-h-screen overflow-hidden">{children}</main>;
}

export function Navbar() {
  return (
    <header className="section-shell fixed left-1/2 top-4 z-50 -translate-x-1/2 w-full px-4">
      <nav className="glass flex items-center justify-between rounded-lg px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold tracking-tight text-white"
        >
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-md bg-white text-ink">
            <Sparkles size={18} />
          </span>
          <span className="hidden sm:block">PitchForge AI</span>
        </Link>

        <div className="flex items-center gap-1 text-sm text-slate-300">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition hover:bg-white/10 ${
                isActive ? "bg-white/10 text-white" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition hover:bg-white/10 ${
                isActive ? "bg-white/10 text-white" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
