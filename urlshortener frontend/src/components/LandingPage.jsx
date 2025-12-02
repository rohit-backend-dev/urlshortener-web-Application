import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { FaLink, FaChartLine, FaLock, FaRocket } from "react-icons/fa";
import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";
import Companies from "./Companies";
import image from "../assets/image.png"; // Existing imported image
import FeatureCard from "./FeatureCard";
import Analytics from "./Analytics";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  const dashBoardNavigateHandler = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-28 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Shorten URLs. Track Performance. Boost Engagement.
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Simplify your link management with Shortify. Generate short, memorable URLs and gain insights with real-time analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={dashBoardNavigateHandler}
                className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Manage Links
              </button>
              <button
                onClick={dashBoardNavigateHandler}
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-indigo-600 transition-all"
              >
                Create Short Link
              </button>
            </div>
          </motion.div>

          {/* Hero Images Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex gap-0 max-w-md overflow-hidden rounded-xl shadow-2xl"
          >
            {/* First image */}
            <img
              src={image}
              alt="Shortify Dashboard"
              className="w-1/2 object-cover"
            />
            {/* Second image */}
            <img
              src="/image.png"
              alt="Public Folder Image"
              className="w-1/2 object-cover"
            />
          </motion.div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          All-in-One URL Management
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            title="Simple URL Shortening"
            desc="Create memorable URLs in just a few clicks with our intuitive interface."
            icon={<FaLink className="text-3xl text-indigo-600" />}
          />
          <Card
            title="Powerful Analytics"
            desc="Track clicks, locations, and referral sources to optimize your strategy."
            icon={<FaChartLine className="text-3xl text-indigo-600" />}
          />
          <Card
            title="Enhanced Security"
            desc="All links are protected with advanced encryption and secure redirects."
            icon={<FaLock className="text-3xl text-indigo-600" />}
          />
          <Card
            title="Fast & Reliable"
            desc="Enjoy high uptime and lightning-fast redirects for all your links."
            icon={<FaRocket className="text-3xl text-indigo-600" />}
          />
        </div>
      </section>

      {/* Feature Highlights */}
      <FeatureCard />

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Shortify?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="font-semibold text-xl mb-3">Easy to Use</h3>
            <p>
              Shortify’s interface is intuitive and beginner-friendly, making URL management effortless.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="font-semibold text-xl mb-3">Comprehensive Analytics</h3>
            <p>
              Gain actionable insights on link performance with detailed analytics and reporting.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="font-semibold text-xl mb-3">Secure & Scalable</h3>
            <p>
              Enterprise-level security and scalable infrastructure ensures your links remain safe and reliable.
            </p>
          </div>
        </div>
      </section>
    <Analytics />
      {/* Companies / Startups */}
      <Companies />

    </div>
  );
};

export default LandingPage;
