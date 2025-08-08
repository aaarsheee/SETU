import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart,
  Share2,
  Plus,
  Image,
  Video,
  Trash,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";

const FeedPage = () => {
  const currentUser = {
    name: "Rita Rimal",
    username: "@ritarimal123",
    avatar: "/api/placeholder/40/40",
    verified: false,
  };

  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [media, setMedia] = useState<{ image?: string; video?: string }>({});
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const feedRef = useRef(null);
  const feedInView = useInView(feedRef, { once: true });

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("feedPosts");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            author: {
              name: "सुनिता शर्मा",
              username: "@sunita_signs",
              avatar: "/api/placeholder/40/40",
              verified: true,
            },
            content:
              "आज मैले sign language मा 'नमस्ते' र 'धन्यवाद' सिकें! 🙏 यो journey सुरु गर्दा मलाई डर लागेको थियो तर अहिले मस्त लाग्छ। Anyone else from Kathmandu learning? Let's practice together! 🤟",
            image: "/images/sign1.jpg",
            likes: 67,
            shares: 12,
            timestamp: "2 hours ago",
            category: "Learning",
          },
          {
            id: 2,
            author: {
              name: "James Wilson",
              username: "@james_deaf_nepal",
              avatar: "/api/placeholder/40/40",
              verified: false,
            },
            content:
              "Sign language is not universal! Just like spoken languages, sign languages develop in different regions...",
            video: "/videos/sign2.mp4",
            likes: 134,
            shares: 23,
            timestamp: "4 hours ago",
            category: "Community",
          },
          {
            id: 3,
            author: {
              name: "राज तामाङ",
              username: "@raj_signs_nepal",
              avatar: "/api/placeholder/40/40",
              verified: true,
            },
            content:
              "Daily tip: Mirror अगाडि practice गर्नुहोस्! Hand movements र facial expressions दुवै important छ।...",
            likes: 89,
            shares: 24,
            timestamp: "6 hours ago",
            category: "Tips",
          },
          {
            id: 4,
            author: {
              name: "कमला भुजेल",
              username: "@kamala_bhujel",
              avatar: "/api/placeholder/40/40",
              verified: false,
            },
            content:
              "केही वर्षअघिसम्म म सुन्न सक्थें, तर अचानक बिरामी परेपछि सुनाइ जान गयो...",
            likes: 156,
            shares: 31,
            timestamp: "8 hours ago",
            category: "Community",
          },
          {
            id: 5,
            author: {
              name: "अनिल बस्नेत",
              username: "@anil_deaf_advocate",
              avatar: "/api/placeholder/40/40",
              verified: true,
            },
            content:
              "पोखरा, रत्ननगरस्थित सामुदायिक भवनमा हाम्रो deaf awareness कार्यक्रम साँच्चै सफल भयो! 🎉...",
            image: "/images/sign3.jpg",
            likes: 234,
            shares: 89,
            timestamp: "1 day ago",
            category: "Community",
          },
          {
            id: 6,
            author: {
              name: "प्रिया पौडेल",
              username: "@priya_signs",
              avatar: "/api/placeholder/40/40",
              verified: false,
            },
            content:
              "बिहान उठेर practice गर्छु, खाना खाँदा family सँग signs use गर्छु...",
            likes: 78,
            shares: 16,
            timestamp: "1 day ago",
            category: "Personal",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("feedPosts", JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = () => {
    if (!newPost.trim() && !media.image && !media.video) return;

    const newPostObj = {
      id: Date.now(),
      author: currentUser,
      content: newPost,
      image: media.image,
      video: media.video,
      likes: 0,
      shares: 0,
      timestamp: "Just now",
      category: "Personal",
    };

    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setMedia({});
    setIsCreating(false);
  };

  const handleDelete = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPosts.includes(postId)
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setMedia({ ...media, [type]: url });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const postVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Feed
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect, share, and learn together with the sign language community.
          </p>
        </motion.div>

        {/* Create Post */}
        <Card className="gradient-card mb-8">
          <CardContent className="p-6">
            {!isCreating ? (
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>RR</AvatarFallback>
                </Avatar>
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex-1 text-left px-4 py-3 bg-muted/50 rounded-xl text-muted-foreground hover:bg-muted/70 transition-colors"
                >
                  What's on your mind?
                </button>
                <Button size="sm" className="btn-hero">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-24 resize-none"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "image")}
                    className="hidden"
                    id="uploadImage"
                  />
                  <label htmlFor="uploadImage">
                    <Button asChild variant="ghost" size="sm">
                      <span>
                        <Image className="w-4 h-4 mr-2" /> Photo
                      </span>
                    </Button>
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, "video")}
                    className="hidden"
                    id="uploadVideo"
                  />
                  <label htmlFor="uploadVideo">
                    <Button asChild variant="ghost" size="sm">
                      <span>
                        <Video className="w-4 h-4 mr-2" /> Video
                      </span>
                    </Button>
                  </label>
                </div>
                {(media.image || media.video) && (
                  <div className="rounded-lg overflow-hidden">
                    {media.image && (
                      <img
                        src={media.image}
                        alt="Preview"
                        className="w-full rounded-lg"
                      />
                    )}
                    {media.video && (
                      <video controls className="w-full rounded-lg">
                        <source src={media.video} type="video/mp4" />
                      </video>
                    )}
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost} className="btn-hero">
                    Post
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <motion.div
          ref={feedRef}
          variants={containerVariants}
          initial="hidden"
          animate={feedInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={postVariants}>
              <Card className="gradient-card hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3 flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{post.author.name}</span>
                        {post.author.verified && (
                          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {post.author.username} • {post.timestamp}
                      </div>
                    </div>
                  </div>
                  {post.author.username === currentUser.username && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="mb-4 leading-relaxed">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post visual"
                      className="w-full rounded-lg mb-4"
                    />
                  )}
                  {post.video && (
                    <video controls className="w-full rounded-lg mb-4">
                      <source src={post.video} type="video/mp4" />
                    </video>
                  )}
                  <div className="flex items-center justify-between border-t pt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        likedPosts.includes(post.id)
                          ? "text-destructive"
                          : "text-muted-foreground hover:text-destructive"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedPosts.includes(post.id) ? "fill-current" : ""
                        }`}
                      />
                      <span className="text-sm">{post.likes}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-secondary transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">{post.shares}</span>
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeedPage;
