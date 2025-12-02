import React from "react";
import { FaCopy, FaEdit, FaTrash, FaChartBar, FaQrcode, FaThumbtack } from "react-icons/fa";
import { motion } from "framer-motion";

const FeatureCard= () => {
  const features = [
    { name: "Copy Short URL", icon: <FaCopy className="text-cyan-400" /> },
    { name: "Edit Short URL", icon: <FaEdit className="text-yellow-400" /> },
    { name: "Delete Short URL", icon: <FaTrash className="text-red-500" /> },
    { name: "View Analytics", icon: <FaChartBar className="text-green-400" /> },
    { name: "Generate QR Code", icon: <FaQrcode className="text-purple-400" /> },
    { name: "Pin Important URLs", icon: <FaThumbtack className="text-gray-300" /> },
  ];

  return (
    <div className="py-8 bg-gray-900 text-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Features Available for You</h2>

      <div className="flex flex-wrap justify-center gap-4 px-4">
        {features.map((feature) => (
          <motion.div
            key={feature.name}
            className="flex flex-col items-center justify-center bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 w-36 md:w-44 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <p className="text-center font-medium">{feature.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
