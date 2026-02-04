
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Brush } from '../animate-ui/icons/brush';
import { MessageSquareQuote } from '../animate-ui/icons/message-square-quote';
import { LogOut } from '../animate-ui/icons/log-out';

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
              ひとにち
            </h1>
          </Link>

          {/* PC用ナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/daily"
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
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

          {/* スマホ用アイコンナビゲーション */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              to="/daily"
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="今日の日記"
            >
              <Brush size={25} />
            </Link>
            <Link
              to="/dairies"
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="過去の日記"
            >
              <MessageSquareQuote size={25} />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="ログアウト"
            >
              <LogOut size={25} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
