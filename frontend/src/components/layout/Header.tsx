import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('ログアウトに失敗しました', error);
    }
  };

  return (
    <header className="w-full bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <Link to="/daily" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              ひåとにち
            </h1>
          </Link>

          {/* ナビゲーション */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/daily"
              className=" text-white/90 hover:text-white transition-colors duration-200 font-medium"
            >
              今日の日記
            </Link>
            <Link
              to="/dairies"
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
            >
              過去の日記
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-hitonichi-primary/20 hover:bg-hitonichi-primary/30 text-white rounded-lg transition-all duration-200 font-medium backdrop-blur-sm"
            >
              ログアウト
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
