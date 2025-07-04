import React, { useState, useContext, useRef } from "react";

// import "../style/UploadPaperDetails.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";


import api from "@/components/api/api.js";
import { validate } from "@/components/Form/formValidator.js";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Context } from "@/index";

export const UploadPaperDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [formData, setFormData] = useState({
    paperTitle: "",
    abstract: "",
    publicationName: "",
    year: "",
    link: "",
    doi: "",
    research_interest: "",
    category: "", // New category field
  });

  const [coAuthors, setCoAuthors] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newCoAuthor, setNewCoAuthor] = useState("");
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const { selectedFile } = location.state || {};
  //console.log(selectedFile);

  // Define refs for each field
  const refs = {
    paperTitle: useRef(),
    abstract: useRef(),
    publicationName: useRef(),
    year: useRef(),
    link: useRef(),
    doi: useRef(),
    research_interest: useRef(),
    category: useRef(),
    coAuthors: useRef(),
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    // Prepare values for validation
    const values = [
      { label: "Paper Title", paperTitle: formData.paperTitle },
      { label: "Abstract", abstract: formData.abstract },
      { label: "Publication Name", publicationName: formData.publicationName },
      { label: "Year", year: formData.year },
      { label: "Link", link: formData.link },
      { label: "DOI", doi: formData.doi },
      {
        label: "Research Interests",
        research_interest: formData.research_interest,
      },
      { label: "Category", category: formData.category },
      {
        label: "Co-Authors",
        coAuthors: coAuthors.length ? coAuthors.join(", ") : "",
      },
    ];
    if (!validate({ values, setErrors })) {
      // Focus the first error field
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey && refs[firstErrorKey] && refs[firstErrorKey].current) {
        refs[firstErrorKey].current.focus();
      }
      return;
    }

    if (
      !formData.paperTitle ||
      !formData.abstract ||
      !formData.publicationName ||
      !formData.year ||
      !formData.doi ||
      !formData.research_interest ||
      !formData.category ||
      coAuthors.length === 0 // Make sure at least one co-author is added
    ) {
      toast.error("Please fill in all the required fields.", {
        style: {
          borderRadius: "8px",
          background: "#f8f9fa",
          color: "#212529",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "12px 20px",
        },
      });
      return; // Prevent API call if validation fails
    }

    const data = new FormData();
    data.append("user_id", user.id);
    data.append("paper_title", formData.paperTitle);
    data.append("abstract", formData.abstract);
    data.append("publication_name", formData.publicationName);
    data.append("year", formData.year);
    data.append("doi", formData.doi);
    data.append("authors", coAuthors);
    data.append("research_interest", formData.research_interest);
    data.append("section", formData.category);
    data.append("link", formData.link);
    // data.append("period", formData.period);

    let headers = { "Content-Type": "application/json" };
    if (selectedFile) {
      data.append("article", selectedFile);
      headers["Content-Type"] = "multipart/form-data";
    }

    // console.log(data);

    try {
      const response = await api.post("uploadJournal", data, {
        withCredentials: true,
        headers,
      });

      toast.success(response.data.message, {
        style: {
          borderRadius: "8px",
          background: "#f8f9fa",
          color: "#212529",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "12px 20px",
        },
      });
      //console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const users = [
    "John Doe",
    "Alice Smith",
    "Robert Johnson",
    "Bob Riser",
    "Levi Ackerman",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCoAuthorChange = (e) => {
    const input = e.target.value;
    setFormData({ ...formData, coAuthor: input });

    if (input.trim()) {
      const filtered = users.filter((user) =>
        user.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  };

  const addCoAuthor = (author) => {
    if (!coAuthors.includes(author)) {
      setCoAuthors([...coAuthors, author]);
    }
    setFormData({ ...formData, coAuthor: "" });
    setShowUserList(false);
  };

  const handleAddNewCoAuthor = () => setShowPopup(true);

  const handleNewCoAuthorSubmit = () => {
    if (newCoAuthor.trim() && !coAuthors.includes(newCoAuthor)) {
      setCoAuthors([...coAuthors, newCoAuthor]);
    }
    setNewCoAuthor("");
    setFormData({ ...formData, coAuthor: "" });
    setShowPopup(false);
  };

  const handlePopupClose = () => setShowPopup(false);

  const removeCoAuthor = (authorToRemove) => {
    setCoAuthors(coAuthors.filter((author) => author !== authorToRemove));
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col">
        <div className="bg-gray-100 flex justify-center w-full">
          {/*relative h-[1659px] overflow-hidden w-[1440px] */}
          <div className=" bg-gray-100 w-full h-full ">
            <h1 className="text-3xl font-bold text-gray-700 text-center my-5 md:my-10">
              Enter Paper Details
            </h1>

            <div className="bg-gray-200 p-5 md:p-10 mb-10 rounded-lg shadow-md w-11/12  md:w-11/12 lg:w-[75%] mx-auto flex flex-col md:flex md:flex-row  gap-8 ">
              <div className="w-full md:w-[55%]">
                <div className="mb-4">
                  <label
                    htmlFor="paperTitle"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Paper Title
                  </label>
                  <input
                    type="text"
                    name="paperTitle"
                    placeholder="Enter Title"
                    value={formData.paperTitle}
                    onChange={handleChange}
                    className={`w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none ${
                      errors.paperTitle
                        ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                        : ""
                    }`}
                    ref={refs.paperTitle}
                  />
                  {errors.paperTitle && (
                    <span className="text-red-500 font-semibold mt-1">
                      {errors.paperTitle}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="abstract"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Abstract
                  </label>
                  <textarea
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    className={`w-full p-4 border border-gray-300 rounded-md mt-2 h-[150px] resize-none focus:outline-none ${
                      errors.abstract
                        ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                        : ""
                    }`}
                    ref={refs.abstract}
                  ></textarea>
                  {errors.abstract && (
                    <span className="text-red-500 font-semibold mt-1">
                      {errors.abstract}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="link"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className={`w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none ${
                      errors.link
                        ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                        : ""
                    }`}
                    ref={refs.link}
                  />
                  {errors.link && (
                    <span className="text-red-500 font-semibold mt-1">
                      {errors.link}
                    </span>
                  )}
                </div>

                <label
                  htmlFor="author"
                  className="block text-lg font-semibold text-gray-700 mt-4"
                >
                  Authors
                </label>
                <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
                  <div className="flex flex-col md:flex-row items-center mb-2 md:mb-4">
                    <input
                      type="text"
                      name="coAuthor"
                      onChange={handleCoAuthorChange}
                      placeholder="Enter Co-Author Name"
                      className={`p-4 border border-gray-300 rounded-md mr-2 w-full md:w-[60%] focus:outline-none mb-4 md:mb-0 ${
                        errors.coAuthors
                          ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                          : ""
                      }`}
                      ref={refs.coAuthors}
                    />
                    <p
                      className="text-blue-500 cursor-pointer"
                      onClick={handleAddNewCoAuthor}
                    >
                      +Add Co-Author
                    </p>
                  </div>

                  {showUserList && (
                    <ul className="max-h-[150px] overflow-y-auto">
                      {filteredUsers.length ? (
                        filteredUsers.map((user, index) => (
                          <p
                            key={index}
                            onClick={() => addCoAuthor(user)}
                            className="cursor-pointer"
                          >
                            {user}
                          </p>
                        ))
                      ) : (
                        <div className="text-right">
                          <p>No users found ? &nbsp;</p>
                          <p
                            onClick={handleAddNewCoAuthor}
                            className="text-blue-500 cursor-pointer"
                          >
                            Add New
                          </p>
                        </div>
                      )}
                    </ul>
                  )}

                  <div className="flex">
                    {coAuthors.map((author, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <p className="px-4 py-2 bg-white border border-gray-300 rounded-full cursor-pointer">
                          {author}
                          <span
                            className="ml-2 cursor-pointer"
                            onClick={() => removeCoAuthor(author)}
                          >
                            ✕
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                  {errors.coAuthors && (
                    <span className="text-red-500 font-semibold mt-1">
                      {errors.coAuthors}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full md:w-[40%]">
                <div className="mb-4">
                  <label
                    htmlFor="publicationName"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Publication Name
                  </label>
                  <input
                    type="text"
                    name="publicationName"
                    placeholder="Enter Publication Name"
                    value={formData.publicationName}
                    onChange={handleChange}
                    className={`w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none ${
                      errors.publicationName
                        ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                        : ""
                    }`}
                    ref={refs.publicationName}
                  />
                  {errors.publicationName && (
                    <span className="text-red-500 font-semibold mt-1">
                      {errors.publicationName}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="year"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={`w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none ${
                      errors.year
                        ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                        : ""
                    }`}
                    ref={refs.year}
                  />
                  {errors.year && (
                    <span className="text-red-500 font-semibold mt-1">
                      {errors.year}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="doi"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    DOI
                  </label>
                  <input
                    type="text"
                    name="doi"
                    value={formData.doi}
                    onChange={handleChange}
                    className={`w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none ${
                      errors.doi
                        ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                        : ""
                    }`}
                    ref={refs.doi}
                  />
                  {errors.doi && (
                    <span className="text-red-500 font-semibold mt-1">
                      {errors.doi}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block text-lg font-semibold text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none ${
                        errors.category
                          ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                          : ""
                      }`}
                      ref={refs.category}
                    >
                      <option value="">Select Category</option>
                      <option value="research">Research</option>
                      <option value="review">Review</option>
                      <option value="case study">Case Study</option>
                    </select>
                    {errors.category && (
                      <span className="text-red-500 font-semibold mt-1">
                        {errors.category}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="research_interest"
                      className="block text-lg font-semibold text-gray-700"
                    >
                      Research Interests
                    </label>
                    <input
                      type="text"
                      name="research_interest"
                      value={formData.research_interest}
                      onChange={handleChange}
                      className={`w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none ${
                        errors.research_interest
                          ? "border-red-500 focus:border-red-500 ring-2 ring-red-200"
                          : ""
                      }`}
                      ref={refs.research_interest}
                    />
                    {errors.research_interest && (
                      <span className="text-red-500 font-semibold mt-1">
                        {errors.research_interest}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-primary text-center px-5 py-3 mb-10 text-white text-lg font-semibold rounded-md cursor-pointer w-32 mx-auto"
              onClick={handleUpload}
            >
              Save
            </div>

            {showPopup && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-md w-[400px] text-center">
                  <h3 className="mb-4 text-xl font-semibold">
                    Add New Co-Author
                  </h3>
                  <input
                    type="text"
                    value={newCoAuthor}
                    onChange={(e) => setNewCoAuthor(e.target.value)}
                    placeholder="Enter Co-Author Name"
                    className="w-full p-4 border border-gray-300 rounded-md mt-2"
                  />
                  <button
                    onClick={handleNewCoAuthorSubmit}
                    className="bg-blue-500 text-white px-6 mx-2 py-2 rounded-md mt-4"
                  >
                    Add
                  </button>
                  <button
                    onClick={handlePopupClose}
                    className="bg-gray-500 text-white px-6 mx-2 py-2 rounded-md mt-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UploadPaperDetails;
