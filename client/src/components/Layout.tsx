
import { AppBar } from './AppBar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

/*Properly wrap all routes with the Layout component
Ensure the content scrolls correctly under the fixed AppBar
The Layout component will handle showing the AppBar and managing the content scroll behavior consistently across all routes. */