import Hero from "../components/Home/Hero";
import Mission from "../components/Home/Mission";
import Participate from "../components/Home/Participate";
import Quote from "../components/Home/Quote";
import Work from "../components/Home/Work";
import Newsletter from "../components/Home/Newsletter";
import HireUs from "../components/Home/HireUs";
import Donate from "../components/Home/Donate";
import VideoModal from "../components/VideoSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <Donate />
      <Mission />
      <Work />
      <Participate />
      <HireUs />
      <Newsletter />
      <VideoModal 
        videoUrl="https://player.vimeo.com/video/907802321"
        title="Recycle Labanon" 
        onClose />
      <Quote />
    </div>
  );
};

export default Home;

