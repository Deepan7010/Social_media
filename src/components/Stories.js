import React from "react";

const Stories = () => {
  return (
    <>
      <div className="flex-col justify-between items-center">
        <div className="home-suggestion-title">Top Stories</div>
        <p className="text-sm text-gray-600">
          Join our vibrant community of Information Technology scholars and
          researchers.
        </p>
      </div>
      <div className="flex-col justify-between items-center">
        <div className="home-suggestion-title">Top Journals</div>
        <p className="text-sm text-gray-600">
          IEEE Transactions on Computers
          <br />
          Journal of the ACM (JACM)
        </p>
      </div>
      <div className="flex-col justify-between items-center">
        <div className="home-suggestion-title">Top Articles</div>
        <p className="text-sm text-gray-600">
          Dive into the potential of quantum computing and its implications for
          solving complex problems in record time.
        </p>
      </div>
    </>
  );
};

export default Stories;
