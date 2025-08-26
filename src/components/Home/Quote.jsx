import breakefreefromplastic from "../../assets/DiveIntoAction/breakefreefromplastic.png";

const Quote = () => {
  return (
    <section
      className="relative py-16 bg-center bg-cover"
      style={{
        backgroundImage: `url(${breakefreefromplastic})`,
      }}
    >
      {/* Lighter overlay for better image visibility */}
      <div className="absolute inset-0 bg-white/40" />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center max-w-4xl">
        <blockquote className="text-xl md:text-2xl leading-relaxed text-black">
          The organisation Kehdy founded during Lebanon&apos;s waste crisis presented a beacon of hope for the region
          with innovative solutions and a strong social base for their work.
        </blockquote>
        <cite className="block mt-4 text-black italic">
          — Break Free From Plastic
        </cite>
      </div>
    </section>
  );
};

export default Quote;
