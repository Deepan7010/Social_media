import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import rectangle65 from "../assets/img/rectangle-65.png";
import rectangle64 from "../assets/img/rectangle-64.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const Upload = () => {
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
      {/* <div className="UPLOAD">
        <div className="div">
          <div className="overlap">
            <img className="rectangle" alt="Rectangle" src={rectangle64} />
            <img className="img" alt="Rectangle" src={rectangle65} />
            <div className="text-wrapper">UPLOAD YOUR PAPER</div>

            <div className="group">
              <div className="group-2">
                {!selectedFile ? (
                  <div className="frame" onClick={handleChooseFileClick}>
                    <div className="text-wrapper-2">Choose a File</div>
                  </div>
                ) : (
                  <div className="file-container">
                    <p className="file-name" style={{ textAlign: "center" }}>
                      File Uploaded: {selectedFile.name}
                    </p>
                    <div
                      className="frame next-button"
                      onClick={handleNextClick}
                    >
                      <div className="text-wrapper-2">Next</div>
                    </div>
                  </div>
                )}
                {!selectedFile && (
                  <>
                    <p className="p">Drag and drop a file</p>
                    <div className="text-wrapper-3">or</div>
                  </>
                )}
              </div>
              {!selectedFile && (
                <div className="no-file-link mt-32 text-center ml-5">
                  <button
                    className="no-file-button"
                    onClick={handleNoFileClick}
                  >
                    No file to upload?
                  </button>
                </div>
              )}
            </div>

            <p className="text-wrapper-4">
              Upload Your Paper which contributes to the advancement of
              knowledge in the field of information technology by submitting
              your research to our journal.
            </p>
          </div>

          <div className="overlap-group">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

          </div>
        </div>
      </div> */}

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

export default Upload;
