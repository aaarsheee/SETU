import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Brain, 
  BookOpen, 
  Users, 
  Heart, 
  ArrowRight, 
  Play,
  CheckCircle,
  Zap,
  Shield,
  Globe
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const HomePage = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  const features = [
    {
      icon: Brain,
      title: t("home.features.items.detection.title"),
      description: t("home.features.items.detection.description"),
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: BookOpen,
      title: t("home.features.items.learning.title"),
      description: t("home.features.items.learning.description"),
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Users,
      title: t("home.features.items.community.title"),
      description: t("home.features.items.community.description"),
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Heart,
      title: t("home.features.items.support.title"),
      description: t("home.features.items.support.description"),
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const stats = [
    { number: "10K+", label: t("home.stats.users") },
    { number: "100+", label: t("home.stats.lessons") },
    { number: "95%", label: t("home.stats.accuracy") },
    { number: "24/7", label: t("home.stats.support") }
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-primary/10 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-success/20 to-warning/20 rounded-full blur-xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
                {t("home.hero.title")}
              </span>
              <br />
              <span className="text-foreground">{t("home.hero.subtitle")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              {t("home.hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/register">
                <Button size="lg" className="btn-hero group">
                  {t("home.hero.getStarted")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="group">
                  <Play className="w-5 h-5 mr-2" />
                  {t("home.hero.watchDemo")}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>{t("home.hero.features.free")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-warning" />
                <span>{t("home.hero.features.realtime")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>{t("home.hero.features.privacy")}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {t("home.features.title")}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("home.features.titleHighlight")}
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {t("home.features.description")}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="gradient-card h-full group hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-4`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-4xl md:text-5xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("home.cta.title")}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("home.cta.titleHighlight")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("home.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="btn-hero">
                  {t("home.cta.createAccount")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline">
                  <Globe className="w-5 h-5 mr-2" />
                  {t("home.cta.exploreLessons")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;