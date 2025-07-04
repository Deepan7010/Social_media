import React, { useState } from "react";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import line4 from "@/assets/img/line4.svg";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
const Journals = () => {
  const [disciplineOpen, setDisciplineOpen] = useState(false);
  const [indexersOpen, setIndexersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // State for selections
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedIndexers, setSelectedIndexers] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const disciplines = [
    "Life Science",
    "Engineering & Technology",
    "Social Science",
    "Humanities",
    "Medical Sciences",
    "Environmental Studies",
    "Physical Sciences",
    "Mathematics & Statistics",
    "Economics & Finance",
    "Law & Political Science",
  ];

  const indexers = ["UGC CARE", "Scopus", "Google Scholar", "WoS", "DOAJ"];
  const sortOptions = [
    "Most Popular",
    "Open Access",
    "Without APC (Free of Charge)",
  ];

  const toggleCheckbox = (value) => {
    setSelectedIndexers((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  return (
    <div>
      <Navbar />
      <div className="mt-8 container mx-auto grid grid-cols-4">
        <div className="col-span-1">
          <div className="max-w-sm mx-auto">
            {/* Filter Card */}
            <div className="border border-gray-400 rounded-lg p-4">
              <h2 className="text-2xl font-semibold">Filter</h2>
              <hr className="border-black w-14 my-2" />

              {/* Discipline / Subject Area */}
              <div>
                <div className="flex justify-between items-center py-6 border-b border-gray-400">
                  <span className="font-medium text-2xl">
                    Discipline / Subject Area
                  </span>
                  <button onClick={() => setDisciplineOpen(!disciplineOpen)}>
                    {disciplineOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {disciplineOpen && (
                  <div className="py-2">
                    {disciplines.map((discipline) => (
                      <label
                        key={discipline}
                        className="text-xl text-gray-600 font-sans font-medium flex items-center py-3"
                      >
                        <input
                          type="radio"
                          name="discipline"
                          value={discipline}
                          checked={selectedDiscipline === discipline}
                          onChange={() => setSelectedDiscipline(discipline)}
                          className="mr-2 w-6 h-6"
                        />
                        {discipline}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Indexers */}
              <div>
                <div className="flex justify-between items-center py-6 border-b border-gray-400">
                  <span className="font-medium text-2xl">Indexers</span>
                  <button onClick={() => setIndexersOpen(!indexersOpen)}>
                    {indexersOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {indexersOpen && (
                  <div className="py-2">
                    {indexers.map((indexer) => (
                      <label
                        key={indexer}
                        className="text-xl text-gray-600 font-sans font-medium flex items-center py-3"
                      >
                        <input
                          type="checkbox"
                          value={indexer}
                          checked={selectedIndexers.includes(indexer)}
                          onChange={() => toggleCheckbox(indexer)}
                          className="mr-2 w-6 h-6"
                        />
                        {indexer}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sort By Card */}
            <div className="border border-gray-400 rounded-lg p-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-2xl">Sort By :</span>
                <button onClick={() => setSortOpen(!sortOpen)}>
                  {sortOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              {sortOpen && (
                <div className="py-2">
                  {sortOptions.map((option) => (
                    <label
                      key={option}
                      className="text-xl text-gray-600 font-sans font-medium flex items-center py-3"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={sortOption === option}
                        onChange={() => setSortOption(option)}
                        className="mr-2 w-6 h-6"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ml-8 col-span-3 space-y-10">
          {/* Search Bar Section */}
          <div
            className="ml-5 w-2/5 border-2 border-gray-400 items-center"
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              padding: "5px 20px",
              borderRadius: "5px",
              height: "60px",
            }}
          >
            <FiSearch
              style={{ marginRight: "12px", fontSize: "28px", color: "gray" }}
            />
            <input
              type="text"
              placeholder="Search for Journals"
              style={{
                border: "none",
                outline: "none",
                fontSize: "20px",
              }}
            />
          </div>

          <div className="ml-7 flex max-w-4xl mx-auto space-x-8">
            {/* Left Image Section */}
            <div className="w-auto h-full">
              <img
                src="./book.jpg"
                alt="Notebook"
                className=" object-cover w-full h-full"
              />
            </div>

            {/* Right Content Section */}
            <div className="w-3/4">
              <h2 className="text-xl  font-bold mb-2">
                The Future of Quantum Computing: Transforming IT Landscapes
              </h2>
              <p className="text-gray-800 font-bold mb-2">DOI Number</p>
              <div>
                <p className="font-mono mb-2">Publisher</p>
                <p className="font-mono mb-2">ESTD year:</p>
              </div>
              {/* Publisher and Details Section */}
              <div className="flex justify-between text-gray-700">
                <div>
                  <p className="font-mono mt-2">e-ISSN:</p>
                </div>
                <p className="font-mono mt-2">p-ISSN:</p>
                <div>
                  <Link
                    to={"/journals/journal-details"}
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-mono"
                  >
                    View more
                  </Link>
                </div>
              </div>

              {/* View More Button */}
            </div>
          </div>
          <img
            className="line4"
            alt="Line"
            src={line4}
            style={{
              width: "90%",
              marginTop: "20px",
              marginLeft: "1.75rem",
            }}
          />
          <div className="ml-7 flex max-w-4xl mx-auto space-x-8">
            {/* Left Image Section */}
            <div className="w-auto h-full">
              <img
                src="./book.jpg"
                alt="Notebook"
                className=" object-cover w-full h-full"
              />
            </div>

            {/* Right Content Section */}
            <div className="w-3/4">
              <h2 className="text-xl  font-bold mb-2">
                The Future of Quantum Computing: Transforming IT Landscapes
              </h2>
              <p className="text-gray-800 font-bold mb-2">DOI Number</p>
              <div>
                <p className="font-mono mb-2">Publisher</p>
                <p className="font-mono mb-2">ESTD year:</p>
              </div>
              {/* Publisher and Details Section */}
              <div className="flex justify-between text-gray-700">
                <div>
                  <p className="font-mono mt-2">e-ISSN:</p>
                </div>
                <p className="font-mono mt-2">p-ISSN:</p>
                <div>
                  <Link
                    to={"/journals/journal-details"}
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-mono"
                  >
                    View more
                  </Link>
                </div>
              </div>

              {/* View More Button */}
            </div>
          </div>
          <img
            className="line4"
            alt="Line"
            src={line4}
            style={{
              width: "90%",
              marginTop: "20px",
              marginLeft: "1.75rem",
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Journals;
