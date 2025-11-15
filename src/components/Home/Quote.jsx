import { useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/quote")
      .then((res) => setQuote(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!quote) return null;

  return (
    <section
      className="relative py-8 md:py-12 bg-center bg-cover"
      style={{
        backgroundImage: `url(${quote.backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative container mx-auto px-4 text-center max-w-3xl md:max-w-4xl text-white">
        <div className="text-3xl md:text-4xl mb-3 opacity-90">“</div>
        
        <blockquote className="text-lg md:text-2xl leading-relaxed font-medium">
          {quote.quoteText}
        </blockquote>

        <cite className="block mt-4 text-sm md:text-base italic opacity-90">
          — {quote.author}
        </cite>
      </div>
    </section>
  );
};

export default Quote;
