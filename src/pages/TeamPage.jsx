import TeamCard from "../components/TeamCard";

const TEAM = [
  {
    name: "Govind Singh",
    role: "Backend Developer & DevOps",
    img: "public/team/govind.jpeg",
    github: "https://github.com/govindchauhan45",  
    linkedin: "https://linkedin.com/in/govindchauhan45",
    skills: ["Python", "React", "Tailwind", "JavaScript", "Node.js"]
  },
  {
    name: "Ayush Kumar Shukla",
    role: "Frontend Developer & Designer",
    img: "public/team/ayush.jpeg",
    github: "https://github.com/ayushshukla",
    linkedin: "https://linkedin.com/in/ayushshukla",
    skills: ["Python", "Django", "MongoDB"]
  },
  {
    name: "Ashutosh Tripathi", 
    role: "UI/UX Designer",
    img: "public/team/ashutosh.jpeg",
    github: "https://github.com/ashutoshtripathi",
    linkedin: "https://linkedin.com/in/ashutoshtripathi",
    skills: ["Figma", "UI Design", "UX"]
  }
];

export default function TeamPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-black">Our Team</h2>
      <p className="text-gray-600 mt-2">Passionate volunteers powering BloodLink.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {TEAM.map(m => <TeamCard key={m.name} member={m} />)}
      </div>
    </main>
  );
}
