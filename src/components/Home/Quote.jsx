import breakefreefromplastic from "../../assets/DiveIntoAction/breakefreefromplastic.png";

const Quote = () => {
  return (
    <section
      className="relative py-8 md:py-12 bg-center bg-cover"
      style={{
        backgroundImage: `url(${breakefreefromplastic})`,
      }}
    >
      {/* Slightly darker overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center max-w-3xl md:max-w-4xl text-white">
        {/* Smaller quotation icon */}
        <div className="text-3xl md:text-4xl mb-3 opacity-90">“</div>

        {/* Quote text in white */}
        <blockquote className="text-lg md:text-2xl leading-relaxed font-medium">
          The organisation Kehdy founded during Lebanon’s waste crisis became a beacon of hope for the region, offering innovative solutions and building a strong social base for their work.
        </blockquote>

        {/* Partner name */}
        <cite className="block mt-4 text-sm md:text-base italic opacity-90">
          — Break Free From Plastic
        </cite>
      </div>
    </section>
  );
};

export default Quote;
