import { Link } from 'react-router-dom';

export const Landing = () => {
  const features = [
    {
      title: "Write & Share",
      description: "Express your thoughts and reach readers worldwide",
      icon: "✍️"
    },
    {
      title: "Engage & Connect",
      description: "Join discussions and build meaningful connections",
      icon: "🤝"
    },
    {
      title: "Learn & Grow",
      description: "Access quality content from diverse perspectives",
      icon: "🚀"
    },
    {
      title: "Safe & Secure",
      description: "Your content, your rights, always protected",
      icon: "🔒"
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="min-h-[85vh] flex flex-col justify-center items-center bg-gradient-to-br from-cyan-700 to-gray-700 text-white text-center px-4 py-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Your Story Matters
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Join our community of writers and readers. Share your perspective with the world.
        </p>
        <Link to="/signup">
          <button className="px-8 py-4 text-lg bg-white text-slate-600 rounded-lg font-medium hover:shadow-lg transition-shadow hover:scale-105">
            Join Now
          </button>
        </Link>
      </div>

      {/* Features Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
          Why Choose DailyDose?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of writers and readers who are already part of our community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <button
                className="px-8 py-3 bg-slate-600 text-white rounded-lg font-medium hover:bg-black hover:scale-105 transition-all"
              >
                Create Account
              </button>
            </Link>
            <Link to="/signin">
              <button
                className="px-8 py-3 bg-white text-slate-800 border border-slate-600 rounded-lg font-medium hover:bg-indigo-50 hover:scale-105 transition-all"
              >
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
