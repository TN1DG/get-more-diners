import React from 'react'
import { motion } from 'framer-motion'
import { cardHoverVariants, slideUpVariants } from '../../lib/animations'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  onClick?: () => void
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  onClick
}) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={slideUpVariants}
      whileHover={hoverEffect ? { y: -8, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
