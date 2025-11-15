import { useEffect, useState } from "react";
import axios from "axios";
import Contact from "../components/Contact";
import Hero from "../components/Hero";


const Contacts = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/contact-hero');
        setHeroData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHero();
  }, []);

  if (!heroData) return <p>Loading...</p>;

  return (
    <div>
      <Hero
        title={heroData.title}
        subtitle={heroData.subtitle}
        backgroundImage={heroData.backgroundImage}
      />
      <Contact />
    </div>
  );
};

export default Contacts;
