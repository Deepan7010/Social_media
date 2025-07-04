import React, { useState, useContext, useEffect } from "react";

// import line8 from "../assets/img/Line8.png";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";

import api from "@/components/api/api.js";
import { Context } from "@/index.jsx";

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
        SetIcons(30);
      } else if (window.innerWidth <= 768) {
        SetIcons(40);
      } else {
        SetIcons(60);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, []);

  const [isImagePortrait, setIsImagePortrait] = useState(false);

  const isPortrait = (image) => {
    //console.log("Image: ", image);
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const { height, width } = img;
      //console.log("Image dimensions: ", height, width);

      height > width || height == width
        ? setIsImagePortrait(true)
        : setIsImagePortrait(false);
    };
    img.onerror = () => {
      console.error("Failed to load image.");
    };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check the file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (allowedTypes.includes(file.type)) {
        const imageURL = URL.createObjectURL(file);
        setUploadedImage(imageURL);
        setUploadFile(file);
        isPortrait(imageURL);
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
      setIsImagePortrait(false);
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

      try {
        await api
          .post("uploadPost", data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            console.log(res.data);
            toast.success(res.data.message);
            closePopup();
          });
      } catch (error) {
        console.log("Error while uploading Post:", error);
        toast.error("Failed to upload post. Please try again.");
        return;
      }
    } catch (error) {
      console.log("Error while uploading Post:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex min-h-screen justify-center items-center z-50">
      <div className="bg-white xss:mx-3 w-full h-auto max-w-4xl p-4 rounded-lg shadow-md">
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
          <div className="flex items-center mb-5">
            {user?.image ? (
              <img
                src={user?.image}
                alt="User profile"
                className="h-24 w-24 rounded-full object-cover mr-4"
              />
            ) : (
              <CgProfile className="h-24 w-24 rounded-full object-cover mr-4" />
            )}
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
              <p className="text-red-500 font-bold mt-2">{descError}</p>
            )}
          </div>

          <div className="my-5 lg:mt-10 h-44 w-auto">
            <div
              className={`border border-primary rounded-lg p-2 text-center flex justify-center items-center relative ${
                isImagePortrait
                  ? "w-fit h-auto"
                  : "w-auto xs:w-3/5 md:w-2/5 h-44"
              } `}
            >
              {uploadedImage ? (
                <>
                  {isImagePortrait ? (
                    <>
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-auto max-h-40 object-contain rounded-lg"
                      />
                      <MdOutlineClear
                        onClick={() => {
                          setUploadedImage(null);
                          setUploadFile(null);
                          setImageError(null);
                          setIsImagePortrait(false);
                        }}
                        size={28}
                        className="cursor-pointer absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-700 transition-colors"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full max-h-40 rounded-lg "
                      />
                      <MdOutlineClear
                        onClick={() => {
                          setUploadedImage(null);
                          setUploadFile(null);
                          setImageError(null);
                        }}
                        size={28}
                        className="cursor-pointer absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-700 transition-colors"
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col justify-center items-center"
                  >
                    <IoCloudDownloadOutline
                      size={icon}
                      color="gray"
                      className="mt-5"
                    />
                    <div className="font-semibold text-base md:text-lg lg:text-xl my-2 text-gray-500">
                      Upload Image <br />
                      Maximum file size: 1mb
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
                <p className="text-red-500 font-bold mt-2">{imageError}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-end mt-8">
            <button
              className="bg-white text-primary block border text-lg font-semibold border-primary py-2 px-10 xss:px-6 rounded-md cursor-pointer"
              onClick={closePopup}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white py-2 px-10 xss:px-7 rounded-md text-lg font-semibold cursor-pointer "
              onClick={handlePostUpload}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
