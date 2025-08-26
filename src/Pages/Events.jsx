import Hero from "../components/Hero";
import EventsPage from "../components/Event/EventsPage";

const Events = () => {
  
  return (
    <div className="pt-16 bg-gray-50">
      <Hero
        title="Join Our Events"
        subtitle="Be part of something bigger - connect, learn, and make an impact."
        backgroundImage="https://image.shutterstock.com/image-photo/corporate-development-seminar-business-people-260nw-2485558527.jpg"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <div className="space-y-20">
          <EventsPage />
        </div>
      </div>
    </div>
  );
};

export default Events;
