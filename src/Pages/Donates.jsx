import Hero from "../components/Hero";
import Donate from "../components/Home/Donate";

const Donates = () => {
  return (
    <div className="pt-16">
      <Hero
        title="Support Our Mission"
        subtitle="Every contribution makes a difference. Join us in creating a sustainable future."
        backgroundImage="https://img.freepik.com/free-photo/donate-sign-charity-campaign_53876-127165.jpg?uid=R193627658&ga=GA1.1.91846166.1742625654&semt=ais_hybrid"
      />
      <Donate />
    </div>
  );
};

export default Donates;
