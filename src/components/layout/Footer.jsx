import React, { useContext } from "react";

import { Link } from "react-router-dom";

import devicon from "@/assets/img/devicon-twitter.svg";
import epback from "@/assets/img/epback.png";
import hugeicons from "@/assets/img/hugeicons-instagram.svg";
import iconoir from "@/assets/img/iconoir-facebook.svg";
import { Context } from "@/index.jsx";

function Footer() {
  const { popup } = useContext(Context);
  return (
    <div
      className={
        popup
          ? " bg-black bg-opacity-50 xss:py-4 xss:px-3 xs:py-8 xs:px-8 relative"
          : "text-white xss:py-4 xss:px-3 xs:py-8 xs:px-8 relative bg-primary"
      }
    >
      {/* Inline styles to replace Footer.css */}
      <style>{`
        .p {
          color: #ffffff;
          font-family: 'Montserrat', Helvetica;
          font-size: 18px;
          font-weight: 100;
        }
        .head {
          font-family: 'Playfair Display', serif;
          font-weight: 400;
        }
      `}</style>
      {/* Gray Overlay */}
      <div className="absolute inset-0 bg-gray-200 opacity-25 bg-cover"></div>

      <footer className="relative max-w-[90%] mx-auto flex flex-col items-center my-8">
        {/* Newsletter Section */}
        <div className="w-full text-center xss:mb-4 md:mb-6 lg:mb-16 py-6 border-b border-gray-50 border-opacity-20 md:grid md:grid-cols-5 lg:grid-cols-5">
          <div className="col-span-2 text-center md:text-left lg:ml-12 space-y-2">
            <p className="p">News Letter</p>
            <h3 className="head text-3xl lg:text-4xl">Get Monthly Updates</h3>
          </div>
          <div className="col-span-3 max-w-4xl">
            <div className="flex justify-between border-b border-opacity-80 text-left border-gray-300 pb-2">
              <h5 className="mt-4 p">
                Enter your Email address and get updates directly to your email
              </h5>
              <img
                alt="arrow"
                className="xss:mt-7 md:mt-5 lg:mt-[12px] mt-[8px] md:mr-12"
                src={epback}
                style={{
                  height: "28px",
                  width: "72px",
                }}
              ></img>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full md:text-left mb-8">
          {/* Social Media Section */}
          <div className="lg:ml-8 mt-16 col-span-1 xss:mx-auto xs:mx-0">
            <p className="font-semibold mb-4 text-white text-xl">
              Follow Us On
            </p>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-6 w-6" src={iconoir} alt="Facebook" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-6 w-6" src={hugeicons} alt="Instagram" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-6 w-6" src={devicon} alt="Twitter" />
              </a>
            </div>
          </div>

          <div className="lg:ml-8 col-span-3 max-w-4xl grid grid-cols-3">
            <div className="text-center xs:text-left">
              <h4 className="font-semibold text-xl mb-4">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/journals">Journals</Link>
                </li>
                <li>
                  <Link to="/updates">Latest Updates</Link>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="text-center xs:text-left">
              <h4 className="font-semibold text-xl mb-4">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/institutions">Institutions</Link>
                </li>
                <li>
                  <Link to="/research">Research</Link>
                </li>
                <li>
                  <Link to="/terms">Terms & Condition</Link>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="text-center xs:text-left">
              <h4 className="font-semibold text-xl mb-4">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/guidelines">Guidelines</Link>
                </li>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
