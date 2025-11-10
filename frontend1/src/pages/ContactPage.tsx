import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface ContactInfo {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
  description: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@psetu.org',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+977 123-4567',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Kathmandu, Nepal',
      description: 'Welcome to our office anytime'
    }
  ];

  const categories: string[] = [
    'General Inquiry',
    'Technical Support',
    'Partnership',
    'Press & Media',
    'Accessibility Feedback',
    'Bug Report'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    setIsSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });

    setTimeout(() => setIsSubmitted(false), 3000);

  } catch (error) {
    console.error(error);
    alert("There was an error sending your message. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto">
              Have questions about SignSpeak? We're here to help you break down communication barriers.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 text-center group"
              >
                <div className="bg-gradient-to-r from-blue-400 to-emerald-400 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-blue-400 font-medium mb-2">{info.content}</p>
                <p className="text-gray-600 dark:text-gray-300 font-light text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Send us a Message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    aria-busy={isSubmitting}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          required
                          value={formData.category}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select a category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
