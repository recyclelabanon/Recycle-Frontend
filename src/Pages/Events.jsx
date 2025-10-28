import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import EventsPage from "../components/Event/EventsPage";

const Events = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/event-hero")
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch((err) => console.error(err));
  }, []);

  if (!hero) return null;

  return (
    <div className="pt-16 bg-gray-50">
      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
         backgroundImage="https://image.shutterstock.com/image-photo/corporate-development-seminar-business-people-260nw-2485558527.jpg"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-20">
          <EventsPage />
        </div>
      </div>
    </div>
  );
};

export default Events;
