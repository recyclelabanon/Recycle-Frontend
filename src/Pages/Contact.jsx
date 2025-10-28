import Contact from "../components/Contact";
import Hero from "../components/Hero";

const Contacts = () => {
  return (
    <div>
      <Hero
        title="Connect with Us"
        subtitle="We'd love to hear from you. Please fill out the form below to get in touch."
        backgroundImage="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"

      />
      <Contact />
    </div>
  );
};

export default Contacts;
