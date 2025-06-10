import React, { useState, useContext, useEffect } from "react";
// import line8 from "../assets/img/Line8.png";
import Ellipse4 from "../assets/img/Ellipse4.png";
// import materialsymbolslightclose from "../assets/img/materialsymbolslightclose.png";
// import bytesizedownload from "../assets/img/bytesizedownload.png";
import { Context } from "../index.js";
import { IoCloudDownloadOutline } from "react-icons/io5";
import api from "./api.js";
import { MdOutlineClear } from "react-icons/md";

const Box = ({ closePopup }) => {
  const { user } = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // State to hold the uploaded image
  const [uploadFile, setUploadFile] = useState(null);
  const [icon, SetIcons] = useState(60);

  const [imageError, setImageError] = useState(null);
  const [descError, setdescError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        SetIcons(25)
      } else if (window.innerWidth <= 768) {
        SetIcons(30)
      } else {
        SetIcons(60)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return window.removeEventListener('resize', handleResize)
  }, []);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check the file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (allowedTypes.includes(file.type)) {
        const imageURL = URL.createObjectURL(file);
        setUploadedImage(imageURL);
        setUploadFile(file);
        setImageError(null); // Clear any previous error
      } else {
        // If the file is not an image, show an error
        setUploadedImage(null);
        setUploadFile(null);
        setImageError("Only image files (jpeg, png, gif, webp) are allowed.");
      }
    } else {
      // If no file is selected
      setUploadedImage(null);
      setUploadFile(null);
      setImageError("No file selected. Please choose an image.");
    }
  };

  const handlePostUpload = async (e) => {
    e.preventDefault();
    try {
      if (!inputValue.trim() && uploadedImage === null) {
        setdescError("Description cannot be empty.");
        setImageError("No file selected. Please choose an image.");
        return;
      }
      if (!inputValue.trim()) {
        setdescError("Description cannot be empty.");
        return;
      } else {
        setdescError(null); // Clear any previous error
      }
      if (uploadedImage === null) {
        setImageError("No file selected. Please choose an image.");
        return;
      } else {
        setImageError(null); // Clear any previous error
      }
      const data = new FormData();
      data.append("description", inputValue);
      data.append("post", uploadFile);
      data.append("user_id", user.id);
      console.log(data);

      const response = await api.post(
        "uploadPost",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      closePopup()
      console.log(response);
    } catch (error) {
      console.log("Error while uploading Post:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex h-screen justify-center items-center z-50">
      <div className="bg-white w-full max-w-4xl h-3/5 md:h-3/5 lg:h-4/5 xl:h-4/5 2xl:h-2/3  p-5 rounded-lg shadow-md relative">
        <div className="flex justify-between items-center pb-3">
          <div className="font-semibold text-2xl text-black ">Create Post</div>
          <MdOutlineClear
            onClick={closePopup}
            size={28}
            className="cursor-pointer"
          />
        </div>

        <div className="text-left">
          <p className="py-1 border-t-2" />
          {/* <img src={line8} alt="Line" className="w-full h-px bg-blue-500 mb-5" /> */}
          <div className="flex items-center mb-5">
            <img
              src={`${user.image}` || Ellipse4}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div className="font-semibold text-xl text-black">
              {user.name || "John Paul"}
            </div>
          </div>

          <div className="mb-1 md:mb-5 lg:mb-10">
            <textarea
              rows="4"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Share your thoughts with other scholars..."
              className="md:w-full p-2 text-sm border-2 border-gray-200 text-md outline-none font-poppins bg-transparent w-full"
            />
            {descError && (
              <p className="text-red-500 font-bold mt-2">
                {descError}
              </p>
            )}
          </div>

          <div className=" mt-5 md:mt-5 lg:mt-10 h-44 w-full">
            <div className="border border-primary rounded-lg p-3 text-center w-1/2 md:w-2/5 lg:w-3/5 lg:h-full relative">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-w-full max-h-44 object-cover rounded-lg"
                />
              ) : (
                <>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col justify-center items-center"
                  >
                    {/* <img
                      src={bytesizedownload}
                      alt="Upload"
                      className="w-12 h-12"
                    /> */}
                    <IoCloudDownloadOutline
                      size={icon}
                      color="gray"
                      className="mt-5"
                    />
                    <div className="font-semibold text-base md:text-lg lg:text-xl my-3 text-gray-500">
                      Upload Image
                    </div>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </>
              )}

            </div>
            <div>
              {imageError && (
                <p className="text-red-500 font-bold mt-2">
                  {imageError}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-2 justify-end mt-4">
              <button
                className="bg-white text-primary hidden md:block border text-lg font-semibold border-primary py-2 px-10 rounded-md cursor-pointer"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white py-2 px-10 rounded-md text-lg font-semibold cursor-pointer "
                onClick={handlePostUpload}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;

