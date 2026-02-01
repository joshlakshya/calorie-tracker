import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Utensils, User, Target } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'Dashboard' },
        { path: '/diary', icon: BookOpen, label: 'Diary' },
        { path: '/meals', icon: Utensils, label: 'Meals' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="glass-card border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold gradient-text">Lakshya</h1>
                                <p className="text-xs text-white/60">Stick to Your Goal</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive(item.path)
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30'
                                                : 'glass-card hover:bg-white/10'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Mobile Navigation */}
            <nav className="md:hidden glass-card border-t border-white/10 sticky bottom-0 backdrop-blur-xl">
                <div className="flex items-center justify-around px-4 py-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${isActive(item.path)
                                        ? 'text-purple-400'
                                        : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 ${isActive(item.path) ? 'scale-110' : ''}`} />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
