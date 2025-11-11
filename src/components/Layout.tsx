import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};
