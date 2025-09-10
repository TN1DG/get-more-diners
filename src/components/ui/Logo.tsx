import React from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  showTagline?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'white' | 'dark'
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showTagline = true, 
  size = 'md', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: {
      icon: 'h-6 w-6',
      text: 'text-lg',
      tagline: 'text-xs',
      container: 'gap-2'
    },
    md: {
      icon: 'h-9 w-9',
      text: 'text-2xl',
      tagline: 'text-sm',
      container: 'gap-3'
    },
    lg: {
      icon: 'h-12 w-12',
      text: 'text-3xl',
      tagline: 'text-base',
      container: 'gap-4'
    }
  }

  const variantClasses = {
    default: {
      icon: 'text-primary',
      text: 'text-foreground',
      tagline: 'text-muted-foreground'
    },
    white: {
      icon: 'text-white',
      text: 'text-white',
      tagline: 'text-white/80'
    },
    dark: {
      icon: 'text-foreground',
      text: 'text-foreground',
      tagline: 'text-muted-foreground'
    }
  }

  const currentSize = sizeClasses[size]
  const currentVariant = variantClasses[variant]

  return (
    <motion.div 
      className={`flex items-center ${currentSize.container} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        {/* Restaurant-themed SVG logo */}
        <svg 
          viewBox="0 0 40 40" 
          className={`${currentSize.icon} ${currentVariant.icon}`}
          fill="currentColor"
        >
          {/* Plate base */}
          <circle 
            cx="20" 
            cy="20" 
            r="18" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            opacity="0.3"
          />
          
          {/* Chef hat */}
          <path 
            d="M12 15c0-4.5 3.5-8 8-8s8 3.5 8 8c0 2-1 3-2 4v6c0 1-1 2-2 2h-8c-1 0-2-1-2-2v-6c-1-1-2-2-2-4z" 
            opacity="0.9"
          />
          
          {/* Chef hat band */}
          <rect 
            x="12" 
            y="23" 
            width="16" 
            height="2" 
            rx="1"
          />
          
          {/* Fork on left */}
          <g opacity="0.7">
            <line x1="6" y1="12" x2="6" y2="28" strokeWidth="1.5" stroke="currentColor"/>
            <line x1="4" y1="12" x2="4" y2="16" strokeWidth="1.5" stroke="currentColor"/>
            <line x1="8" y1="12" x2="8" y2="16" strokeWidth="1.5" stroke="currentColor"/>
          </g>
          
          {/* Knife on right */}
          <g opacity="0.7">
            <line x1="34" y1="12" x2="34" y2="28" strokeWidth="1.5" stroke="currentColor"/>
            <path d="M32 12 L36 12 L34 16 Z" stroke="currentColor" strokeWidth="1"/>
          </g>
          
          {/* Sparkle accents */}
          <g opacity="0.6">
            <circle cx="26" cy="10" r="1" fill="currentColor"/>
            <circle cx="14" cy="30" r="0.8" fill="currentColor"/>
            <circle cx="30" cy="30" r="0.8" fill="currentColor"/>
          </g>
        </svg>
      </motion.div>
      
      <div className="flex flex-col">
        <motion.h1 
          className={`${currentSize.text} font-serif font-bold ${currentVariant.text} leading-tight`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Get More Diners
        </motion.h1>
        
        {showTagline && (
          <motion.p 
            className={`${currentSize.tagline} ${currentVariant.tagline} font-medium leading-tight`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Fill your tables, grow your restaurant
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
