 
import React, { useContext, useState, useEffect } from "react";

import toast from "react-hot-toast";
import { BiSolidEditAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import EditIcon from "@/assets/img/EditIconWhite.png";
import api from "@/components/api/api.js";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader.jsx";
import Navbar from "@/components/layout/Navbar";
import { Context } from "@/index.jsx";

import Biography from "./components/Biography";
import Education from "./components/Education";
import Employment from "./components/Employment";
import Funding from "./components/Funding";
import Myuploads from "./components/Myuploads";
import ProfessionalActivities from "./components/ProfessionalActivities";
import Savedfiles from "./components/Savedfiles";
import Skills from "./components/Skills";
import Work from "./components/Work";
import { EducationAddModal, EducationEditModal } from "./modals/EducationModal";
import {
  EmploymentAddModal,
  EmploymentEditModal,
} from "./modals/EmploymentModal";
import {
  FundingDetailsAddModal,
  FundingDetailsEditModal,
} from "./modals/FundingModal";
import {
  ProfessionalActivityAddModal,
  ProfessionalActivityEditModal,
} from "./modals/ProfessionalActivitiesModal";
import { ProfileModal } from "./modals/ProfileModal";
import { WorkAddModal, WorkEditModal } from "./modals/WorkModal";


export const ContextMenu = () => {
  return (
    <div className="absolute top-0 right-4 min-w-[110px] min-h-[30px] w-fit h-fit p-2 backdrop-blur-xl bg-gray-200  bg-opacity-20 rounded-lg">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2 cursor-pointer">
          <BiSolidEditAlt className="text-2xl text-black " />
          <p className="text-md font-semibold">Edit</p>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RiDeleteBin2Line className="text-2xl text-black " />
          <p className="text-md font-semibold">Delete</p>
        </div>
      </div>
    </div>
  );
};

const ViewProfile = () => {
  const {
    isAuthenticated,
    profileData,
    user,
    myUploads,
    savedFiles,
    setProfileData,
    setFetchData,
    followersData,
    followingData,
  } = useContext(Context);

  if (!setProfileData) {
    console.error("setProfileData is undefined! Check Context Provider.");
  }
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/");
  }

  const [isDataFetched, setIsDataFetched] = useState(
    profileData ? true : false
  );

  const profileImage = user?.image;
  const [popup, setPopup] = useState(false);
  const [addData, setAddData] = useState(false);
  const [editData, setEditData] = useState(false);

  //Skills Section states
  const skills = useState(
    profileData && Object.keys(profileData).length > 0 && profileData.skills
      ? profileData.skills[0]?.skills || []
      : []
  );

  //Employment Section states
  const [button1Clicked, setbutton1Clicked] = useState(false);
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const employeeData = profileData?.employee || "No Employee Data";

  //Education Section States
  const [button2Clicked, setbutton2Clicked] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState(null);
  const educationData = profileData?.education || "No Education Data";

  //Porfessional Activity Section states
  const [button3Clicked, setbutton3Clicked] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [ProfessionalActivityToEdit, setProfessionalActivityToEdit] =
    useState(null);
  const professionalActivityDetails =
    profileData?.professional_activities || "No Professional Activity Details";

  //Funding Section States
  const [button4Clicked, setbutton4Clicked] = useState(false);
  const [fundingOpen, setFundingOpen] = useState(false);
  const [fundingDetailsToEdit, setFundingDetailsToEdit] = useState(null);
  const fundingDetails = profileData?.funding_details || "No Funding Details";

  //Works Section States
  const [button5Clicked, setbutton5Clicked] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [workToEdit, setWorkToEdit] = useState(null);
  const works = profileData?.works || "No Work Details";

  //Profile States
  const [button6Clicked, setbutton6Clicked] = useState(false);

  const [activeTab, setActiveTab] = useState("uploads");

  useEffect(() => {
    if (!isDataFetched) {
      console.log("triggering fetch Data from viewprofile");
      setFetchData(true);
    }
  }, [isDataFetched]);

  const handleDataDelete = async ({ dataId, dataType }) => {
    try {
      await api
        .post(
          `profileDelete/${dataId}`,
          { type: dataType },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          //console.log(res.data);
          setFetchData(true);
          toast.success(res.data.message);
        });
    } catch (error) {
      console.error("Error deleting Data: ", error.response.data.error);
      toast.error("Error deleting Data: " + error.response.data.error);
    }
  };

  // Toggle function for expanding/collapsing sections
  const toggleSection = (section) => {
    switch (section) {
      case "employment":
        setEmploymentOpen(!employmentOpen);
        break;
      case "education":
        setEducationOpen(!educationOpen);
        break;
      case "activities":
        setActivitiesOpen(!activitiesOpen);
        break;
      case "funding":
        setFundingOpen(!fundingOpen);
        break;
      case "work":
        setWorkOpen(!workOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={
        popup
          ? "w-full h-full -z-20 overflow-x-hidden"
          : "w-full h-full overflow-x-hidden"
      }
    >
      <div className="mx-auto relative">
        {button1Clicked && addData ? (
          <EmploymentAddModal
            setbutton1Clicked={setbutton1Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            setAddData={setAddData}
          />
        ) : (
          ""
        )}
        {button1Clicked && editData ? (
          <EmploymentEditModal
            setbutton1Clicked={setbutton1Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            employeeData={employeeToEdit}
            setEditData={setEditData}
          />
        ) : (
          ""
        )}
        {button2Clicked && addData ? (
          <EducationAddModal
            setbutton2Clicked={setbutton2Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            setAddData={setAddData}
          />
        ) : (
          ""
        )}

        {button2Clicked && editData ? (
          <EducationEditModal
            setbutton2Clicked={setbutton2Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            educationData={educationToEdit}
            setEditData={setEditData}
          />
        ) : (
          ""
        )}

        {button3Clicked && addData ? (
          <ProfessionalActivityAddModal
            setbutton3Clicked={setbutton3Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            setAddData={setAddData}
          />
        ) : (
          ""
        )}
        {button3Clicked && editData ? (
          <ProfessionalActivityEditModal
            setbutton3Clicked={setbutton3Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            professionalActivityData={ProfessionalActivityToEdit}
            setEditData={setEditData}
          />
        ) : (
          ""
        )}

        {button4Clicked && addData ? (
          <FundingDetailsAddModal
            setbutton4Clicked={setbutton4Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            setAddData={setAddData}
          />
        ) : (
          ""
        )}
        {button4Clicked && editData ? (
          <FundingDetailsEditModal
            setbutton4Clicked={setbutton4Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            fundingDetailsData={fundingDetailsToEdit}
            setEditData={setEditData}
          />
        ) : (
          ""
        )}

        {button5Clicked && addData ? (
          <WorkAddModal
            setbutton5Clicked={setbutton5Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            setAddData={setAddData}
          />
        ) : (
          ""
        )}
        {button5Clicked && editData ? (
          <WorkEditModal
            setbutton5Clicked={setbutton5Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
            workData={workToEdit}
            setEditData={setEditData}
          />
        ) : (
          ""
        )}

        {button6Clicked ? (
          <ProfileModal
            setbutton6Clicked={setbutton6Clicked}
            setPopup={setPopup}
            setIsDataFetched={setIsDataFetched}
          />
        ) : (
          ""
        )}
        <Navbar />
        {!profileData ? (
          <Loader />
        ) : (
          <div className="p-4 xss:mx-2  sm:mx-4">
            <div className="bg-white rounded-lg">
              {/* Profile Header */}
              <div className="flex xss:justify-between xss:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                {/* Section 1 */}
                <div className="lg:w-[60%]">
                  <div className="flex xss:mb-4 lg:mb-0 xl:mb-0 xss:justify-evenly lg:justify-normal sm:px-8 lg:px-5 w-auto">
                    <div className="flex xss:w-[30%] sm:w-auto xss:items-center lg:items-start sm:p-4 xss:mt-2 lg:mt-0 lg:p-0 flex-col">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="profile"
                          className="rounded-full object-cover xss:w-[98px] xss:h-[98px] xs:w-[103px] xs:h-[103px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] lg:h-[100px] lg:w-[100px] xl:h-[110px] xl:w-[110px]"
                        />
                      ) : (
                        <CgProfile className="rounded-full object-cover xss:w-[90px] xss:h-[90px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:h-[100px] lg:w-[100px] xl:h-[120px] xl:w-[120px]" />
                      )}
                      <div className="w-full flex justify-center">
                        <h2 className="xss:text-base sm:text-xl text-center font-bold lg:mt-1">
                          {user.name}
                        </h2>
                      </div>
                    </div>
                    <div className="sm:pl-[70px] lg:pl-[20px] xl:pl-[70px] sm:pt-[10px] xss:w-[70%] sm:w-auto lg:w-[65%]">
                      <div className="ml-4 xss:ml-2 lg:mt-4 xl:mt-8">
                        <div className="flex xss:py-1 sm:py-6 lg:gap-4 xl:gap-8 lg:py-1 ">
                          <div className="flex flex-col items-center text-gray-800 font-bold sm:px-5 lg:px-2 xss:pr-1 lg:text-lg">
                            <p>{followersData}</p>
                            <p>Followers</p>
                          </div>
                          <div className="flex flex-col items-center text-gray-800 font-bold sm:px-5 lg:px-2 xss:px-1 lg:text-lg">
                            <p>{followingData}</p>
                            <p>Following</p>
                          </div>
                          <div className="flex flex-col items-center text-gray-800 font-bold sm:px-5 lg:px-2 pl-1 lg:text-lg">
                            <p>0</p>
                            <p>Views</p>
                          </div>
                        </div>
                        <div className="">
                          <div className="">
                            <div className="flex justify-end">
                              <p className="font-bold">5%</p>
                            </div>
                            <div className="my-1 w-auto bg-gray-200 rounded-full">
                              <div
                                className="bg-[#0000ff] h-[15px] rounded-full"
                                style={{ width: "20%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex lg:hidden justify-end">
                            <div
                              onClick={() => {
                                setbutton6Clicked(true);
                                setPopup(true);
                              }}
                              className="bg-[#0000ff] xss:px-2 px-4 py-3 xss:py-2 text-white flex items-center rounded-md cursor-pointer"
                              style={{ maxWidth: "max-content" }}
                            >
                              <img
                                src={EditIcon}
                                alt="Edit Icon"
                                className="h-5 w-5 xss:h-4 xss:w-4 cursor-pointer"
                                onClick={() => {
                                  setbutton6Clicked(true);
                                  setPopup(true);
                                }}
                              />
                              <p
                                onClick={() => {
                                  setbutton6Clicked(true);
                                  setPopup(true);
                                }}
                                className="pl-[12px] cursor-pointer"
                              >
                                Edit Profile
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" lg:border-r border-gray-300 lg:pr-6 sm:mx-4">
                    {/* Biography */}
                    <Biography skills={skills} />
                    {/* Skill Section */}
                    <Skills />
                    {/* Employment Section */}
                    <Employment
                      toggleSection={toggleSection}
                      employmentOpen={employmentOpen}
                      setEmployeeToEdit={setEmployeeToEdit}
                      setAddData={setAddData}
                      setEditData={setEditData}
                      setPopup={setPopup}
                      employeeData={employeeData}
                      handleDataDelete={handleDataDelete}
                      setbutton1Clicked={setbutton1Clicked}
                    />

                    {/* Education Section */}
                    <Education
                      toggleSection={toggleSection}
                      educationData={educationData}
                      educationOpen={educationOpen}
                      setEducationToEdit={setEducationToEdit}
                      setAddData={setAddData}
                      setEditData={setEditData}
                      setPopup={setPopup}
                      handleDataDelete={handleDataDelete}
                      setbutton2Clicked={setbutton2Clicked}
                    />

                    {/* Professional Activities Section */}
                    <ProfessionalActivities
                      toggleSection={toggleSection}
                      professionalActivityDetails={professionalActivityDetails}
                      activitiesOpen={activitiesOpen}
                      setProfessionalActivityToEdit={
                        setProfessionalActivityToEdit
                      }
                      setAddData={setAddData}
                      setEditData={setEditData}
                      setPopup={setPopup}
                      handleDataDelete={handleDataDelete}
                      setbutton3Clicked={setbutton3Clicked}
                    />

                    {/* Funding Section */}
                    <Funding
                      toggleSection={toggleSection}
                      fundingDetails={fundingDetails}
                      fundingOpen={fundingOpen}
                      setFundingDetailsToEdit={setFundingDetailsToEdit}
                      setAddData={setAddData}
                      setEditData={setEditData}
                      setPopup={setPopup}
                      handleDataDelete={handleDataDelete}
                      setbutton4Clicked={setbutton4Clicked}
                    />
                    {/* Work Section */}
                    <Work
                      toggleSection={toggleSection}
                      works={works}
                      workOpen={workOpen}
                      setWorkToEdit={setWorkToEdit}
                      setAddData={setAddData}
                      setEditData={setEditData}
                      setPopup={setPopup}
                      handleDataDelete={handleDataDelete}
                      setbutton5Clicked={setbutton5Clicked}
                    />
                  </div>
                </div>
                {/* Section 2 */}
                <div className="sm:px-4 lg:w-[40%]">
                  <div className="flex justify-end xss:hidden lg:flex cursor-pointer">
                    <div
                      onClick={() => {
                        setbutton6Clicked(true);
                        setPopup(true);
                      }}
                      className="bg-[#0000ff] px-8 py-3 mr-[8px] text-white flex items-center rounded-md"
                      style={{ maxWidth: "max-content" }}
                    >
                      <img
                        src={EditIcon}
                        alt="Edit Icon"
                        onClick={() => {
                          setbutton6Clicked(true);
                          setPopup(true);
                        }}
                        className="h-5 w-5 cursor-pointer"
                      />
                      <p
                        className="pl-[12px] cursor-pointer"
                        onClick={() => {
                          setbutton6Clicked(true);
                          setPopup(true);
                        }}
                      >
                        Edit Profile
                      </p>
                    </div>
                  </div>
                  {/* Saved Files Section */}
                  <div
                    className="flex border-b sm:mt-8 xl:mt-10 justify-center text-center"
                    // style={{ maxWidth: "max-content" }}
                  >
                    <button
                      className={`w-[50%] ${
                        activeTab === "uploads"
                          ? "border-b-2 border-black font-bold px-7 py-3 text-xl text-black"
                          : "px-7 py-3 text-xl text-black font-semibold"
                      }`}
                      onClick={() => setActiveTab("uploads")}
                    >
                      My Uploads
                    </button>
                    <button
                      className={`w-[50%] ${
                        activeTab === "saved"
                          ? "border-b-2 border-black font-bold px-7 py-3 text-xl text-black"
                          : "px-7 py-3 text-xl text-black font-semibold"
                      }`}
                      onClick={() => setActiveTab("saved")}
                    >
                      Saved Files
                    </button>
                  </div>

                  {/* Content based on selected tab */}
                  <div className="mt-6">
                    {activeTab === "uploads" ? (
                      <>{myUploads ? <Myuploads /> : <p>No uploads yet</p>}</>
                    ) : (
                      <>
                        {savedFiles ? (
                          <Savedfiles />
                        ) : (
                          <p>No Posts Saved Yet</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default ViewProfile;
