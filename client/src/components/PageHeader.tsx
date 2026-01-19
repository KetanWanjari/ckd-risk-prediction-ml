import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageAlt?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary text-white p-8 md:p-12 mb-10 shadow-2xl shadow-primary/20 ${className}`}>
      <div className="relative z-10 max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-blue-50 leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      </div>
      
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-20 -mb-20 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />
    </div>
  );
}
