import {type ReactNode } from 'react';
import { BubbleBackground } from '../animate-ui/components/backgrounds/bubble';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}



export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <BubbleBackground className="w-screen h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </BubbleBackground>
  );
}
