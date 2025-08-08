import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Target, Users, MapPin, ExternalLink, Filter, AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultCauses = [
  {
    id: 1,
    title: "Sign Language Equipment for Rural Schools",
    description:
      "Help us provide video recording equipment and tablets to remote schools in Nepal for better sign language education.",
    image: "/images/sign5.jpg",
    raised: 15000,
    goal: 45000,
    donors: 123,
    location: "Dolpa, Nepal",
    category: "Education",
    urgent: true,
  },
  {
    id: 2,
    title: "Hearing Aid Support Program",
    description:
      "Subsidize hearing aids for children from low-income families to improve their quality of life and education.",
    image: "/images/sign7.jpeg",
    raised: 18000,
    goal: 50000,
    donors: 87,
    location: "Kathmandu Valley",
    category: "Healthcare",
    urgent: false,
  },
  {
    id: 3,
    title: "Community Sign Language Center",
    description:
      "Establish a community center in Pokhara for sign language classes, workshops, and social gatherings.",
    image: "/images/sign8.jpg",
    raised: 0,
    goal: 50000,
    donors: 0,
    location: "Pokhara, Nepal",
    category: "Infrastructure",
    urgent: false,
  },
  {
    id: 4,
    title: "Emergency Medical Communication Cards",
    description:
      "Create and distribute emergency medical communication cards for deaf individuals in hospitals across Nepal.",
    image: "/images/sign9.png",
    raised: 9000,
    goal: 15000,
    donors: 100,
    location: "Nationwide",
    category: "Healthcare",
    urgent: true,
  },
  {
    id: 5,
    title: "Sign Language Teacher Training",
    description:
      "Fund comprehensive training programs for teachers to become certified sign language instructors.",
    image: "/images/sign10.png",
    raised: 3000,
    goal: 30000,
    donors: 145,
    location: "Multiple Cities",
    category: "Education",
    urgent: false,
  },
];



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

const DonatePage = () => {
  const [selectedCause, setSelectedCause] = useState<number | null>(null);
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [fetchedCauses, setFetchedCauses] = useState([]);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true });
  const navigate = useNavigate(); 

  // Fetch dynamic causes from backend
  useEffect(() => {
    async function fetchCauses() {
      try {
        const res = await axios.get("/api/causes");
        setFetchedCauses(res.data.causes || []);
      } catch (error) {
        console.error("Error fetching causes", error);
      }
    }
    fetchCauses();
  }, []);

  // Combine static + dynamic causes
  const combinedCauses = [...defaultCauses, ...fetchedCauses];

  // Handle Donate Now click - redirect to backend payment initiation
  const handleDonate = async (causeId: number) => {
    try {
      const cause = combinedCauses.find((c) => c.id === causeId);
      if (!cause) {
        alert("Cause not found.");
        return;
      }

      // For demo, asking user for donation amount could be added later, here using remaining goal amount
      const amountToDonate = cause.goal - cause.raised > 0 ? cause.goal - cause.raised : 100; // fallback 100

      // Call backend to create transaction and get eSewa payment URL
      const { data } = await axios.post("/api/pay/esewa", {
        causeId: cause.id,
        amount: amountToDonate,
      });

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Failed to get payment URL.");
      }
    } catch (error) {
      console.error("Payment initiation error", error);
      alert("Failed to start payment. Please try again.");
    }
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
            Support Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mission
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us make sign language education and accessibility tools
            available to everyone in Nepal.
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-lg font-medium">Filter Donations</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={!showUrgentOnly ? "default" : "outline"}
              onClick={() => setShowUrgentOnly(false)}
              className="flex items-center space-x-2"
            >
              <span>All Causes</span>
            </Button>
            <Button
              variant={showUrgentOnly ? "default" : "outline"}
              onClick={() => setShowUrgentOnly(true)}
              className="flex items-center space-x-2 bg-destructive hover:bg-destructive/90"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Urgent Only</span>
            </Button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="gradient-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">NPR 90K</div>
              <div className="text-muted-foreground">Total Raised</div>
            </CardContent>
          </Card>
          <Card className="gradient-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-secondary mb-2">743</div>
              <div className="text-muted-foreground">Active Donors</div>
            </CardContent>
          </Card>
          <Card className="gradient-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-success mb-2">12</div>
              <div className="text-muted-foreground">Projects Funded</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Causes Grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {combinedCauses
            .filter((cause) => !showUrgentOnly || cause.urgent)
            .map((cause) => {
              const progressPercentage = (cause.raised / cause.goal) * 100;

              return (
                <motion.div key={cause.id} variants={cardVariants}>
                  <Card className="gradient-card h-full group hover:scale-105 transition-all duration-300">
                    <div className="relative">
                      <div className="aspect-video rounded-t-xl overflow-hidden">
                        <img
                          src={cause.image}
                          alt={cause.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {cause.urgent && (
                        <Badge className="absolute top-3 left-3 bg-destructive">
                          Urgent
                        </Badge>
                      )}
                      <Badge className="absolute top-3 right-3 bg-background/80 text-foreground">
                        {cause.category}
                      </Badge>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {cause.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {cause.description}
                      </p>

                      <div className="space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">
                              NPR {cause.raised.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              of NPR {cause.goal.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                          <div className="text-sm text-muted-foreground mt-1">
                            {Math.round(progressPercentage)}% funded
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{cause.donors} donors</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{cause.location}</span>
                          </div>
                        </div>

                        {/* Donate Button */}
                        <Button
                          className="w-full btn-hero group"
                          onClick={() => 
                            navigate("/pay",{
                              state:{
                                causeId:cause.id,
                                causeTitle:cause.title,
                                amount:cause.goal / 10 // example default donation (adjust logic)
                              },
                            })
                          }
                        >
                          <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Donate Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">How Your Donation Helps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Direct Impact</h3>
              <p className="text-muted-foreground">
                100% of your donation goes directly to the cause you choose, with
                full transparency.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Community Driven</h3>
              <p className="text-muted-foreground">
                Projects are proposed and managed by local community members and
                organizations.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold">Long-term Change</h3>
              <p className="text-muted-foreground">
                Every donation contributes to sustainable improvements in
                accessibility and education.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePage;
