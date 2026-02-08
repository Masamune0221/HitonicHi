import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-white/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-white/80 text-sm">
          © 2026 Hitonichi. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link 
            to="/privacy" 
            className="text-white/80 hover:text-white/80 text-sm transition-colors"
          >
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}
