import React from "react";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

const startups = [
  { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com" },
  { name: "Notion", logo: "https://logo.clearbit.com/notion.so" },
  { name: "Figma", logo: "https://logo.clearbit.com/figma.com" },
  { name: "Canva", logo: "https://logo.clearbit.com/canva.com" },
  { name: "Airtable", logo: "https://logo.clearbit.com/airtable.com" },
  { name: "Zapier", logo: "https://logo.clearbit.com/zapier.com" },
];

const Companies = () => {
  return (
    <div className="bg-gray-900 py-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center items-center gap-2 mb-3">
          <Link2 className="w-8 h-8 text-cyan-400 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trusted by Fast-Growing Startups
          </h2>
        </div>
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
          Join these innovative startups leveraging Shortify to streamline their link management.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {startups.map((startup, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-lg bg-gray-900 p-2 flex items-center justify-center shadow-inner">
              <img
                src={startup.logo}
                alt={startup.name}
                className="w-full h-full object-contain"
                onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
              />
            </div>
            <p className="mt-3 text-white font-medium text-sm">{startup.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
