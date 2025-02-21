import React, { useRef, useState, useContext } from "react";
import { Context } from "../../index";
import { RxCross2 } from "react-icons/rx";
import Ellipse4 from "../../assets/img/profile.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import api from "../api";
export const ProfileModal = ({
  setbutton6Clicked,
  setPopup,
  setIsDataFetched,
}) => {
  const { user, profileData } = useContext(Context);
  // console.log("User: ", user);

  const [tempSelectedFile, setTempSelectedFile] = useState(null);
  const [image, setImage] = useState(profileData?.image || null);

  console.log(image);

  const [name, setName] = useState(profileData?.name || "");
  const [email, setEmail] = useState(profileData?.email || "");
  const [phone, setPhone] = useState(profileData?.phone_number || "");
  const [country, setCountry] = useState(profileData?.country || "");
  //console.log(country);

  const fileInputRef = useRef(null);

  const handleChooseFileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setTempSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePhoneChange = (value, countryData) => {
    setPhone(value);
    setCountry(countryData.name);
  };

  const updateUser = async (event) => {
    event.preventDefault();
    console.log(user);
    console.log(tempSelectedFile);

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("phone_number", phone);
    if (tempSelectedFile) {
      formData.append("image", tempSelectedFile);
    } else {
      const response = await fetch(image, { mode: "no-cors" });
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: blob.type });
      console.log(file);

      formData.append("image", file);
    }
    try {
      await api
        .post(`editUser`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          //console.log(res.data);
          toast.success(res.data.message);
          setIsDataFetched(false);
          setbutton6Clicked(false);
        });
    } catch (error) {
      // console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div
      onClick={() => {
        setbutton6Clicked(false);
        setPopup(false);
      }}
      className="backdrop-blur-sm fixed inset-0 justify-center items-center z-50 h-full w-screen bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" h-auto xss:p-5 md:p-10 pb-12 bg-white rounded-xl xss:w-full  md:w-[70%] lg:w-[60%] xss:my-6 md:mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">PROFILE</h2>
            <RxCross2
              onClick={() => setbutton6Clicked(false)}
              className="text-2xl"
            />
          </div>
          {/* <hr className="my-[1vw]" /> */}
          <div className="flex xss:flex-col md:flex-row gap-6 items-center justify-center">
            <div className="xss:w-[40%] md:w-[30%]">
              <img
                src={image || tempSelectedFile || Ellipse4}
                alt="profile"
                className="rounded-full object-cover w-auto h-auto"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={(e) => {
                  handleChooseFileClick(e);
                  setbutton6Clicked(true);
                  setPopup(true);
                }}
                className="rounded-md px-6 py-2 bg-[#0000FF] font-medium text-white"
              >
                Change Image
              </button>
              <button className="rounded-md px-6 py-2 text-white bg-rose-600 font-medium">
                Remove Image
              </button>
            </div>
          </div>
          <div className="flex xss:flex-col sm:flex justify-between ">
            <div className="flex flex-col xss:w-full w-[60%] ">
              <label className="font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder="Enter Name"
              />
            </div>

            <div className="flex xss:flex-col md:flex-row gap-6">
              <div className="flex flex-col w-[39%] xss:w-full ">
                <label className="font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                  type="text"
                  placeholder="Enter Email"
                />
              </div>
              <div className="flex flex-col w-[39%] xss:w-full ">
                <label className="font-medium">Phone number</label>
                <div className="w-full flex items-center border-[1.3px] border-black border-opacity-50 rounded-md bg-white px-2 pt-2 pb-1 mt-4 text-2xl">
                  <PhoneInput
                    country={country}
                    value={phone}
                    onChange={handlePhoneChange}
                    inputClass="w-full !border-none !bg-transparent focus:!outline-none text-gray-800 text-xl"
                    buttonClass="!bg-transparent !border-none scale-150"
                    dropdownClass="!bg-white !text-black !border !border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between xss:flex-col sm:flex my-[1vw]">
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Country</label>
              <input
                value={country}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                readOnly
              />
            </div>
          </div>

          <div className="flex xss:flex-col md:flex-row gap-[1vw] mt-6+ justify-center">
            <button
              onClick={updateUser}
              className="xss:mx-auto rounded-md xss:px-12 xs:px-24 py-2 bg-[#0000FF] font-medium  text-white"
            >
              Update Profile
            </button>
            <button
              onClick={() => setbutton6Clicked(false)}
              className="xss:mx-auto rounded-md xss:px-12 xs:px-24 py-2 text-[#0000FF]  font-medium bg-transparent border-[#0000FF] border-[1.5px]"
            >
              Cancel
            </button>
          </div>
        </div>
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
  );
};
