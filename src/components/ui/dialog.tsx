'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      onKeyDown={handleEscape}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

interface DialogTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
  asChild?: boolean;
}

export function DialogTrigger({ children, onClick, asChild = false }: DialogTriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: onClick,
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  );
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function DialogContent({ className, children, onClose }: DialogContentProps) {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative',
      className
    )}>
      {onClose && (
        <button 
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 text-left mb-4', className)}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn('text-sm text-gray-600', className)}>
      {children}
    </p>
  );
}
