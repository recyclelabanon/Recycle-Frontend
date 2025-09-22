import { ChevronRight } from "lucide-react";
import { useState } from "react";

// Recycle Lebanon Purple-Blue (Pantone 2726C)
const RECYCLE_LEBANON_BLUE = "#2726CC";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: clientX - left, y: clientY - top });
  };

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 transform-gpu transition-transform duration-300"
        style={{
          transform: `translate(
            ${(mousePosition.x - window.innerWidth / 2) * 0.02}px,
            ${(mousePosition.y - window.innerHeight / 2) * 0.02}px
          )`,
        }}
      >
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b"
            alt="Sustainability"
            className="w-full h-full object-cover animate-image-pan"
          />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-white px-4">
        <div className="max-w-4xl text-center space-y-8">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up hover:scale-105 transition-transform duration-300 cursor-default"
          >
            <span
              className="bg-clip-text text-transparent animate-text-glow"
              style={{
                backgroundImage: `linear-gradient(to right, ${RECYCLE_LEBANON_BLUE}, ${RECYCLE_LEBANON_BLUE})`,
              }}
            >
              re[psych]le
            </span>
            <br className="md:hidden" /> the system, <br />
            design out waste.
            {/* Animated underline */}
            <div
              className="mt-4 mx-auto w-24 h-1 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{ backgroundColor: RECYCLE_LEBANON_BLUE }}
            />
          </h1>

          <button
            className="text-white px-8 py-3 rounded-full flex items-center justify-center mx-auto transition-all 
                      transform hover:scale-105 hover:shadow-2xl active:scale-95 group relative overflow-hidden"
            style={{ backgroundColor: RECYCLE_LEBANON_BLUE }}
          >
            {/* Button Shine Effect */}
            <div
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                clipPath:
                  "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
              }}
            />

            <span className="relative flex items-center">
              Learn More
              <ChevronRight className="ml-2 h-5 w-5 inline-block transition-transform group-hover:translate-x-1" />
            </span>

            {/* Ripple Effect */}
            <span className="absolute inset-0 animate-ripple opacity-0 group-active:opacity-30 bg-white/30 rounded-full" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="h-8 w-8 transform rotate-90 opacity-75" />
      </div>
    </section>
  );
};

export default Hero;
