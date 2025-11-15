import { useEffect, useState } from "react";
import axios from "axios";
import Donate from "../components/Home/Donate";

const Donates = () => {
  const [hero, setHero] = useState({
    title: "Loading...",
    subtitle: "",
    backgroundImage: "https://via.placeholder.com/1200x400.png?text=Loading+Hero",
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/donation-page-hero");
        console.log("Fetched hero for homepage:", JSON.stringify(res.data, null, 2));
        if (res.data) {
          setHero({
            title: res.data.title || "Default Title",
            subtitle: res.data.subtitle || "Default Subtitle",
            backgroundImage: res.data.backgroundImage || "https://via.placeholder.com/1200x400.png?text=Default+Hero",
          });
        }
      } catch (err) {
        console.error("Error fetching hero:", err.response?.data || err.message);
      }
    };
    fetchHero();
  }, []);

  return (
    <div className="pt-16">
      <div
        key={hero.backgroundImage}
        className="h-96 flex flex-col justify-center items-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <h1 className="text-4xl font-bold">{hero.title}</h1>
        <p className="text-xl mt-2">{hero.subtitle}</p>
      </div>

      <Donate />
    </div>
  );
};

export default Donates;
