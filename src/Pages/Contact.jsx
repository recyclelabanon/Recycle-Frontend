import Contact from "../components/Contact";
import Hero from "../components/Hero";


const Contacts = () => {
 

  return (
    <div>
        <Hero
            title="Connect with Us"
            subtitle="We'd love to hear from you. Please fill out the form below to get in touch."
            backgroundImage="https://media.istockphoto.com/id/1993967095/photo/technical-support-center-customer-service-internet-business-technology-concept.jpg?s=612x612&w=0&k=20&c=d1d0IfnEcP0h4XfskqSQIKOIz2bAOcbi5q1HhFbM32I="
        />
        <Contact />
    </div>
  );
};

export default Contacts;