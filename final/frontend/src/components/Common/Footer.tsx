import facebookURL from "../../images/facebook.png";
import instagramURL from "../../images/instagram.png";
import githubURL from "../../images/github.png";
import twitterURL from "../../images/twitter.png";

const Footer = () => {
  return (
    <section className="bg-gray-50 border-t-2">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-2xl leading-6 text-gray-500 hover:text-gray-900"
            >
              About
            </a>
          </div>
        </nav>
        <div className="flex justify-center mt-6 space-x-6">
          <a
            href="https://www.facebook.com"
            className="text-gray-400 hover:text-gray-500"
          >
            <img src={facebookURL} alt="facebook link" className="w-10 h-10" />
          </a>
          <a
            href="https://www.instagram.com"
            className="text-gray-400 hover:text-gray-500"
          >
            <img
              src={instagramURL}
              alt="instagram link"
              className="w-10 h-10"
            />
          </a>
          <a
            href="https://www.github.com"
            className="text-gray-400 hover:text-gray-500"
          >
            <img src={githubURL} alt="github link" className="w-10 h-10" />
          </a>
          <a
            href="https://www.twitter.com"
            className="text-gray-400 hover:text-gray-500"
          >
            <img src={twitterURL} alt="twitter link" className="w-10 h-10" />
          </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 112-1 Web Programming Final Project Group 2. All rights reserved.
        </p>
      </div>
    </section>
    // <footer className="flex flex-row justify-evenly border-2 border-black m-2">
    //   <a
    //     href="https://www.facebook.com"
    //     target="_blank"
    //     rel="noreferrer"
    //     className="w-10 m-1"
    //   >
    //     <img src={facebookURL} alt="facebook link" />
    //   </a>

    //   <a
    //     href="https://www.instagram.com"
    //     target="_blank"
    //     rel="noreferrer"
    //     className="w-10 m-1"
    //   >
    //     <img src={instagramURL} alt="instgram link" />
    //   </a>

    //   <a
    //     href="https://www.github.com"
    //     target="_blank"
    //     rel="noreferrer"
    //     className="w-10 m-1"
    //   >
    //     <img src={githubURL} alt="github link" />
    //   </a>

    //   <a
    //     href="https://www.twitter.com"
    //     target="_blank"
    //     rel="noreferrer"
    //     className="w-10 m-1"
    //   >
    //     <img src={twitterURL} alt="twitter link" />
    //   </a>
    // </footer>
  );
};

export default Footer;
