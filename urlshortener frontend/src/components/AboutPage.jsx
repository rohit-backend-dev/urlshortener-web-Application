import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBolt,
  FaChartLine,
  FaShieldAlt,
  FaShareSquare,
  FaMobileAlt,
  FaLink,
  FaChartPie,
  FaLock,
} from "react-icons/fa";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen px-5 sm:px-8 lg:px-14 py-10">

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-10 max-w-6xl mx-auto mb-16">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Shorten, Track & Control Your Links
          </h1>

          <p className="text-gray-400 text-lg mt-4">
            Shortify helps you convert long URLs into smart, trackable short links to boost sharing, branding, and analytics.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 text-black font-semibold px-6 py-3 rounded-xl transition"
          >
            Start Free
          </button>
        </motion.div>

        {/* Hero Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center w-full max-w-lg"
        >
          <FaLink className="text-cyan-400 w-48 h-48" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">What You Get</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, desc }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow hover:scale-[1.03] transition flex flex-col items-center text-center"
            >
              <div className="text-8xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-400 text-sm mt-1">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Analytics + Security Section */}
      <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center w-full max-w-lg"
        >
          <FaChartPie className="text-yellow-400 w-48 h-48" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-3xl font-bold mb-4">Analytics & Security</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Get real-time click tracking, location statistics, device breakdowns, and security options like password protection, expiry control, and custom branding.
          </p>
          <div className="flex gap-8">
            <FaShieldAlt className="text-purple-400 w-16 h-16" />
            <FaLock className="text-red-400 w-16 h-16" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const FEATURES = [
  { icon: <FaLink className="text-cyan-400" />, title: "Smart Short Links", desc: "Generate custom branded short URLs." },
  { icon: <FaShareSquare className="text-green-400" />, title: "Easy Sharing", desc: "Share links seamlessly across platforms." },
  { icon: <FaChartLine className="text-yellow-400" />, title: "Deep Analytics", desc: "Track location, clicks, devices and referrals." },
  { icon: <FaShieldAlt className="text-purple-400" />, title: "Security Controls", desc: "Password protection and expiry scheduling." },
  { icon: <FaBolt className="text-red-400" />, title: "Fast Redirects", desc: "Instant redirection with optimized performance." },
  { icon: <FaMobileAlt className="text-blue-400" />, title: "Mobile Friendly", desc: "Fully responsive UI for all screen sizes." },
];

export default AboutPage;
