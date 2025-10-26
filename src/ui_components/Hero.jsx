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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center gap-6 bg-card dark:bg-card-foreground text-card-foreground dark:text-card rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-sm">
          <img
            src={`${BASE_URL}${userInfo?.profile_picture}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <p className="text-2xl font-bold text-foreground dark:text-primary-foreground">
            {userInfo?.first_name} {userInfo?.last_name}
          </p>
          <p className="text-sm text-muted-foreground font-normal">
            {userInfo?.job_title || "Collaborator & Editor"}
          </p>
        </div>

        {userInfo?.username === authUsername && (
          <span className="ml-0 md:ml-4">
            <HiPencilAlt
              className="text-xl text-primary cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleModal}
            />
          </span>
        )}
      </div>

      <p className="text-base text-muted-foreground leading-relaxed text-center max-w-2xl">
        {userInfo?.bio}
      </p>

      <div className="flex gap-4 justify-center items-center pt-4 border-t border-border mt-4 w-full max-w-xs">
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
