import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import design_vii from "../images/design_vii.jpg";
import detailBanner from "../images/detailBanner.jpg";
import tech_girl from "../images/tech-girl.jpg";

const Header = () => {
  const images = [
    detailBanner,
    tech_girl,
    design_vii,
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
      <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] overflow-hidden rounded-xl shadow-md mx-auto">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showThumbs={false}
          showStatus={false}
        >
          {images.map((image, index) => (
            <div key={index} className="h-full">
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default Header
