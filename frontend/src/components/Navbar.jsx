import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthSession";
import { BookOpen, Library, LogOut, User, Shield, Plus } from "lucide-react";

export default function Navbar() {
  const { isLoggedIn, role, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-950 border-b border-blue-900/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors">
            <BookOpen className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">LiGest</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {isLoggedIn && (
              <>
                <NavLink 
                  to="/books" 
                  className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-yellow-400 text-blue-950 shadow-lg" 
                      : "text-blue-100 hover:text-white hover:bg-blue-900/50"
                  }`}
                >
                  <Library className="w-4 h-4" />
                  Catalogue
                </NavLink>
                {role == "user" && (
                    <NavLink 
                  to="/lendings" 
                  className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-yellow-400 text-blue-950 shadow-lg" 
                      : "text-blue-100 hover:text-white hover:bg-blue-900/50"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Mes Emprunts
                </NavLink>
                )}
                {role === 'admin' && (
                  <>
                    <div className="w-px h-6 bg-blue-800 mx-2" />
                    <NavLink 
                      to="/admin/books" 
                      className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? "bg-yellow-400 text-blue-950 shadow-lg" 
                          : "text-blue-100 hover:text-white hover:bg-blue-900/50"
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      Admin Livres
                    </NavLink>
                    <NavLink 
                      to="/admin/lendings" 
                      className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? "bg-yellow-400 text-blue-950 shadow-lg" 
                          : "text-blue-100 hover:text-white hover:bg-blue-900/50"
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      Admin Emprunts
                    </NavLink>
                  </>
                )}
              </>
            )}
          </nav>

          {/* User section */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="hidden md:flex items-center gap-3 text-blue-100">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.name} {user?.lastname}</span>
                  {role === 'admin' && (
                    <span className="px-2 py-1 text-xs font-semibold bg-yellow-400 text-blue-950 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-900/50 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
