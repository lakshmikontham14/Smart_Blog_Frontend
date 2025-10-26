import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-6 items-start md:items-start text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary dark:text-primary-foreground">
            DevScribe
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed ">
            DevScribe is a user-friendly Content Management System (CMS) that
            allows easy content creation and management. Built with React.js,
            Tailwind CSS, and Django, it offers features like user
            authentication and customizable light/dark themes.
          </p>
        </div>

        <div className="text-foreground text-sm flex flex-col gap-4 px-4 items-center md:items-start">
          <p className="font-semibold text-base text-foreground dark:text-primary-foreground">
            Quick Links
          </p>
          <ul className="flex flex-col gap-3 text-muted-foreground items-center md:items-start">
            <li className="hover:text-primary transition-colors cursor-pointer">Home</li>
            <li className="hover:text-primary transition-colors cursor-pointer">About</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Archived</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Author</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
          </ul>
        </div>

        <div className="text-foreground text-sm flex flex-col gap-4 px-4 items-center md:items-start">
          <p className="font-semibold text-base text-foreground dark:text-primary-foreground">Category</p>
          <ul className="flex flex-col gap-3 text-muted-foreground items-center md:items-start">
            <li className="hover:text-primary transition-colors cursor-pointer">Lifestyle</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Technology</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Travel</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Business</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Economy</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Sports</li>
          </ul>
        </div>

        <div className="bg-secondary w-full md:w-1/4 px-6 flex flex-col items-center justify-center gap-4 rounded-lg py-8 shadow-lg">
          <h3 className="font-bold text-xl text-foreground dark:text-primary-foreground">
            Weekly Newsletter
          </h3>
          <p className="text-muted-foreground text-base mb-2 text-center">
            Get blog articles and offers via email
          </p>
          <div className="w-full relative">
            <input
              placeholder="Your Email"
              className="border border-input rounded-md h-10 px-3 py-2 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-card"
            />
            <CiMail className="absolute top-1/2 -translate-y-1/2 right-3 text-lg text-muted-foreground" />
          </div>
          <button className="bg-primary text-primary-foreground font-semibold text-base rounded-md w-full py-2.5 hover:bg-primary/90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      <div className="pt-8 mt-8 border-t border-border flex items-center justify-center gap-6 cursor-pointer">
        <FaInstagram className="text-xl text-muted-foreground hover:text-primary transition-colors" />
        <FaFacebookF className="text-xl text-muted-foreground hover:text-primary transition-colors" />
        <BsTwitterX className="text-xl text-muted-foreground hover:text-primary transition-colors" />
        <FaYoutube className="text-xl text-muted-foreground hover:text-primary transition-colors" />
      </div>
    </footer>
  );
};

export default Footer;
