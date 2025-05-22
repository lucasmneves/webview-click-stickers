
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

const HeroBanner = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
}: HeroBannerProps) => {
  return (
    <div 
      className="relative bg-cover bg-center h-[400px] md:h-[500px] flex items-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` 
      }}
    >
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fade-in">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in">
          {subtitle}
        </p>
        <Link to={buttonLink}>
          <Button size="lg" className="bg-sticker-teal hover:bg-sticker-teal/90 text-white">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
