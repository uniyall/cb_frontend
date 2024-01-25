import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(45, 50, 80)";
  }, []);
  return (
    <div className="mt-[250px] flex flex-col items-center">
      <h1 className="text-[100px] text-[#F6B17A] font-bold">brainloxGPT</h1>
      <Link to="/chatbot">
        <p className="text-gray-100 text-[30px] font-semibold hover:text-[#F6B17A]">
          CHAT NOW
        </p>
      </Link>
      <a href="https://brainlox.com/courses/category/technical" target="_blank">
        <p className="mt-2 text-[20px] text-[#7077A1] font-semibold hover:text-white">
          Scraped from brainlox
        </p>
      </a>
      <a className="fixed bottom-5" href="https://github.com/Jeet-beep" target="_blank">
        <p className="mt-2 text-gray-100 text-[14px] ">
          Made with ❤️ by Charanjeet Singh
        </p>
      </a>
    </div>
  );
}

export default Home;
