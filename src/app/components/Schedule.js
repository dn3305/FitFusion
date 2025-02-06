'use client'; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUserAlt } from 'react-icons/fa';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('Monday');

  const scheduleData = [
    { day: 'Monday', time: '09:00 - 10:00', course: 'Yoga', coach: 'john', id: 1 },
    { day: 'Monday', time: '10:00 - 11:00', course: 'Pilates', coach: 'f', id: 2 },
    { day: 'Monday', time: '12:00 - 13:00', course: 'Cardio', coach: 'Kennedy', id: 3 },
    { day: 'Monday', time: '14:00 - 15:00', course: 'Zumba', coach: 'John', id: 4 },
    { day: 'Monday', time: '16:00 - 17:00', course: 'HIIT', coach: 'John', id: 5 },
    { day: 'Tuesday', time: '09:00 - 10:00', course: 'Cardio', coach: 'allepey', id: 6 },
    { day: 'Tuesday', time: '10:00 - 11:00', course: 'Pilates', coach: 'Sonu', id: 7 },
    { day: 'Tuesday', time: '12:00 - 13:00', course: 'Yoga', coach: 'Sarah', id: 8 },
    { day: 'Tuesday', time: '14:00 - 15:00', course: 'Stretching', coach: 'laila', id: 9 },
    { day: 'Wednesday', time: '09:00 - 10:00', course: 'Zumba', coach: 'majnu', id: 10 },
    { day: 'Wednesday', time: '11:00 - 12:00', course: 'HIIT', coach: 'dinesh', id: 11 },
    { day: 'Wednesday', time: '13:00 - 14:00', course: 'Boxe', coach: 'sarthak', id: 12 },
    { day: 'Thursday', time: '09:00 - 10:00', course: 'CrossFit', coach: 'Samira', id: 13 },
    { day: 'Thursday', time: '11:00 - 12:00', course: 'Yoga', coach: 'Sarah', id: 14 },
    { day: 'Thursday', time: '13:00 - 14:00', course: 'Cardio', coach: 'Sofia', id: 15 },
    { day: 'Friday', time: '11:00 - 12:00', course: 'Yoga', coach: 'Sarah', id: 16 },
    { day: 'Friday', time: '13:00 - 14:00', course: 'Cardio', coach: 'Sofia', id: 17 }
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="schedule" className="bg-black text-white py-16 px-6 lg:px-48">
      <div className="container mx-auto space-y-16">
       
        <motion.h2
          className="text-4xl font-extrabold text-red-500 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Program Details
        </motion.h2>

     
        <div className="flex flex-wrap justify-center gap-4 sm:flex-col sm:space-y-4 md:flex-row md:space-x-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <motion.button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`py-2 px-6 text-lg font-bold transition-colors duration-300 w-full sm:w-auto ${
                activeTab === day
                  ? 'bg-red-500 text-black rounded-lg'
                  : 'bg-gray-800 text-red-500 rounded-lg'
              }`}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {day}
            </motion.button>
          ))}
        </div>

      
        <motion.div
          className="mt-8"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {scheduleData
            .filter((entry) => entry.day === activeTab)
            .map((entry) => (
              <motion.div
                key={entry.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <FaCalendarAlt className="text-red-500 text-xl" />
                    <motion.p
                      className="text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {entry.time}
                    </motion.p>
                  </motion.div>
                  <motion.div
                    className="text-lg text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {entry.course}
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.p
                      className="text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      {entry.coach}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;
