export type Project = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  detail: string;
  techStack: string[];
  highlights: string[];
  banner: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
};

export const projects: Project[] = [
  {
    id: "lastepisode",
    title: "LastEpisode",
    tag: "2025",
    desc: "Anime discovery & synchronized co-watching",
    detail:
      "LastEpisode is a full-stack anime discovery and co-watching web app that pairs a polished React/Vite front end with an Express/Socket.io back end. It delivers synchronized watch parties, real-time chat, and host handoff — plus search, detailed title pages, personal watchlists, and notification-enabled user rooms.",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "Express", "Socket.io", "MongoDB", "JWT"],
    highlights: [
      "Real-time synchronized watch parties with Socket.io",
      "Live in-room chat with persistent message history",
      "Host handoff — seamlessly pass control to another viewer",
      "Anime search & detailed title pages powered by external APIs",
      "Personal watchlists with status tracking",
      "Notification-enabled user rooms",
      "JWT-secured REST APIs",
      "Deployed to Render with MongoDB Atlas",
    ],
    banner: "/lastepisode_banner.png",
    gallery: ["/lastepisode_banner.png", "/anime1.png", "/anime2.png"],
    liveUrl: "https://the-last-episode.onrender.com/",
    githubUrl: "https://github.com/nobodyknows-abhishek/Last-Episode",
    isFeatured: true,
  },
  {
    id: "chat-video-app",
    title: "Chat & Video App",
    tag: "2025",
    desc: "Real-time messaging & group video calls",
    detail:
      "A full-stack MERN application supporting real-time messaging and one-on-one/group video calls. Built with a focus on clean architecture and scalability.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Stream API", "JWT", "MVC"],
    highlights: [
      "Real-time one-on-one and group messaging",
      "Video calls with screen sharing and recording via Stream API",
      "JWT-based authentication with secure sessions",
      "MVC backend architecture for scalability",
      "Modular controllers and routes for easy feature expansion",
    ],
    banner: "/chat_app_banner.png",
    gallery: ["/chat_app_banner.png", "/chat1.png", "/chat2.png"],
    liveUrl: "https://yokaichat.onrender.com",
    githubUrl: "https://github.com/nobodyknows-abhishek/Yokai-Chat",
    isFeatured: false,
  },
  {
    id: "ecommerce",
    title: "E-Commerce Site",
    tag: "2024",
    desc: "Full-stack shopping platform",
    detail:
      "A complete e-commerce application built with the MERN stack. Covers the full shopping journey from product discovery to order completion, with an integrated payment workflow.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    highlights: [
      "User authentication and session management",
      "Product listing with filtering and search",
      "Shopping cart and order flow",
      "Basic payment workflow integration",
      "Modular REST API with scalable component architecture",
    ],
    banner: "/ecommerce_banner.png",
    gallery: ["/ecommerce_banner.png", "/ecom1.png", "/ecom2.png"],
    liveUrl: "https://chopper-town.onrender.com/",
    githubUrl: "https://github.com/nbdyknws-abhi/E-shop",
    isFeatured: false,
  },
  {
    id: "image-gallery",
    title: "Image Gallery",
    tag: "2024",
    desc: "AI image generation & gallery platform",
    detail:
      "A React + Vite starter tailored for image-generation products that pairs a Tailwind/Lucide/Framer Motion UI with Appwrite-ready auth, profile, upload, and gallery routes out of the box. Drop in your Appwrite keys, run npm run dev, and immediately get a polished, router-driven experience for browsing and uploading AI image prompts.",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Lucide", "Appwrite", "React Router"],
    highlights: [
      "Appwrite-ready authentication and user profile management",
      "AI image prompt upload and management",
      "Full gallery route for browsing generated images",
      "Polished router-driven SPA experience",
      "Tailwind + Framer Motion animations throughout",
      "Modular architecture — plug in your Appwrite keys and go",
    ],
    banner: "/image_gallery_banner.png",
    gallery: ["/image_gallery_banner.png", "/gallery1.png", "/gallery2.png"],
    liveUrl: "https://imagegenprompt.onrender.com/",
    githubUrl: "https://github.com/nbdyknws-abhi/PromptsFor_ImageGen",
    isFeatured: false,
  },
  {
    id: "anime-nexus",
    title: "Anime Nexus",
    tag: "2024",
    desc: "Flask-based anime recommendation engine",
    detail:
      "Anime Nexus is a Flask-based anime recommendation app that matches users' favourite titles to similar series via the Jikan (Unofficial MyAnimeList) API, scoring overlaps in official genre IDs to surface high-quality picks. It couples a clean Tailwind/Jinja2 front end with robust API handling, rate-limit friendly requests, and dynamic detail pages — showcasing full-stack Python expertise with a production-ready demo deployed on Render.",
    techStack: ["Python", "Flask", "Jinja2", "Tailwind CSS", "Jikan API", "MyAnimeList"],
    highlights: [
      "Genre-overlap scoring algorithm to surface high-quality recommendations",
      "Jikan (Unofficial MyAnimeList) API integration with rate-limit friendly requests",
      "Dynamic anime detail pages rendered with Jinja2 templates",
      "Clean Tailwind CSS front end served by Flask",
      "Full-stack Python showcase — no JavaScript framework required",
      "Deployed to Render with production-ready configuration",
    ],
    banner: "/anime_recommender_banner.png",
    gallery: ["/anime_recommender_banner.png", "/nexus1.png", "/nexus2.png"],
    liveUrl: "https://anime-recommender-app.onrender.com",
    githubUrl: "https://github.com/nobodyknows-abhishek/Anime_Recommender",
    isFeatured: false,
  },
];
