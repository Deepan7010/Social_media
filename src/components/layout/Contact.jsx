import React from "react";

import ContactImg from "@/assets/svg/contact.svg?react";

const Contact = () => {
  return (
    <div className="mt-12">
      <h1 className="text-center xss:text-3xl sm:text-5xl font-bold">
        Contact Us
      </h1>
      <div className="flex mx-5 md:mx-12 gap-10">
        <div className="w-[45%] hidden lg:block">
          <ContactImg className="w-full h-auto" />
        </div>
        <div className="my-2 lg:my-10 border-2 lg:border-none shadow-md w-[100%] lg:w-[65%]">
          <div className="flex flex-col md:flex-row gap-5 mx-5 py-10 px-0 sm:px-5 ">
            <input
              type="text"
              placeholder="Your Name *"
              className="py-2 px-5 outline-none w-full"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            <input
              type="text"
              placeholder="Your Email *"
              className="py-2 px-5 outline-none w-full"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            <input
              type="text"
              placeholder="Your Phone *"
              className="py-2 px-5 outline-none w-full"
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </div>
          <div className="w-full px-5 sm:px-10">
            <textarea
              name="Your Message"
              rows={8}
              style={{ backgroundColor: "#F5F5F5", resize: "none" }}
              className="w-full outline-none px-5 pt-5"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="text-right pr-10 mb-10">
            <button className="bg-primary mt-6 px-6 py-2 rounded-md text-white">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
