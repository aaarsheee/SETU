import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, Target, Award, Calendar, Hand } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const AboutPage = () => {
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true });
  const teamInView = useInView(teamRef, { once: true });

  const timeline = [
    {
      year: "2024",
      title: "Project Inception",
      description: "P-SETU was conceived as a final year project to address communication barriers faced by the deaf and mute community.",
      icon: Heart
    },
    {
      year: "2025 Q1",
      title: "Research & Development",
      description: "Extensive research into sign language recognition technologies and user experience design for accessibility.",
      icon: Target
    },
    {
      year: "2025 Q2",
      title: "AI Model Training",
      description: "Development and training of machine learning models for accurate ASL and NSL detection using computer vision.",
      icon: Award
    },
    {
      year: "2025 Q3",
      title: "Beta Testing",
      description: "Community testing with deaf organizations in Nepal to gather feedback and improve the platform.",
      icon: Users
    },
    {
      year: "2025 Q4",
      title: "Public Launch",
      description: "Official launch of P-SETU platform with full features including learning modules and community features.",
      icon: Calendar
    }
  ];

  const team = [
    {
      name: "Aakriti Thakuri",
      role: "Project Manager",
      avatar: "/api/placeholder/100/100",
      description: "Motivated project manager driven to lead inclusive tech projects that create real-world impact through collaboration and innovation."
    },
    {
      name: "Bibek Kasara",
      role: "Frontend Developer",
      avatar: "/api/placeholder/100/100",
      description: "Focused on creating intuitive, accessible interfaces that bridge design and usability for everyone."
    },
    {
      name: "Aarshee Ale Magar",
      role: "Backend Developer",
      avatar: "/api/placeholder/100/100",
      description: "Aspiring backend developer passionate about building secure, efficient systems that support inclusive and accessible technology."
    },
  ];

  const stats = [
    { number: "100+", label: "Sign Lessons", description: "Comprehensive ASL and NSL lessons" },
    { number: "95%", label: "Accuracy", description: "AI detection accuracy rate" },
    { number: "10K+", label: "Users", description: "Active learners in our community" },
    { number: "24/7", label: "Support", description: "Round-the-clock assistance" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-accent/20 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-full mx-auto mb-6">
              <Hand className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                P-SETU
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Bridging communication gaps through innovative AI technology and community-driven learning. 
              P-SETU empowers the deaf and mute community with accessible, inclusive educational tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              To create an inclusive digital ecosystem where sign language learning is accessible, 
              engaging, and effective for everyone. We believe that technology should break down 
              barriers, not create them.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="gradient-card text-center h-full">
                  <CardContent className="p-6">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold mb-2">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From idea to impact - see how P-SETU has evolved to serve the deaf and mute community.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:space-x-8`}
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <Card className="gradient-card">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-primary">{item.year}</div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10 hidden md:block" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals working together to make sign language learning accessible to everyone.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="gradient-card text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <div className="text-primary font-medium mb-3">{member.role}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at P-SETU.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants}>
              <Card className="gradient-card h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Accessibility First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every feature we build is designed with accessibility in mind, ensuring no one is left behind.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="gradient-card h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Community Driven</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform is built by and for the community, with continuous feedback and collaboration.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="gradient-card h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Innovation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We leverage cutting-edge AI and technology to create the most effective learning experience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;