import { Variants } from "framer-motion"

// Base animation durations
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.4,
  slow: 0.6,
}

// Fade animation variants
export const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: "easeInOut",
    }
  }
}

// Slide up animation variants
export const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 60,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: "easeInOut",
    }
  }
}

// Slide in from left
export const slideInLeftVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: -60,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: "easeOut",
    }
  }
}

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: 60,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: "easeOut",
    }
  }
}

// Scale animation variants
export const scaleInVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: "easeInOut",
    }
  }
}

// Modal animation variants
export const modalVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.75,
    y: 20,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    y: 20,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: "easeInOut",
    }
  }
}

// Container variants for staggered animations
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: "easeInOut",
    },
  },
}

// Hover animation variants for buttons
export const buttonHoverVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
}

// Card hover variants
export const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: "easeOut",
    },
  },
}

// Parallax scroll utility
export const useParallax = (value: number, distance: number) => {
  return value * distance
}
