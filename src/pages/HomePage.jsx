import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../lib/ThemeContext";

import design_vii from "../images/design_vii.jpg";
import detailBanner from "../images/detailBanner.jpg";
import download1 from "../images/download1.jpg";
import download2 from "../images/download2.jpg";
import download3 from "../images/download3.jpg";
import download4 from "../images/download4.jpg";
import download5 from "../images/download5.jpg";
import download6 from "../images/download6.jpg";
import download7 from "../images/download7.jpg";
import download8 from "../images/download8.jpg";
import pic from "../images/pic.jpg";
import tech_girl from "../images/tech-girl.jpg";

const DUMMY_BLOG_REFERENCE_CARDS = [
  {
    id: 1,
    title: "Intuitive Authoring",
    description: "Create and publish stunning articles with our user-friendly editor. Focus on your content, we'll handle the rest.",
    icon: "📝",
  },
  {
    id: 2,
    title: "Engaging Reader Experience",
    description: "A sleek design ensures your readers enjoy every word, with dark mode and responsive layouts.",
    icon: "👁️",
  },
  {
    id: 3,
    title: "Robust Backend",
    description: "Powered by Django, our backend provides secure authentication, fast data retrieval, and scalable APIs.",
    icon: "⚙️",
  },
  {
    id: 4,
    title: "Modern Frontend",
    description: "Built with React and Tailwind CSS, offering a dynamic and responsive user interface.",
    icon: "🚀",
  },
  {
    id: 5,
    title: "Community Driven",
    description: "Connect with fellow bloggers and readers, share ideas, and grow your network.",
    icon: "🤝",
  },
  {
    id: 6,
    title: "Always Learning",
    description: "Explore new topics and expand your knowledge with our constantly updated content.",
    icon: "💡",
  },
];

const DUMMY_POST_CARDS = [
  {
    id: 1,
    type: "featured-large",
    title: "Edition is a minimal newsletter theme for Ghost. A beautiful way to share stories with your growing audience.",
    image: design_vii, // Using imported image
    emailPlaceholder: "Your email address",
    buttonText: "Subscribe",
  },
  {
    id: 2,
    type: "simple-text",
    title: "See How Five Emerging Photographers Turned 2021 into Art",
    description: "Photographers who are pushing the boundaries of what's possible.",
    linkText: "Read More",
  },
  {
    id: 3,
    type: "image-and-text",
    image: detailBanner, // Using imported image
    tag: "A DOCUMENTARY",
    title: "About the Important Things",
    author: "WILLIAM JAMES",
    date: "2024-07-29",
  },
  {
    id: 4,
    type: "firma",
    logo: "Firma",
    text: "Follow the Firma blog for product announcements, future updates, user stories, and technical posts about our company.",
    buttonText: "Sign up now",
  },
  {
    id: 5,
    type: "journal-quick-overview",
    title: "Start here for a quick overview of everything you need to know",
    content: "We've crammed the most important information to help you get started with Ghost into this one post. It's your cheat-sheet for getting started, and your shortcut to advanced features.",
    sections: [
      { id: 1, title: "Customizing your brand and design settings" },
      { id: 2, title: "The Journal" },
    ],
  },
  {
    id: 6,
    type: "bulletin",
    title: "Stay tuned!",
    content: "We've crammed the most important information to help you get started with Ghost into this one post. It's your cheat-sheet for getting started, and your shortcut to advanced features.",
    emailPlaceholder: "jenn@rocketplc.com",
  },
  {
    id: 7,
    type: "small-image-text",
    image: pic, // Using imported image
    title: "5 ways to repurpose content like a professional creator",
    readTime: "5 min read",
    linkText: "Read More",
  },
  {
    id: 8,
    type: "book-image",
    image: tech_girl, // Using imported image
    title: "Habit Shift: Read More",
    description: "Arcu bibendum at varius vel pharetra vel hacas. Tempor orci eu lobortis elementum nibh tellus.",
    category: "CAREER",
    readTime: "3 min read",
    author: "John Waker",
  },
  {
    id: 9,
    type: "quote",
    text: "I work best when my space is filled with inspiration",
    author: "Margaret Robertson & Sean Hamilton",
  },
  {
    id: 10,
    type: "image-grid",
    images: [
      download5,
      download6,
      download7,
    ],
    text: "I work best when my space is filled with inspiration",
  },
  {
    id: 11,
    type: "episode-card",
    tag: "LATEST EPISODES",
    items: [
      { id: 1, type: "episode", episode: "E12", date: "10 OCT 2019", title: "Scaling Design from Tech Companies" },
      { id: 2, type: "episode", episode: "E11", date: "28 NOV 2018", title: "Organizing Your Content with Ghost" },
      { id: 3, type: "episode", episode: "E10", date: "28 NOV 2018", title: "A Documentary About the Important Things" },
      { id: 4, type: "episode", episode: "E9", date: "28 NOV 2018", title: "A Rich Life With Less Stuff" },
    ],
  },
  {
    id: 12,
    type: "keima-gamer",
    image: download8, // Using imported image
    tag: "Keima",
    quote: "I would say I'm a casual gamer",
    author: "Janet Robertson, Patricia Jenkins, Margaret Robertson",
    date: "2 years ago",
  },
];

const BlogGridSection = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {DUMMY_POST_CARDS.map((card) => (
            <div key={card.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
              {card.type === "featured-large" && (
                <div className="relative h-full">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          placeholder={card.emailPlaceholder}
                          className="p-3 rounded-md border-none focus:outline-none text-gray-900 bg-white bg-opacity-80"
                        />
                        <button className="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 font-semibold">
                          {card.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {card.type === "simple-text" && (
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{card.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{card.description}</p>
                  </div>
                  <a href="#" className="text-indigo-600 hover:underline font-semibold text-lg inline-flex items-center">
                    {card.linkText} <span className="ml-2 text-xl">→</span>
                  </a>
                </div>
              )}

              {card.type === "image-and-text" && (
                <div className="flex flex-col flex-grow">
                  <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold block mb-2">{card.tag}</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2">{card.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{card.author} - {card.date}</p>
                  </div>
                </div>
              )}

              {card.type === "firma" && (
                <div className="p-8 text-center flex flex-col justify-between flex-grow bg-white dark:bg-gray-800">
                  <div>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{card.logo}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">{card.text}</p>
                  </div>
                  <button className="bg-indigo-600 text-white px-8 py-4 rounded-md hover:bg-indigo-700 text-lg font-semibold w-full">
                    {card.buttonText}
                  </button>
                </div>
              )}

              {card.type === "journal-quick-overview" && (
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{card.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{card.content}</p>
                    <ul>
                      {card.sections.map((section) => (
                        <li key={section.id} className="mb-2 text-indigo-600 dark:text-indigo-400 font-medium">
                          {section.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {card.type === "bulletin" && (
                <div className="p-6 bg-blue-600 text-white flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                    <p className="mb-6 text-lg">{card.content}</p>
                  </div>
                  <input
                    type="email"
                    placeholder={card.emailPlaceholder}
                    className="p-3 w-full rounded-md border-none focus:outline-none text-gray-900 bg-white bg-opacity-90"
                  />
                </div>
              )}

              {card.type === "small-image-text" && (
                <div className="flex items-center p-4 flex-grow">
                  <img src={card.image} alt={card.title} className="w-28 h-28 object-cover rounded-md mr-4" />
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{card.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{card.readTime}</p>
                    </div>
                    <a href="#" className="text-indigo-600 hover:underline text-sm font-medium inline-flex items-center">
                      {card.linkText} <span className="ml-1 text-base">→</span>
                    </a>
                  </div>
                </div>
              )}

              {card.type === "book-image" && (
                <div className="p-6 text-center flex flex-col justify-between flex-grow">
                  <img src={card.image} alt={card.title} className="mx-auto h-48 object-contain mb-4" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold block mb-2">{card.category}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-1">{card.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{card.description}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{card.readTime} by {card.author}</p>
                  </div>
                </div>
              )}

              {card.type === "quote" && (
                <div className="p-6 bg-yellow-100 dark:bg-yellow-800 flex flex-col justify-between flex-grow">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">"{card.text}"</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">- {card.author}</p>
                </div>
              )}

              {card.type === "image-grid" && (
                <div className="grid grid-cols-3 gap-1 flex-grow">
                  {card.images.map((img, index) => (
                    <img key={index} src={img} alt="grid item" className="w-full h-32 object-cover" />
                  ))}
                </div>
              )}

              {card.type === "episode-card" && (
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <span className="text-sm text-gray-500 dark:text-gray-400 block mb-4">{card.tag}</span>
                  <div>
                    {card.items.map((item) => (
                      <div key={item.id} className="flex items-start mb-4 last:mb-0">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg mr-2 flex-shrink-0">{item.episode}</span>
                        <div>
                          <p className="text-gray-900 dark:text-white font-semibold leading-tight">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {card.type === "keima-gamer" && (
                <div className="relative flex-grow">
                  <img src={card.image} alt={card.tag} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="text-sm text-gray-300 uppercase block mb-2">{card.tag}</span>
                      <p className="text-2xl font-bold">"{card.quote}"</p>
                      <p className="text-sm text-gray-400 mt-2">{card.author}, {card.date}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ isAuthenticated }) => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
    enabled: isAuthenticated, // Only fetch if authenticated
  });

  const blogs = isAuthenticated ? (data || []) : [];
  const displayedBlogs = blogs.slice(0, 8);

  return (
    <div className="pt-4 pb-8">
      <Header />
      {!isAuthenticated && (
        <aside className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg shadow-xl mb-8 mx-4 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-4xl font-bold mb-4">Unlock a World of Knowledge!</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Dive into captivating articles, insightful tutorials, and thought-provoking discussions.
            Join our community to share your voice, connect with other enthusiasts,
            and stay updated with the latest trends in technology, design, and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-semibold
                         ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
                         disabled:opacity-50 h-12 px-6 py-3 bg-white text-indigo-700 hover:bg-gray-100
                         shadow-lg transform hover:-translate-y-1 active:translate-y-0.5"
            >
              Sign Up Now
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-semibold
                         ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
                         disabled:opacity-50 h-12 px-6 py-3 border-2 border-white text-white hover:bg-white
                         hover:text-indigo-700 shadow-lg transform hover:-translate-y-1 active:translate-y-0.5"
            >
              Login to Explore
            </Link>
          </div>
        </aside>
      )}

      {!isAuthenticated && (
        <section className="flex overflow-x-auto p-4 space-x-6 scrollbar-hide">
          {DUMMY_BLOG_REFERENCE_CARDS.map((card, index) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-shrink-0 w-80 flex flex-col items-center text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              style={{ animation: `continuousScroll 30s linear infinite` }}
            >
              <span className="text-5xl mb-4">{card.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{card.description}</p>
            </div>
          ))}
        </section>
      )}

      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 leading-relaxed max-w-4xl mx-auto flex items-center justify-center">
          <span>
            Devscribe is a powerful app for professional publishers to create, share, and grow a business around their
            content. It comes with modern tools to build a website, publish content, send newsletters & offer
            paid subscriptions to members.
          </span>
        </p>
      </section>

      <BlogGridSection />

      {isAuthenticated && <h2 className="text-3xl dark:text-gray-200 text-gray-800 font-bold mb-6 text-center">Latest Posts</h2>}
      <BlogContainer isPending={isPending && isAuthenticated} blogs={displayedBlogs} />
      {blogs.length > 6 && isAuthenticated && (
        <div className="text-center mt-4">
          <Link
            to="/all-blogs"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Show More ...
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
