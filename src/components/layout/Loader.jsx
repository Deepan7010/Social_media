import {React, useEffect, useState } from "react";

import { Grid } from "ldrs/react";

import "ldrs/react/Grid.css";

const Loader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [gridDimension, setGridDimension] = useState({ size: 200 });

  // Animated color state
  const [gridColor, setGridColor] = useState("#000080");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth > 300 && windowWidth < 540) {
      setGridDimension({ size: 100 });
    } else {
      setGridDimension({ size: 200 });
    }
  }, [windowWidth]);

  useEffect(() => {
    const colors = ["#00c3ff", "#000080", "black"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setGridColor(colors[index]);
    }, 1700);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
        <style>{`
        @keyframes bluePulse {
          0%, 100% { color: #00c3ff; }
          50% { color: #000080; }
          75% { color: black; }
        }
      `}</style>

        <div className="xss:w-44 xss:h-36 md:w-52 md:h-40 lg:w-full lg:h-auto flex flex-col space-y-3 items-center">
          <div>
            <Grid size={gridDimension.size} speed="1.5" color={gridColor} />
          </div>
          <h1
            className="text-center w-full xss:text-2xl lg:text-3xl font-mono font-semibold text-gray-900"
            style={{
              animation: "bluePulse 2s infinite",
            }}
          >
            Loading Data...
          </h1>
        </div>
      </div>
    </>
  );
};

export default Loader;
