import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  User, 
  Edit, 
  BookOpen, 
  Award, 
  Calendar, 
  TrendingUp, 
  Settings,
  Camera,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const statsRef = useRef(null);
  const achievementsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const achievementsInView = useInView(achievementsRef, { once: true });

  const myPosts = [
    {
      id: 1,
      content: "मैले आज sign language मा 'धन्यवाद' भन्ने सिकें। It feels so good to connect with the deaf community! 🤟",
      timestamp: "2 days ago",
      likes: 34,
      comments: 7,
      shares: 3
    },
    {
      id: 2,
      content: "Daily practice tip: Practice in front of mirror गर्नुहोस्। यसले accuracy बढाउँछ र confidence पनि!",
      timestamp: "5 days ago",
      likes: 56,
      comments: 12,
      shares: 8
    },
    {
      id: 3,
      content: "Attended deaf community event in Kathmandu। सबैले धेरै माया गरे। Feeling blessed to be part of this journey.",
      timestamp: "1 week ago",
      likes: 89,
      comments: 23,
      shares: 15
    }
  ];

  const userStats = {
    lessonsCompleted: 24,
    totalLessons: 50,
    streakDays: 12,
    totalStudyHours: 45,
    postsShared: 8,
    helpfulVotes: 156
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Completed your first lesson",
      icon: "🎯",
      earned: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "7-day learning streak",
      icon: "🔥",
      earned: true,
      date: "2024-01-22"
    },
    {
      id: 3,
      title: "Helping Hand",
      description: "Received 50+ helpful votes",
      icon: "🤝",
      earned: true,
      date: "2024-01-28"
    },
    {
      id: 4,
      title: "Advanced Learner",
      description: "Complete 20 advanced lessons",
      icon: "🎓",
      earned: false,
      progress: 75
    },
    {
      id: 5,
      title: "Community Star",
      description: "Share 15 posts in the community",
      icon: "⭐",
      earned: false,
      progress: 53
    },
    {
      id: 6,
      title: "Master Detector",
      description: "Use detection feature 100 times",
      icon: "🎪",
      earned: false,
      progress: 34
    }
  ];

  const recentActivity = [
    {
      type: "lesson",
      title: "Completed 'Advanced Grammar Structures'",
      time: "2 hours ago"
    },
    {
      type: "post",
      title: "Shared a post about daily practice tips",
      time: "1 day ago"
    },
    {
      type: "achievement",
      title: "Earned 'Helping Hand' achievement",
      time: "2 days ago"
    },
    {
      type: "lesson",
      title: "Completed 'Emotions and Feelings'",
      time: "3 days ago"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="gradient-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-primary/20">
                    <AvatarImage src="/api/placeholder/128/128" />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      RR
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Rita Rimal</h1>
                      <p className="text-muted-foreground mb-2">@ritarimal123</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Badge variant="secondary">Intermediate Learner</Badge>
                        <Badge variant="outline">Community Member</Badge>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button 
                        variant={isEditing ? "outline" : "default"} 
                        onClick={() => setIsEditing(!isEditing)}
                        className="mr-2"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </Button>
                      <Button variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>ritarimal123@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Kathmandu, Nepal</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined January 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="gradient-card text-center">
              <CardContent className="p-4">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">
                  {userStats.lessonsCompleted}
                </div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="gradient-card text-center">
              <CardContent className="p-4">
                <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">
                  {userStats.streakDays}
                </div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="gradient-card text-center">
              <CardContent className="p-4">
                <User className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary">
                  {userStats.postsShared}
                </div>
                <div className="text-sm text-muted-foreground">Posts Shared</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="gradient-card text-center">
              <CardContent className="p-4">
                <Award className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-warning">
                  {userStats.helpfulVotes}
                </div>
                <div className="text-sm text-muted-foreground">Helpful Votes</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="progress" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="progress">Learning Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="posts">My Posts</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="progress" className="space-y-6">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {userStats.lessonsCompleted}/{userStats.totalLessons} lessons
                      </span>
                    </div>
                    <Progress value={(userStats.lessonsCompleted / userStats.totalLessons) * 100} className="h-3" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">48%</div>
                      <div className="text-sm text-muted-foreground">Beginner Level</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-warning">30%</div>
                      <div className="text-sm text-muted-foreground">Intermediate Level</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">22%</div>
                      <div className="text-sm text-muted-foreground">Advanced Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <motion.div
                ref={achievementsRef}
                variants={containerVariants}
                initial="hidden"
                animate={achievementsInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {achievements.map((achievement) => (
                  <motion.div key={achievement.id} variants={itemVariants}>
                    <Card className={`gradient-card ${achievement.earned ? 'ring-2 ring-primary/20' : 'opacity-75'}`}>
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <Badge className="bg-success">
                            Earned {achievement.date}
                          </Badge>
                        ) : (
                          <div className="space-y-2">
                            <Progress value={achievement.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              {achievement.progress}% complete
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              <div className="space-y-4">
                {myPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="gradient-card">
                      <CardContent className="p-6">
                        <p className="text-foreground mb-4 leading-relaxed">
                          {post.content}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{post.timestamp}</span>
                          <div className="flex items-center space-x-4">
                            <span>❤️ {post.likes}</span>
                            <span>🔗 {post.shares}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
                      >
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === 'lesson' ? 'bg-primary' :
                          activity.type === 'post' ? 'bg-secondary' :
                          'bg-success'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;