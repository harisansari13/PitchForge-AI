import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Shell } from "../components/Layout";

export default function NotFound() {
  return (
    <Shell>
      <div className="section-shell flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        <p className="text-7xl font-extrabold text-white/10">404</p>
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="max-w-md text-slate-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="secondary">
            <ArrowLeft size={18} /> Back to Home
          </Button>
        </Link>
      </div>
    </Shell>
  );
}
