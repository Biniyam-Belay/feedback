import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaApple, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <FaApple className="text-3xl" />
        <nav className="space-x-6">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">Products</a>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="hover:text-gray-400">Support</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-4"
        >
          Welcome to Apple Experience
        </motion.h1>
        <p className="text-lg text-gray-400 mb-6">
          Discover the latest innovations in technology.
        </p>
        <Button className="bg-white text-black px-6 py-2 rounded-full text-lg">
          Explore Now
        </Button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16">
        <Card className="bg-gray-900 text-white p-6 rounded-xl">
          <CardContent>
            <h3 className="text-2xl font-semibold mb-2">Sleek Design</h3>
            <p className="text-gray-400">Minimalist aesthetics with precision craftsmanship.</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 text-white p-6 rounded-xl">
          <CardContent>
            <h3 className="text-2xl font-semibold mb-2">Advanced Performance</h3>
            <p className="text-gray-400">Powerful hardware optimized for efficiency.</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 text-white p-6 rounded-xl">
          <CardContent>
            <h3 className="text-2xl font-semibold mb-2">Seamless Experience</h3>
            <p className="text-gray-400">Integrates effortlessly across all Apple devices.</p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-8 py-6 mt-auto">
        <div className="flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Apple Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
