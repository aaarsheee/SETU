import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Filter, Play, Clock, User, Star, Search, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

const LearnPage = () => {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true });

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const lessons = [
    {
      id: 1,
      title: "Basic Greetings in ASL",
      description: "Learn essential greeting signs like hello, goodbye, and nice to meet you.",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "/videos/basic-greetings.mp4",
      duration: "11 sec",
      level: "Beginner",
      instructor: "Peter Johnson",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Family Members Signs",
      description: "Master signs for family members and relationships.",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "/videos/family-signs.mp4",
      duration: "6 min",
      level: "Beginner",
      instructor: "Lisa Park",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Numbers from 1-10 in ASL",
      description: "Learn essential greeting signs like hello, goodbye, and nice to meet you.",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "/videos/numbers-1-10.mp4",
      duration: "5 min",
      level: "Beginner",
      instructor: "Sarah Johnson",
      rating: 4.8,
    },
    {
      id: 4,
      title: "Advanced Grammar Structures",
      description: "Complex sentence structures and grammar rules in ASL.",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "/videos/advanced_grammar.mp4",
      duration: "12 min",
      level: "Advanced",
      instructor: "Lisa Park",
      rating: 4.9,
    },
    {
      id: 5,
      title: "Emotions and Feelings",
      description: "Express various emotions and feelings through sign language.",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "/videos/emotions.mp4",
      duration: "10 min",
      level: "Intermediate",
      instructor: "Lisa Park",
      rating: 4.8,
    },
    {
      id: 6,
      title: "Food and Dining Signs",
      description: "Signs related to food, cooking, and dining experiences.",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "/videos/food.mp4",
      duration: "25 min",
      level: "Intermediate",
      instructor: "Carly Martinez",
      rating: 4.6,
    },
    // ... rest of lessons
  ];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesLevel = selectedLevel === "All" || lesson.level === selectedLevel;
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sign Language
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master ASL and NSL through our comprehensive video lessons designed for all skill levels.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex space-x-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                  className={selectedLevel === level ? "btn-hero" : ""}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="gradient-card overflow-hidden h-full">
                <div className="relative">
                  <div className="relative aspect-video overflow-hidden group">
                    <video
                      src={lesson.videoUrl}
                      className="w-full h-full object-cover rounded-t-xl"
                      preload="metadata"
                      muted
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                    <Play className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-80 group-hover:opacity-100 transition-opacity w-12 h-12" />
                  </div>
                  <Badge
                    className={`absolute top-3 left-3 z-20 ${
                      lesson.level === "Beginner"
                        ? "bg-success"
                        : lesson.level === "Intermediate"
                        ? "bg-warning"
                        : "bg-destructive"
                    }`}
                  >
                    {lesson.level}
                  </Badge>
                  <div className="absolute bottom-3 right-3 z-20 flex items-center space-x-1 text-white text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{lesson.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{lesson.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span className="font-medium">{lesson.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button size="sm" className="btn-hero" onClick={() => setActiveLesson(lesson)}>
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for Video Playback */}
        {activeLesson && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setActiveLesson(null)} // Close on overlay click
          >
            <div
              className="bg-white rounded-xl shadow-lg w-full max-w-3xl relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // Prevent close on modal click
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLesson(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 pointer-events-auto"
                aria-label="Close video modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                <video
                  src={activeLesson.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full rounded-t-xl"
                />
              </div>

              {/* Lesson Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{activeLesson.title}</h2>
                <p className="text-muted-foreground mb-4">{activeLesson.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{activeLesson.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="font-medium">{activeLesson.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
