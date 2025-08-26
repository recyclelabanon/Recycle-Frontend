import { ArrowRight, Users, ShoppingBag, Palette, Heart } from 'lucide-react';

const Work = () => {
  const programs = [
    {
      title: 'Social Justice',
      icon: <Users className="h-6 w-6" />,
      description: 'Data visualise a circular economy to strengthen nature based solutions',
      link: 'Explore Platform',
      image: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&q=80',
      tag: 'empowerment'
    },
    {
      title: 'Conscious Consumption',
      icon: <ShoppingBag className="h-6 w-6" />,
      description: "The region's first free-from & zero waste shop",
      link: 'Visit EcoSouk',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
      tag: 'abundance'
    },
    {
      title: 'Creative Ecology',
      icon: <Palette className="h-6 w-6" />,
      description: 'Cultivate innovation with Self Sufficiency',
      link: 'See TerraPods',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80',
      tag: 'liberation'
    },
    {
      title: 'Community Action',
      icon: <Heart className="h-6 w-6" />,
      description: 'It starts with youth empowerment and awareness',
      link: 'Join Transition',
      image: 'https://plus.unsplash.com/premium_photo-1681505195930-388c317b7a76?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tag: 'solidarity'
    }
  ];

  return (
    <section className="py-20 bg-white-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <div key={index} className="group">
              {/* Tag above the box */}
              <div className="text-xs uppercase tracking-widest text-yellow-600 mb-2 font-medium">
                Collective {program.tag}
              </div>
              
              {/* Image box */}
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3 text-white">
                    {program.icon}
                    <h3 className="text-xl font-bold ">{program.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-4 min-h-[60px]">{program.description}</p>
              
              {/* Link below the box */}
              <a
                href="#"
                className="inline-flex items-center text-yellow-600 hover:text-yellow-800 transition-colors text-sm font-medium"
              >
                {program.link}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
