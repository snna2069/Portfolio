import React from 'react';
import { motion } from 'framer-motion';

interface TimelineProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  limit?: number;
  className?: string;
}

const Timeline = ({ items, renderItem, limit, className = '' }: TimelineProps) => {
  const list = typeof limit === 'number' ? items.slice(0, limit) : items;

  return (
    <div className={className}>
      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1e3a5f]/20 via-[#1e3a5f]/40 to-[#1e3a5f]/20 transform -translate-x-1/2" />
        <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1e3a5f]/20 via-[#1e3a5f]/40 to-[#1e3a5f]/20" />

        <div className="space-y-16 lg:space-y-24">
          {list.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative"
              >
                {/* Curved connector line - desktop only (between items) */}
                {index < list.length - 1 && (
                  <svg
                    className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 w-32 h-24 overflow-visible"
                    viewBox="0 0 128 96"
                    fill="none"
                  >
                    <motion.path
                      d={isLeft ? "M64 0 Q64 48 96 48 Q128 48 128 96" : "M64 0 Q64 48 32 48 Q0 48 0 96"}
                      stroke="#1e3a5f"
                      strokeWidth="2"
                      strokeOpacity="0.3"
                      fill="none"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                )}
                <div className={`flex items-start gap-6 lg:gap-0 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'} ml-16 lg:ml-0`}>
                    {renderItem(item, index)}
                  </div>

                  <div className="absolute left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.12 }}
                      className="relative"
                    >
                      <div className="w-8 h-8 rounded-full bg-white border-4 border-[#1e3a5f] shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#1e3a5f]" />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#1e3a5f]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  <div className="hidden lg:block flex-1" />
                </div>
              </motion.div>
            );
          })}

          {/* End marker: animated horizontal line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute bottom-0 left-8 lg:left-1/2 transform lg:-translate-x-1/2 flex justify-center w-full">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ transformOrigin: 'center' }}
                className="bg-[#1e3a5f]/20 h-1 rounded w-32 lg:w-48"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
