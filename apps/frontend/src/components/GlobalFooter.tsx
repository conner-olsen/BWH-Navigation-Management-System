import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import facebookLogo from "/icon/FACEBOOK.png"; // Import the Facebook logo image
import instagramLogo from "/icon/INSTAGRAM.png"; // Import the Instagram logo image
import youtubeLogo from "/icon/YOUTUBE.png"; // Import the YouTube logo image
import linkedinLogo from "/icon/LINKEDIN.png"; // Import the LinkedIn logo image
import twitterLogo from "/icon/TWTTER.png"; // Import the Twitter logo image

export default function GlobalFooter() {
  return (
    <footer className="flex flex-col flex-grow-1 justify-end w-full py-2">
      <hr className="my-2 container" />
      <div className="container flex justify-between">
        <p className="text-xs m-0">© 2024 Brigham and Women's Hospital</p>
        <div className="flex items-center">
          {/* Twitter button */}
          <a
            href="https://twitter.com/BrighamWomens"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-1 inline-block no-underline text-xs dark:text-blue-400"
          >
            <img
              src={twitterLogo}
              alt="Twitter Logo"
              className="w-5 h-5 mr-1"
            />
          </a>
          {/* LinkedIn button */}
          <a
            href="https://www.linkedin.com/company/brigham-and-women%27s-hospital/"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-1 inline-block no-underline text-xs dark:text-blue-400"
          >
            <img
              src={linkedinLogo}
              alt="LinkedIn Logo"
              className="w-5 h-5 mr-1"
            />
          </a>
          {/* YouTube button */}
          <a
            href="https://www.youtube.com/user/Brighamandwomens"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-1 inline-block no-underline text-xs dark:text-blue-400"
          >
            <img
              src={youtubeLogo}
              alt="YouTube Logo"
              className="w-5 h-5 mr-1"
            />
          </a>
          {/* Instagram button */}
          <a
            href="https://www.instagram.com/brighamandwomens/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-1 inline-block no-underline text-xs dark:text-blue-400"
          >
            <img
              src={instagramLogo}
              alt="Instagram Logo"
              className="w-5 h-5 mr-1"
            />
          </a>
          {/* Facebook button */}
          <a
            href="https://www.facebook.com/BrighamandWomensHospital/"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-1 inline-block no-underline text-xs dark:text-blue-400"
          >
            <img
              src={facebookLogo}
              alt="Facebook Logo"
              className="w-5 h-5 mr-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
