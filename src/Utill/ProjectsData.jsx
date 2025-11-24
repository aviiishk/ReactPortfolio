import {
  DiJava,
  DiMysql,
  DiJavascript1,
  DiCss3,
  DiHtml5,
  DiReact,
  DiBootstrap
} from "react-icons/di";

export const PROJECTS = [
  // ------------------- VEHICO -------------------
  {
    id: 1,
    title: "Vehico",
    subtitle: "Vehicle Rental Platform",

    description:
      "Vehico is a modern vehicle rental system where users can rent vehicles or list their own vehicles for others to rent. It includes secure authentication, user dashboards, and smooth booking flows.",

    features: [
      "Rent or list vehicles with complete details",
      "Secure authentication (JWT)",
      "Booking management dashboard",
      "Vehicle owner & customer roles",
      "Responsive React UI",
    ],

    tags: [
      { name: "React", icon: DiReact },
      { name: "Spring Boot", icon: DiJava },
      { name: "Java", icon: DiJava },
      { name: "MySQL", icon: DiMysql },
      { name: "JavaScript", icon: DiJavascript1 },
      { name: "CSS", icon: DiCss3 },
    ],

    image: "/vehico.png",
    github: "https://github.com/aviiishk/Vehico",
    live: "", // add your live URL here
  },

  // ------------------- PROGRESSO -------------------
  {
    id: 2,
    title: "Progresso",
    subtitle: "AI Fitness App",

    description:
      "Progresso is an AI-powered fitness app that uses pose detection models to analyze workouts, correct form, and track user performance. It includes real-time feedback, posture analysis, and workout statistics.",

    features: [
      "AI Pose Detection (TensorFlow.js)",
      "Real-time workout form correction",
      "Repetition counter with accuracy tracking",
      "Exercise dashboard & history",
      "Modern and responsive UI",
    ],

    tags: [
      { name: "React", icon: DiReact },
      { name: "JavaScript", icon: DiJavascript1 },
      { name: "CSS", icon: DiCss3 },
      { name: "HTML", icon: DiHtml5 },
      { name: "AI / TensorFlow.js", icon: DiJavascript1 },
    ],

    image: "/progresso.png",
    github: "https://github.com/aviiishk/Progresso-Fitness-App",
    live: "", // add your live URL here
  },

  // ------------------- MOVIEVAULT -------------------
  {
    id: 3,
    title: "MovieVault",
    subtitle: "Movie Search & Watchlist App",

    description:
      "MovieVault is a clean and fast movie search application that allows users to browse movies, see details, and maintain a personalized watchlist. Built using React with live data from the TMDB API.",

    features: [
      "Live search using TMDB API",
      "Watchlist add/remove",
      "Movie details page",
      "Persisted watchlist (local storage)",
      "Smooth and modern UI",
    ],

    tags: [
      { name: "React", icon: DiReact },
      { name: "JavaScript", icon: DiJavascript1 },
      { name: "CSS", icon: DiCss3 },
      { name: "HTML", icon: DiHtml5 },
    ],

    image: "/movievault.png",
    github: "https://github.com/aviiishk/MovieValut",
    live: "https://movie-valut.vercel.app/", // add your live URL here
  },
];
