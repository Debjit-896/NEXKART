import React from "react";
import { MessageCircle, Phone, Apple, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0A88FF] text-white pt-8 pb-4">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-8 md:mb-6">
        {/* Column 1: Contact Info */}
        <div className="flex flex-col gap-5 md:gap-4">
          <Link to="/" className="inline-block mb-1 -ml-2">
            <img
              src="/logo.png"
              alt="NextKart Logo"
              className="w-[150px] md:w-[170px] max-w-none mix-blend-multiply"
            />
          </Link>

          <div className="space-y-2">
            <h3 className="font-medium text-base">Contact Us</h3>
            <div className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-xs opacity-90">WhatsApp</p>
                <p className="text-sm font-medium">+91 81006 58029</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-xs opacity-90">Call Us</p>
                <p className="text-sm font-medium">+91 81006 58029</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <h3 className="font-medium text-base">Download App</h3>
            <div className="flex gap-2">
              <a
                href="#"
                className="bg-black hover:bg-gray-800 transition-colors rounded-md px-2 py-1.5 flex items-center gap-1.5"
              >
                <Apple size={20} className="text-white" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase leading-none opacity-80">
                    Download on the
                  </span>
                  <span className="text-xs font-semibold leading-tight">
                    App Store
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="bg-black hover:bg-gray-800 transition-colors rounded-md px-2 py-1.5 flex items-center gap-1.5"
              >
                <Play size={16} className="text-blue-400" fill="currentColor" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase leading-none opacity-80">
                    GET IT ON
                  </span>
                  <span className="text-xs font-semibold leading-tight">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Most Popular Categories */}
        <div className="relative">
          <h3 className="font-medium text-base mb-4 border-b border-white/20 pb-1 inline-block">
            Most Popular Categories
          </h3>
          <ul className="space-y-2 flex flex-col items-start relative z-10">
            {[
              "Staples",
              "Beverages",
              "Personal Care",
              "Home Care",
              "Baby Care",
              "Vegetables & Fruits",
              "Snacks & Foods",
              "Dairy & Bakery",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs opacity-90 hover:opacity-100 hover:translate-x-1 transition-all cursor-pointer"
              >
                <span className="w-1 h-1 bg-white rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Customer Services */}
        <div className="relative">
          <h3 className="font-medium text-base mb-4 border-b border-white/20 pb-1 inline-block">
            Customer Services
          </h3>
          <ul className="space-y-2 flex flex-col items-start relative z-10">
            {[
              "About Us",
              "Terms & Conditions",
              "FAQ",
              "Privacy Policy",
              "E-waste Policy",
              "Cancellation & Return Policy",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs opacity-90 hover:opacity-100 hover:translate-x-1 transition-all cursor-pointer"
              >
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <Link to="#">{item}</Link>
              </li>
            ))}
          </ul>

          {/* Decorative Circle matching the design */}
          <div className="absolute top-0 right-0 md:-right-12 translate-x-1/2 -translate-y-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>
      </div>

      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-center md:text-left text-xs opacity-80">
          © 2026 All rights reserved. NexKart Marketplace Private Limited.
        </p>
        <p className="text-center md:text-right text-xs opacity-80">
          Designed and developed by{" "}
          <span className="font-semibold text-white">Debjit</span>
        </p>
      </div>
    </footer>
  );
}
