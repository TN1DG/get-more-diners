import React from 'react'
import { motion } from 'framer-motion'
import { fadeInVariants, slideUpVariants, staggerContainerVariants } from '../../lib/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'stagger'
  delay?: number
}

const getVariants = (animation: string) => {
  switch (animation) {
    case 'fadeIn':
      return fadeInVariants
    case 'slideUp':
      return slideUpVariants
    case 'stagger':
      return staggerContainerVariants
    default:
      return fadeInVariants
  }
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0
}) => {
  const variants = getVariants(animation)
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}
