import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// convert icon name to lucide icon component
const iconMap = (name) => {
  return Icons[name] || Icons.Activity; 
};

const Work = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/api/v1/homepage-work`)
      .then(res => setData(res.data))
      .catch(err => console.error("Failed to load homepage", err));
  }, []);

  if (!data) return null;

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.heading}</h2>
          <p className="text-gray-600 text-lg">{data.paragraph}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.programs?.map((p, i) => {
            const Icon = iconMap(p.icon);

            const imgSrc = p.image?.startsWith("http")
              ? p.image
              : `${API}${p.image}`;

            return (
              <div key={i} className="group">
                <div className={`text-xs uppercase tracking-widest font-bold mb-2 whitespace-pre-line ${p.color}`}>
                  {p.collective}
                </div>

                <div className="relative overflow-hidden rounded-xl aspect-square mb-4">
                  <img
                    src={imgSrc}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-3 text-white">
                      <Icon className="h-6 w-6" />
                      <h3 className="text-2xl font-extrabold leading-tight">
                        <div>{p.titleLine1}</div>
                        <div>{p.titleLine2}</div>
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-2">{p.description}</p>
                <p className="font-medium mb-3">{p.tagline}</p>

                <a
                  href="#"
                  className={`inline-flex items-center font-semibold transition-colors text-sm ${p.color} hover:opacity-80`}
                >
                  {p.linkText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;
