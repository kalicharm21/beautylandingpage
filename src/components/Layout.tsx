import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import { useThemeStore } from '@/store/themeStore';

const Layout = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Theme is now handled by the store automatically
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
      <Cart />
    </div>
  );
};

export default Layout;