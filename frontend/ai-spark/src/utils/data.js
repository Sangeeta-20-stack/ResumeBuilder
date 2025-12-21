import TEMPLATE_ONE_IMG from '../assets/template-one.jpg';
import TEMPLATE_TWO_IMG from '../assets/template-two.jpg';
import TEMPLATE_THREE_IMG from '../assets/template-three.jpg';

export const ResumeTemplates = [
  {
    id: '01',
    thumbnailImg: TEMPLATE_ONE_IMG,
    colorPaletteCode: 'themeOne',
  },
  {
    id: '02',
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: 'themeTwo',
  },
  {
    id: '03',
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: 'themeThree',
  },
];

export const themeColorPalette = {
  themeOne: [
    ['#EBFDFF', '#A1F4FD', '#CEFAFE', '#00B8DB', '#4A5565'],
    ['#E9FBF8', '#B4EFE7', '#93E2DA', '#2AC9A0', '#3D4C5A'],
    ['#F5F4FF', '#E0DBFF', '#C9C2F8', '#8579D1', '#4B4B5C'],
    ['#F0FAFF', '#D6F0FF', '#AFDEFF', '#3399FF', '#445361'],
    ['#FFF5F7', '#FFE0EC', '#FAC6D4', '#F6729C', '#5A5A5A'],
    ['#F9FAFB', '#E4E7EB', '#CBD5E0', '#7F9CF5', '#2D3748'],
    ['#F4FFFD', '#D3FDF2', '#B0E9D4', '#34C79D', '#384C48'],
    ['#FFF7F0', '#FFE6D9', '#FFD2BA', '#FF9561', '#4C4743'],
    ['#F9FCFF', '#E3F0F9', '#C0DDEE', '#6CA6CF', '#46545E'],
    ['#FFFDF6', '#FFF4D7', '#FFE7A0', '#FFD000', '#57534E'],
    ['#EFFCFF', '#C8F0FF', '#99E0FF', '#007BA7', '#2B3A42'],
    ['#F7F7F7', '#E4E4E4', '#CFCFCF', '#4A4A4A', '#222222'],
    ['#E3F2FD', '#90CAF9', '#A8D2F4', '#1E88E8', '#0D47A1'],
  ],
  themeTwo: [
    ['#FFF0F5', '#FFB6C1', '#FF69B4', '#DB7093', '#800080'],
  ],
  themeThree: [
    ['#E0FFFF', '#AFEEEE', '#40E0D0', '#20B2AA', '#008080'],
  ],
};

export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    previewUrl: "",
    fullName: "John Doe",
    designation: "Senior Software Engineer",
    summary:
      "Passionate and results-driven developer with 6+ years of experience building fullstack websites.",
  },
  ContactInfo: {
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: '#12 Anywhere, Any City, Any Country',
    linkedin: "https://linkedin.com/john",
    github: "https://github.com/john",
    website: "https://johndoe.com",
  },
  WorkExperience: [
    {
      company: "Tech Solutions",
      role: "Senior Frontend Engineer",
      startDate: "2022-03",
      endDate: "2025-02",
      description:
        "Leading the frontend team to build scalable enterprise applications using ReactJS.",
    },
    {
      company: "Coding Dev",
      role: "Full Stack Developer",
      startDate: "2020-01",
      endDate: "2022-02",
      description:
        "Responsible for designing, developing, and maintaining both frontend and backend of web applications, ensuring seamless integration, performance, and scalability.",
    },
    {
      company: "Web Innovators",
      role: "Junior Web Developer",
      startDate: "2018-06",
      endDate: "2019-12",
      description:
        "Assisted in developing and maintaining responsive web applications using HTML, CSS, and JavaScript, while collaborating with senior developers.",
    },
  ],
  education: [
    {
      degree: "M.Sc. Software Engineering",
      institution: "Tech University",
      startDate: "2021-08",
      endDate: "2023-06",
    },
    {
      degree: "B.Sc. Computer Science",
      institution: "National College",
      startDate: "2017-08",
      endDate: "2020-06",
    },
    {
      degree: "High School Diploma",
      institution: "Central High School",
      startDate: "2015-06",
      endDate: "2017-05",
    },
  ],
  skills: [
    { name: "JavaScript", progress: 95 },
    { name: "React", progress: 90 },
    { name: "Node.js", progress: 85 },
    { name: "TypeScript", progress: 80 },
    { name: "MongoDB", progress: 75 },
  ],
  projects: [
    {
      title: "Project Manager App",
      description: "A task and team management app built with MERN stack.",
      github: "https://ecommerce-demo/github.john.com",
      liveDemo: "https://ecommerce-demo.john.com",
    },
    {
      title: "Weather Dashboard",
      description:
        "A real-time weather forecasting app built with React and OpenWeather API.",
      github: "https://github.com/john/weather-dashboard",
      liveDemo: "https://weather-demo.john.com",
    },
    {
      title: "E-Commerce Store",
      description:
        "A full-stack e-commerce platform using MERN stack with payment integration.",
      github: "https://github.com/john/ecommerce-store",
      liveDemo: "https://store-demo.john.com",
    },
    {
      title: "Blog Platform",
      description:
        "A blogging platform with user authentication and CRUD functionality built with Node.js and MongoDB.",
      github: "https://github.com/john/blog-platform",
      liveDemo: "https://blog-demo.john.com",
    },
    {
      title: "Fitness Tracker",
      description:
        "A fitness tracking app to log workouts and track progress, built with React and Express.",
      github: "https://github.com/john/fitness-tracker",
      liveDemo: "https://fitness-demo.john.com",
    },
  ],
  certifications: [
    { title: "Full Stack Web Developer", issuer: "Udemy", year: "2023" },
    { title: "React Developer Certification", issuer: "Coursera", year: "2022" },
    { title: "Node.js and Express Masterclass", issuer: "edX", year: "2021" },
  ],
  languages: [
    { name: "English", progress: 100 },
    { name: "French", progress: 95 },
    { name: "Spanish", progress: 70 },
  ],
  interests: ["Reading", "Open Source Contribution", "Hiking"],
};
