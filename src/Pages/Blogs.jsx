import Blog from "../components/Blog";
import Hero from "../components/Hero";


const Blogs = () => {
  return (
    <div className="pt-16">
      <Hero
        title="Insights & Stories"
        subtitle="Discover meaningful stories, updates, and perspectives that drive ecological change."
        backgroundImage="https://img.freepik.com/free-photo/information-articles-blogging-device-screen_53876-124046.jpg?uid=R193627658&ga=GA1.1.91846166.1742625654&semt=ais_hybrid"
      />
      
  

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-20">
           
        
          <Blog />

          
        </div>
      </div>
    </div>
  );
};

export default Blogs;
