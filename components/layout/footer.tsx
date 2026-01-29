"use client";
import React from "react";
import { QuoteModal } from "../custom/QuoteModal";

const Footer = () => {
  const [isQuoteModalOpen, setQuoteModalOpen] = React.useState(false);

  return (
    <footer className="w-full dark:bg-gradient-to-r dark:from-[#08090D] dark:to-background  py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Main CTA */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold">
              Innovate tech that stands out with{" "}
              <span className="font-extrabold bg-gradient-to-r from-gray-800 to-gray-500 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">
                TACTECH
              </span>
            </h2>
            <p className="text-primary">
              Building tomorrow's digital landscape today. We deliver
              cutting-edge technology solutions that drive paradigm shifts and business 
              transformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium  transition-colors"
              >
                Contact Us
              </button>
              {/* <button className="px-6 py-3 border border-gray-600 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Talk to us
              </button> */}
            </div>
          </div>

          {/* Column 2 - Testimonial */}
          <div className="lg:col-span-2 space-y-6">
            <div className=" p-6 rounded-xl border border-gray-800 from-primary/80 dark:from-background dark:to-blue-900/80 to-blue-500/80 text-primary">
              <p className=" italic">
                "Omer was such a pleasure to work with. Talented, communicative
                and fast. Highly recommendeded!"
              </p>
              <div className="mt-4">
                <p className="font-bold">George Roros</p>
                <p className="">Founder at Volume Up Agency</p>
              </div>
            </div>
          </div>

          {/* Bottom row - Links and copyright */}
          <div className="md:col-span-2 lg:col-span-4 border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="0">
                © {new Date().getFullYear()} Tactech. All rights reserved.
              </div>
           
            </div>
          </div>
        </div>
      </div>
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
