import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Section from "../components/Section";
import { img10, img12, img34, img41 } from '../assets/Image';
import { Link } from "react-router-dom";

const BRAND_BLUE = "#2726CC"; 

const AboutUs = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch About Us content from backend
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/aboutus");
        setAbout(res.data.data);
      } catch (error) {
        console.error("Failed to fetch About Us data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!about)
    return (
      <div className="text-center py-10 text-red-500">
        No About Us data found
      </div>
    );

    const impactPrograms = [
    {
      title: "RegenerateHub",
      description:
        "Propels data driven community engagement, fostering climate-driven practices and resilient ecosystems.",
      logo: img34,
      color: BRAND_BLUE, // Brand blue
      bgColor: "bg-[#2726CC]/10",
      hoverColor: "hover:bg-[#2726CC]/20",
    },
    {
      title: "EcoSouk",
      description:
        "Nurtures conscious living and local economies, connecting makers and consumers.",
      logo: img12,
      color: "#0FA958", // Brand green
      bgColor: "bg-[#0FA958]/10",
      hoverColor: "hover:bg-[#0FA958]/20",
    },
    {
      title: "TerraPods",
      description:
        "Fosters innovation and self sufficiency through STEAM-driven collaboration.",
      logo: img41,
      color: "#E5A33F", // Brand orange
      bgColor: "bg-[#E5A33F]/10",
      hoverColor: "hover:bg-[#E5A33F]/20",
    },
    {
      title: "Dive Into Action",
      description:
        "Sparks a transformative shift toward environmental conscious actions.",
      logo: img10,
      color: "#00A2C7", // Brand teal
      bgColor: "bg-[#00A2C7]/10",
      hoverColor: "hover:bg-[#00A2C7]/20",
    },
  ];

  // ✅ Pull hero and sections dynamically
  const mission = about.sections?.find((s) => s.title === "Our Mission") || about.sections[0];
  const story = about.sections?.find((s) => s.title === "Our Story") || about.sections[1];
  const vision = about.sections?.find((s) => s.title === "Our Vision") || about.sections[2];

  return (
    <div className="pt-16">
      {/* 🟦 Hero Section */}
      <Hero
        title={about.hero?.title || "Founding Roots"}
        subtitle={
          about.hero?.subtitle ||
          "Catalysing systemic change through creative ecology since 2015"
        }
        backgroundImage={
          about.hero?.background?.url ||
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2013&q=80"
        }
      />

      {/* 🟩 Our Mission */}
      {mission && (
        <Section title={mission.title} dark={mission.dark || false}>
          <div
            className={`max-w-6xl mx-auto flex flex-col-reverse ${
              mission.image?.position === "left"
                ? "md:flex-row"
                : "md:flex-row-reverse"
            } gap-8 items-center`}
          >
            <div className="md:w-1/2">
              <div
                className={`prose ${mission.dark ? "prose-invert" : ""} prose-lg`}
                dangerouslySetInnerHTML={{ __html: mission.contentHtml }}
              />
            </div>
            {mission.image?.url && (
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={mission.image.url}
                    alt={mission.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 🟧 Our Story */}
      {story && (
        <Section title={story.title} dark={story.dark || true}>
          <div
            className={`max-w-6xl mx-auto flex flex-col-reverse ${
              story.image?.position === "left"
                ? "md:flex-row"
                : "md:flex-row-reverse"
            } gap-8 items-center`}
          >
            <div className="md:w-1/2">
              <div
                className={`prose ${story.dark ? "prose-invert" : ""} prose-lg`}
                dangerouslySetInnerHTML={{ __html: story.contentHtml }}
              />
            </div>
            {story.image?.url && (
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={story.image.url}
                    alt={story.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Impact Statement */}
      <Section title="Impact Statement">
        <div className="max-w-5xl mx-auto">
          <div className="prose prose-lg max-w-4xl mx-auto mb-8">
            <p className="text-lg leading-relaxed">
              As a committed advocate for transformative impact, Recycle Lebanon&apos;s holistic programmes shape our
              interconnected future, fostering resilience and cultivating ecological tools for collective liberation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {impactPrograms.map((program, index) => (
              <Link
                to={`/initiatives/${program.title.replace(/\s+/g, '').toLowerCase()}`}
                key={index}
                className={`${program.bgColor} ${program.hoverColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg flex flex-col cursor-pointer`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 mr-4 flex-shrink-0 bg-white rounded-full shadow-md flex items-center justify-center p-2">
                    <img
                      src={program.logo}
                      alt={`${program.title} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Brand-specific heading styling */}
                  <h3
                    className="text-2xl font-brand font-extrabold uppercase tracking-tight"
                    style={{
                      color: program.color, // uses brand palette
                      fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif", // fallback until brand font imported
                      letterSpacing: '0.5px',
                    }}
                  >
                    {program.title}
                  </h3>
                </div>

                <p className="text-gray-700 mt-2 leading-relaxed">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* 🟦 Our Vision */}
      {vision && (
        <Section title={vision.title} dark={vision.dark || true}>
          <div
            className={`max-w-6xl mx-auto flex flex-col-reverse ${
              vision.image?.position === "left"
                ? "md:flex-row"
                : "md:flex-row-reverse"
            } gap-8 items-center`}
          >
            <div className="md:w-1/2">
              <div
                className={`prose ${vision.dark ? "prose-invert" : ""} prose-lg`}
                dangerouslySetInnerHTML={{ __html: vision.contentHtml }}
              />
            </div>
            {vision.image?.url && (
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={vision.image.url}
                    alt={vision.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </Section>
      )}
    </div>
  );
};

export default AboutUs;
