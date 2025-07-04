import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import rectangle64 from "@/assets/img/rectangle-64.png";
import rectangle65 from "@/assets/img/rectangle-65.png";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const UploadPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setError(null);
      }
      else {
        setError("Please upload a valid PDF file.");
        setSelectedFile(null);
      }

    }
  };

  const handleNextClick = () => {
    if (!selectedFile) {
      setError("Please select a file before proceeding.");
      return;
    }
    if (selectedFile.type === "application/pdf") {
      setError(null);
    } else {
      setError("Please upload a valid PDF file.");
      return;
    }
    navigate("/UploadPaperDetails", { state: { selectedFile } });
  };


  return (
    <>
      <Navbar />
      <div className="bg-white flex justify-center items-center w-full">
        <div className="flex justify-between gap-10">
          {/* left */}
          <div className="hidden lg:block">
            <img alt="Rectangle" src={rectangle65} />
          </div>
          {/* center */}
          <div className="p-5 ">
            <h1 className="text-2xl font-bold text-center mt-10 lg:mt-24 "> UPLOAD YOUR PAPER</h1>
            <p className="mt-5 text-center font-semibold p-0 md:px-5">Upload Your Paper which contributes to the advancement of knowledge in the field of information technology by submitting your research to our journal.</p>
            <div className="border-2 flex flex-col justify-center items-center rounded my-5 py-10 w-full sm:w-2/3 md:w-2/3 mx-auto">
              {!selectedFile ? (<>
                <h4 className="text-lg font-semibold">Drag and drop a file</h4>
                <h4 className="text-lg mt-4 font-semibold">or</h4>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <button className="bg-primary px-9 py-3 mt-5 text-white w-30 mx-auto rounded" onClick={handleChooseFileClick}>Choose a File</button>
                {error && <p className="text-red-500 font-bold mt-3">{error}</p>}
              </>) : (<>

                <p className="font-semibold text-center">
                  File Uploaded: <br /><br /><span className="text-primary">{selectedFile.name}</span>
                </p>
                <button className="bg-primary px-9 py-3 mt-6 text-white w-30 mx-auto rounded" onClick={handleNextClick}>Next</button>
                {error && <p className="text-red-500 font-bold mt-3">{error}</p>}
              </>)}

            </div>
          </div>
          {/* right */}
          <div className="hidden lg:block"><img className="object-cover" alt="Rectangle" src={rectangle64} /></div>
        </div>
      </div>


      <Footer />
    </>
  );
};

export default UploadPage;
