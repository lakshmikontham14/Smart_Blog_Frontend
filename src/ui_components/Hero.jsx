import pic from "../images/pic.jpg";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { BASE_URL } from "@/api";
// import ImageCarousel from "./ImageCarousel"; // Removed ImageCarousel import
// import design_vii from "../images/design_vii.jpg"; // Removed image import
// import detailBanner from "../images/detailBanner.jpg"; // Removed image import
// import tech_girl from "../images/tech-girl.jpg"; // Removed image import

const Hero = ({ userInfo, authUsername, toggleModal }) => {
  // const images = [
  //   design_vii,
  //   detailBanner,
  //   tech_girl,
  //   `${BASE_URL}${userInfo?.profile_picture}`,
  // ]; // Removed images array

  // console.log("Hero component rendered."); // Removed console log
  // console.log("Images array in Hero:", images); // Removed console log

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center gap-6 bg-card dark:bg-card-foreground text-card-foreground dark:text-card rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-primary shadow-sm flex-shrink-0">
          <img
            src={`${BASE_URL}${userInfo?.profile_picture}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
          <p className="text-xl sm:text-2xl font-bold text-foreground dark:text-primary-foreground">
            {userInfo?.first_name} {userInfo?.last_name}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal">
            {userInfo?.job_title || "Collaborator & Editor"}
          </p>
        </div>

        {userInfo?.username === authUsername && (
          <span className="mt-2 sm:mt-0 sm:ml-4">
            <HiPencilAlt
              className="text-xl text-primary dark:text-primary-foreground cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleModal}
            />
          </span>
        )}
      </div>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center max-w-2xl px-4 sm:px-0">
        {userInfo?.bio}
      </p>

      <div className="flex gap-4 sm:gap-6 justify-center items-center pt-4 border-t border-border mt-4 w-full max-w-xs">
        {userInfo?.facebook && (
          <a href={userInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-xl text-muted-foreground hover:text-primary transition-colors">
            <FaFacebookF />
          </a>
        )}
        {userInfo?.instagram && (
          <a href={userInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-xl text-muted-foreground hover:text-primary transition-colors">
            <FaInstagram />
          </a>
        )}
        {userInfo?.twitter && (
          <a href={userInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-xl text-muted-foreground hover:text-primary transition-colors">
            <BsTwitterX />
          </a>
        )}
        {userInfo?.youtube && (
          <a href={userInfo.youtube} target="_blank" rel="noopener noreferrer" className="text-xl text-muted-foreground hover:text-primary transition-colors">
            <FaYoutube />
          </a>
        )}
      </div>
    </div>
  );
};

export default Hero;
