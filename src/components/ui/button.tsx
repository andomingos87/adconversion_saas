import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#125CC6] text-white hover:bg-[#125CC6]/90': variant === 'primary',
            'border border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:text-[#125CC6]':
              variant === 'secondary',
            'text-[#1E2329] hover:bg-[#E6E8EA]/50': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-11 px-5 text-base': size === 'lg'
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button' 