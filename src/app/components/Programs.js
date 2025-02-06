import { motion } from 'framer-motion';

export default function Programs() {
  return (
    <section id="programs" className="py-16 bg-secondary text-text-color">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8" style={{ textShadow: 'var(--neon-glow)' }}>
          Our Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Strength Training',
              desc: 'Build strength and stamina.',
              icon: ' ',
            },
            {
              title: 'Cardio Workouts',
              desc: 'Boost your endurance.',
              icon: ' ',
            },
            {
              title: 'Body Building',
              desc: 'Achieve your dream physique.',
              icon: ' ',
            },
            {
              title: 'Weight Loss',
              desc: 'Lose weight effectively.',
              icon: ' ',
            },
          ].map((program, index) => (
            <motion.div
              key={index}
              className="p-6 bg-secondary border border-primary-color rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                {program.icon} {program.title}
              </h3>
              <p className="text-lg">{program.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
