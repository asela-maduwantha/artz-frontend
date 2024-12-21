import  { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={clsx("bg-white rounded-lg shadow-md overflow-hidden", className)}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: CardProps) => {
  return (
    <div className={clsx("p-4 border-b border-gray-200", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }: CardProps) => {
  return (
    <h2 className={clsx("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
};

export const CardDescription = ({ children, className }: CardProps) => {
  return (
    <p className={clsx("text-sm text-gray-500", className)}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className }: CardProps) => {
  return (
    <div className={clsx("p-4", className)}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className }: CardProps) => {
  return (
    <div className={clsx("p-4 border-t border-gray-200", className)}>
      {children}
    </div>
  );
};
