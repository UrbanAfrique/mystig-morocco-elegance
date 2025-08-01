import { useState } from 'react';
import { 
  BarChart3, 
  Hotel, 
  Calendar, 
  Car, 
  Package, 
  Palette, 
  UtensilsCrossed,
  Ticket,
  Settings,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Tableau de bord', href: '/dashboard', active: true },
    { icon: BarChart3, label: 'Statistiques', href: '/dashboard/statistics' },
    { icon: Calendar, label: 'Événements', href: '/dashboard/events' },
    { icon: Car, label: 'Transport', href: '/dashboard/transport' },
    { icon: Package, label: 'Forfaits', href: '/dashboard/packages' },
    { icon: Palette, label: 'Artisanat', href: '/dashboard/artisan' },
    { icon: UtensilsCrossed, label: 'Gastronomie', href: '/dashboard/food' },
    { icon: Ticket, label: 'Billetterie', href: '/dashboard/tickets' },
  ];

  return (
    <div className="min-h-screen bg-luxury-ivory">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-background/95 backdrop-blur-xl border-r border-border/20 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <h1 className="font-serif text-2xl font-bold text-foreground">
              MystigTravel
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  item.active
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-sm'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${
                  !item.active ? 'group-hover:scale-110' : ''
                }`} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-border/20 space-y-1">
            <a
              href="/dashboard/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 group"
            >
              <Settings className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">Paramètres</span>
            </a>
            <a
              href="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">Déconnexion</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/20 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-muted/50 transition-all duration-300 hover:shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">Ahmed Benali</p>
                <p className="text-xs text-muted-foreground">Vendeur Premium</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-medium">AB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 min-h-screen bg-gradient-to-br from-luxury-ivory via-background to-luxury-beige">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;