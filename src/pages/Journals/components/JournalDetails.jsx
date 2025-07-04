import React, { useState } from "react";

import { CiBookmark, CiShare2 } from "react-icons/ci";
import { HiDownload } from "react-icons/hi";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
const JournalDetails = () => {
  const [expanded, setExpanded] = useState(false);

  // List of indexers with dummy icons (you can replace with actual images)
  const indexers = [
    { name: "Google Scholar", icon: "/scholar.png" },
    { name: "DOAJ", icon: "/DOAJ.png" },
    { name: "Mendeley", icon: "/mendely.png" },
    { name: "WorldCat", icon: "/world.png" },
    { name: "Peer - Reviewed only", icon: "/peer.png" },
    { name: "Open access journal", icon: "/open.png" },
    { name: "Google Scholar", icon: "/scholar.png" },
    { name: "DOAJ", icon: "/DOAJ.png" },
    { name: "Mendeley", icon: "/mendely.png" },
    { name: "WorldCat", icon: "/world.png" },
    { name: "Peer - Reviewed only", icon: "/peer.png" },
    { name: "Open access journal", icon: "/open.png" },
  ];
  return (
    <div>
      <Navbar />
      <div className="mt-8 container mx-auto grid grid-cols-5">
        <div className="col-span-3 ">
          <div className="max-w-4xl border-r-2 border-gray-400">
            {/* Filter Card */}
            <div className="flex max-w-4xl mx-auto space-x-8 mb-5">
              {/* Left Image Section */}
              <div className="w-5/12 h-full">
                <img
                  src="/book.jpg"
                  alt="Notebook"
                  className=" object-cover w-full"
                />
              </div>

              {/* Right Content Section */}
              <div className="w-3/4">
                <h2 className="text-xl  font-bold mb-4">
                  The Future of Quantum Computing: Transforming IT Landscapes
                </h2>

                <div className="flex justify-between mb-2">
                  <div className="flex flex-col space-y-5 text-gray-500">
                    <p className="font-mono ">Publisher</p>
                    <p className="font-mono ">e-ISSN:</p>
                    <p className="font-mono ">Issue Frequency: Quaterly</p>
                    <p className="font-mono ">Impact Factor: 7.37</p>
                    <p className="font-mono ">APC: Yes</p>
                    <p className="font-mono ">ESTD year:</p>
                  </div>
                  <div className="flex flex-col space-y-5 mt-4 mr-4 text-gray-500">
                    <p className="font-mono ">Language:</p>
                    <p className="font-mono ">Country: India</p>
                    <p className="font-mono ">DOI: Yes</p>
                    <p className="font-mono ">Impact Factor: 7.37</p>
                    <p className="font-mono ">Mobile:</p>
                    <p className="font-mono">Email:</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="text-black border-2 border-gray-400 rounded-3xl">
                    <p className="font-mono font-thin py-2 px-4 text-md">
                      Multidisciplinary
                    </p>
                  </div>
                  <div className="text-black border-2 border-gray-400 rounded-3xl">
                    <p className="font-mono font-thin py-2 px-4 text-md">
                      Engineering
                    </p>
                  </div>

                  <div className="text-gray-400 ">
                    <p className="font-mono font-semibold pt-3 text-md text-lg">
                      +15
                    </p>
                  </div>
                </div>
                {/* Publisher and Details Section */}
              </div>
            </div>

            <div>
              <h1 className="font-semibold text-gray-600 text-2xl">
                Journal Description
              </h1>
              <p className="font-medium mt-4 mr-4 text-gray-400 text-md">
                hdvbcdvv vhduyg vgdv v v gyvydgyvdvvgyv v yvg yvgyvayv v v we v
                yvgyegvyeyvevev v evgevuygeyvyveveve vgeyvgyiegvievuevwev e vu
                weugvegveveve ve vgweveuvgev ev v ev e gvygeyvgie vg eyve vwev
                ye gvygweyvg weygyw fwfwguy fgeyfge f fefgwe fg2 fi2ef yuyf23f
                23gf 2fyg2eyfg2efef 2 f2eg f 2eyfgq2eyifgy2 ey2 ef e fgqwef
                u2efyu2egfuygqeyfefe fe f gqweyywqegf ygef2e4f e ueg fuyeg2yf y
                2ef2egf e yf gef y2egfyqwgeyfyf2ef fegfgq2eyfgqwegei.
              </p>
              <p className="font-medium my-6 mr-8 text-gray-400 text-md ">
                hdvbcdvv vhduyg vgdv v v gyvydgyvdvvgyv v yvg yvgyvayv v v we v
                yvgyegvyeyvevev v evgevuygeyvyveveve vgeyvgyiegvievuevwev e vu
                weugvegveveve ve vgweveuvgev ev v ev e gvygeyvgie vg eyve vwev
                ye gvygweyvg weygyw fwfwguy fgeyfge f fefgwe fg2 fi2ef yuyf23f
                23gf 2fyg2eyfg2efef 2 f2eg f 2eyfgq2eyifgy2 ey2 ef e fgqwef
                u2efyu2egfuygqeyfefe fe f gqweyywqegf ygef2e4f e ueg fuyeg2yf y
                2ef2egf e yf gef y2egfyqwgeyfyf2ef fegfgq2eyfgqwegei.
              </p>
            </div>

            <div className="">
              <h1 className="font-semibold text-gray-600 text-2xl mb-4">
                Indexing
              </h1>
              {indexers.length === 0 ? (
                <p className="text-gray-500">No indexers available.</p>
              ) : (
                <div className="grid grid-cols-4 gap-8">
                  {/* Render indexers */}
                  {indexers
                    .slice(0, expanded ? indexers.length : 6)
                    .map((indexer, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center space-x-2 mb-6"
                      >
                        <img
                          src={indexer.icon}
                          alt={indexer.name}
                          className="w-12 h-16 object-contain"
                        />
                        <span className="text-md font-semibold">
                          {indexer.name}
                        </span>
                      </div>
                    ))}
                  {!expanded && indexers.length > 6 && (
                    <button
                      onClick={() => setExpanded(true)}
                      className="text-gray-500 font-semibold text-lg flex items-center"
                    >
                      +{indexers.length - 4} more
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <h1 className="font-semibold text-xl">Related Pages</h1>
          <div className="flex max-w-xl space-x-8 p-4 border-2 rounded-lg">
            {/* Left Image Section */}
            <div className="w-auto h-full">
              <img
                src="/book.jpg"
                alt="Notebook"
                className=" object-cover w-full h-full"
              />
            </div>

            {/* Right Content Section */}
            <div className="w-3/4">
              <h2 className="text-lg font-bold mb-1">
                The Future of Quantum Computing: Transforming IT Landscapes
              </h2>
              <p className="text-gray-600 font-thin mb-6">By John</p>
              <div className="flex justify-between text-gray-700">
                <div className="flex justify-between space-x-1">
                  <HiDownload className="h-6 w-6 text-gray-400" />
                  <p className="font-mono text-gray-500">Download</p>
                </div>
                <div className="flex justify-between  space-x-1">
                  <CiBookmark className="h-6 w-6 text-gray-400" />
                  <p className="font-mono text-gray-500">Save</p>
                </div>
                <div className="flex justify-between  space-x-1">
                  <CiShare2 className="h-6 w-6 text-gray-400" />
                  <p className="font-mono text-gray-500">Share</p>
                </div>
              </div>

              {/* View More Button */}
            </div>
          </div>
          <div className="flex max-w-xl space-x-8 p-4 border-2 rounded-lg">
            {/* Left Image Section */}
            <div className="w-auto h-full">
              <img
                src="/book.jpg"
                alt="Notebook"
                className=" object-cover w-full h-full"
              />
            </div>

            {/* Right Content Section */}
            <div className="w-3/4">
              <h2 className="text-lg font-bold mb-1">
                The Future of Quantum Computing: Transforming IT Landscapes
              </h2>
              <p className="text-gray-600 font-thin mb-6">By John</p>
              <div className="flex justify-between text-gray-700">
                <div className="flex justify-between space-x-1">
                  <HiDownload className="h-6 w-6 text-gray-400" />
                  <p className="font-mono text-gray-500">Download</p>
                </div>
                <div className="flex justify-between  space-x-1">
                  <CiBookmark className="h-6 w-6 text-gray-400" />
                  <p className="font-mono text-gray-500">Save</p>
                </div>
                <div className="flex justify-between  space-x-1">
                  <CiShare2 className="h-6 w-6 text-gray-400" />
                  <p className="font-mono text-gray-500">Share</p>
                </div>
              </div>

              {/* View More Button */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JournalDetails;
