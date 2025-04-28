import Section from "./Section";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative flex flex-col-reverse md:flex-row items-center justify-between bg-gray-100 dark:bg-gray-900 p-6 md:p-12">
        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 bg-white dark:bg-[#1e1e2f] text-[#4b0082] dark:text-purple-300 p-6 md:p-10 rounded-lg shadow-md"
        >
          <h1 className="text-4xl font-extrabold leading-tight">
            Empower Your Future with Abyasika
          </h1>
          <p className="text-lg mt-4 text-gray-700 dark:text-purple-200">
            Explore the world of development, build real-world projects, and
            unlock limitless career opportunities. Start your journey with us
            today.
          </p>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="/mainimage.jpeg"
            alt="Learning"
            className="max-h-[400px] w-auto object-cover rounded-md shadow-lg"
          />
        </motion.div>
      </div>

      {/* Courses Section */}
      <div className="mt-10 px-4 md:px-10">
        <p className="font-bold text-4xl text-[#4b0082] dark:text-purple-300">
          What to learn next
        </p>
        <p className="font-semibold text-2xl mt-3 text-gray-800 dark:text-purple-400">
          Popular Courses in Development
        </p>
        <div className="my-4">
          <Section />
        </div>
      </div>
    </div>
  );
};

export default Home;
