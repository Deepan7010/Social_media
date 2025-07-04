import React, { useRef, useState, useContext } from "react";

import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import PhoneInput from "react-phone-input-2";

import Defaultimage from "@/assets/img/default1.png";
import "react-phone-input-2/lib/style.css";
import api from "@/components/api/api";
import { validate } from "@/components/Form/formValidator.js";
import TextInput from "@/components/Form/InputStyles/TextInput";
import { Context } from "@/index";


export const ProfileModal = ({
  setbutton6Clicked,
  setPopup,
  setIsDataFetched,
}) => {
  const { user } = useContext(Context);
  // console.log("User: ", user);
  //console.log("profileData: ", profileData);

  const [tempSelectedFile, setTempSelectedFile] = useState(null);
  const [image, setImage] = useState(user?.image || null);

  console.log(image);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone_number || "");
  const [country, setCountry] = useState(user?.country || "");

  const [isImageRemoved, setIsImageRemoved] = useState(false);
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

  const [errors, setErrors] = useState({});
  const values = [
    { label: "Name", name: name },
    { label: "Email", email: email },
    { label: "Phone", phone: phone },
    { label: "Country", country: country },
  ];

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1]; // "name", "email", etc.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const updateUser = async (event) => {
    event.preventDefault();
    if (!validate({ values, setErrors })) return;
    // Validate before proceeding
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("phone_number", phone);

    try {
      if (tempSelectedFile) {
        formData.append("image", tempSelectedFile);
      } else if (isImageRemoved) {
        const response = await fetch(Defaultimage);
        const blob = await response.blob();
        const file = new File([blob], "default.jpg", { type: blob.type });
        formData.append("image", file);
      }

      await api
        .post(`editUser`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          setIsDataFetched(false);
          setIsImageRemoved(false);
          setbutton6Clicked(false);
        });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div
      onClick={() => {
        setbutton6Clicked(false);
        setPopup(false);
      }}
      className="backdrop-blur-sm fixed inset-0 flex justify-center items-center z-50 h-full w-screen bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="xss:absolute xss:top-10 sm:static h-auto xss:py-5 xss:px-5 md:p-10 pb-12 bg-white rounded-xl xss:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[60%] max-w-[860px] xss:my-6 sm:mt-10 md:mt-[5vw] sm:mx-auto"
      >
        <div className="bg-white sm:mx-5">
          <div className="flex flex-row items-center justify-between">
            <h2 className="xss:text-2xl sm:text-3xl font-semibold">PROFILE</h2>
            <RxCross2
              onClick={() => setbutton6Clicked(false)}
              className="text-2xl"
            />
          </div>
          {/* <hr className="my-[1vw]" /> */}
          <div className="flex xss:flex-col xs:flex-row xs:gap-2 sm:gap-0 xl:gap-5 items-center justify-center xss:my-4">
            <div className="xss:w-[60%] xs:w-[30%] md:w-[30%] xl:w-auto xss:flex justify-center xss:mb-2">
              {image || tempSelectedFile ? (
                <img
                  src={image || tempSelectedFile}
                  alt="profile"
                  className="rounded-full object-cover xss:w-[120px] xss:h-[120px] md:w-[140px] md:h-[140px] xl:h-[150px] xl:w-[150px]"
                />
              ) : (
                <CgProfile className="rounded-full object-cover xss:w-[120px] xss:h-[120px] md:w-[140px] md:h-[140px] xl:h-[150px] xl:w-[150px]" />
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={(e) => {
                  handleChooseFileClick(e);
                  setbutton6Clicked(true);
                  setPopup(true);
                }}
                className="rounded-md px-4 py-2 bg-[#0000FF] font-medium text-white"
              >
                Change Image
              </button>
              <button
                onClick={() => {
                  setImage(null);
                  setIsImageRemoved(true);
                }}
                className="rounded-md px-4 py-2 text-white bg-rose-600 font-medium"
              >
                Remove Image
              </button>
            </div>
          </div>
          <div className="flex xss:flex-col sm:flex justify-between ">
            <div className="flex flex-col xss:w-full w-[60%] ">
              <TextInput
                label={"Name"}
                value={name}
                setValue={setName}
                required={true}
                error={errors.name}
                inputRef={refs.name}
              />
            </div>
            <div className="flex xss:flex-col md:flex-row w-full gap-6">
              <div className="flex flex-col xss:w-full md:w-[55%] ">
                <TextInput
                  label={"Email"}
                  value={email}
                  setValue={setEmail}
                  required={true}
                  error={errors.email}
                  inputRef={refs.email}
                />
              </div>
              <div className="flex flex-col xss:w-full md:w-[45%]">
                <label className="font-semibold">Phone number</label>
                <div className="w-full flex items-center border-[1.3px] border-black border-opacity-50 rounded-md bg-white px-2 pt-2 pb-1 mt-4 text-2xl">
                  <PhoneInput
                    country={country}
                    value={phone}
                    required={true}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    onChange={handlePhoneChange}
                    inputClass="!w-fit !border-none outline-none text-gray-800 text-xl"
                    buttonClass="!bg-transparent !border-none !scale-[1.25]"
                    dropdownClass="!bg-white !text-black !border !border-gray-300 rounded-md"
                  />
                </div>
                {errors.phone && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between xss:flex-col sm:flex my-[1vw]">
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-semibold">Country</label>
              <input
                value={country}
                className="w-full border-[1.3px] outline-none border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                readOnly
              />
              {errors.country && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.country}
                </span>
              )}
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
