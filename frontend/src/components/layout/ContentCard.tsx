import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function ContentCard({ children, className, title }: ContentCardProps) {
  return (
    <div
      className={cn(
        'bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 p-8',
        'transition-all duration-300 hover:shadow-2xl hover:bg-white/25',
        className
      )}
    >
      {title && (
        <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
