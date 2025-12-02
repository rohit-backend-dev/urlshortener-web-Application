import React from "react";
import { motion } from "framer-motion";
import { FiGlobe, FiLink, FiCpu, FiTarget } from "react-icons/fi";

const analyticsData = [
  {
    icon: <FiGlobe />,
    value: "600K+",
    label: "Global Paying Customers",
    description: "Adopted and loved by millions of users for over a decade.",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    icon: <FiLink />,
    value: "256M",
    label: "Links & QR Codes Created",
    description: "Connectivity and digital access at scale with real-time link creation.",
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-500",
  },
  {
    icon: <FiCpu />,
    value: "800+",
    label: "App Integrations",
    description: "Seamlessly connect with your favorite apps and tools.",
    bgColor: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    icon: <FiTarget />,
    value: "10B",
    label: "Connections (Clicks & Scans)",
    description: "Track clicks and scans with precision across the globe.",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

const Analytics = () => {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Analytics That Drive Results
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          Track performance, understand users, and scale smarter with our advanced analytics.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {analyticsData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-gray-200 rounded-[3rem] overflow-hidden p-12 shadow-2xl hover:shadow-3xl transition-all flex flex-col items-center text-center"
          >
            <div
              className={`${item.bgColor} rounded-full p-6 mb-8 flex items-center justify-center`}
            >
              {React.cloneElement(item.icon, { className: `${item.iconColor} text-6xl` })}
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-2">{item.value}</h3>
            <p className="text-gray-700 font-semibold text-lg mb-4">{item.label}</p>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Analytics;
