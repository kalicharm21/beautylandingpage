import { motion } from 'framer-motion';
import { Heart, Leaf, Award, Users, Sparkles, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Cruelty-Free',
      description: 'We never test on animals and are committed to ethical beauty practices.',
    },
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'Premium botanical ingredients sourced sustainably from around the world.',
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Every product is tested and refined to meet our highest standards.',
    },
    {
      icon: Users,
      title: 'Inclusive Beauty',
      description: 'Beauty products designed for all skin tones, types, and preferences.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Cutting-edge formulations that deliver exceptional results.',
    },
    {
      icon: Shield,
      title: 'Clean Beauty',
      description: 'Free from harmful chemicals, parabens, and synthetic fragrances.',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300',
      description: 'Former beauty industry executive with 15+ years of experience.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Product Development',
      image: '/api/placeholder/300/300',
      description: 'Cosmetic chemist specializing in sustainable formulations.',
    },
    {
      name: 'Aisha Patel',
      role: 'Creative Director',
      image: '/api/placeholder/300/300',
      description: 'Award-winning makeup artist and color theory expert.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-gradient-hero rounded-lg mb-16"
      >
        <h1 className="font-luxury text-4xl lg:text-6xl font-bold text-foreground mb-6">
          Our Story
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Born from a passion for clean, luxury beauty, VELOUR was founded on the belief that 
          premium cosmetics should be accessible, ethical, and effective for everyone.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-luxury text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We're on a mission to revolutionize the beauty industry by creating products that 
              enhance your natural beauty while respecting the planet and its inhabitants.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every VELOUR product is thoughtfully formulated with the finest natural ingredients, 
              rigorously tested for quality, and packaged with sustainability in mind.
            </p>
          </div>
          <div className="relative">
            <img
              src="/api/placeholder/600/400"
              alt="VELOUR cosmetics laboratory"
              className="rounded-lg shadow-elegant w-full"
            />
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-16 bg-card rounded-lg mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="font-luxury text-3xl font-bold text-foreground mb-4">
            Our Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These core principles guide everything we do, from product development to customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center p-6 hover:bg-background rounded-lg transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                <value.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-16"
      >
        <div className="text-center mb-12">
          <h2 className="font-luxury text-3xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind VELOUR, dedicated to bringing you the finest beauty products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.2 }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 object-cover rounded-full mx-auto shadow-soft group-hover:shadow-elegant transition-shadow"
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Commitment Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="py-16 bg-gradient-soft rounded-lg text-center"
      >
        <h2 className="font-luxury text-3xl font-bold text-foreground mb-6">
          Our Commitment to You
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Quality Assurance</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every product undergoes rigorous testing in our state-of-the-art facilities to ensure 
              safety, efficacy, and consistency.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Sustainable Practices</h3>
            <p className="text-muted-foreground leading-relaxed">
              We're committed to reducing our environmental impact through sustainable sourcing, 
              eco-friendly packaging, and carbon-neutral shipping.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Customer Support</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our beauty experts are here to help you find the perfect products and achieve your 
              beauty goals with personalized recommendations.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Innovation</h3>
            <p className="text-muted-foreground leading-relaxed">
              We continuously research and develop new formulations using the latest scientific 
              advances and customer feedback.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;