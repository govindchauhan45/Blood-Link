import { Github, Linkedin } from "lucide-react";

export default function TeamCard({ member }) {
  return (
    <div className="relative group bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">

      {/* Gradient Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-red-100 via-transparent to-blue-100 blur-xl"></div>

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Profile Image */}
        <div className="relative">
          <img
            src={member.img}
            alt={member.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition"
          />

          {/* Online Indicator */}
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {/* Name */}
        <h2 className="mt-4 text-lg font-black text-gray-900 group-hover:text-red-600 transition">
          {member.name}
        </h2>

        {/* Role */}
        <p className="text-sm text-gray-500 font-medium">
          {member.role}
        </p>

        {/* Divider */}
        <div className="w-10 h-1 bg-red-500 rounded-full my-3 group-hover:w-16 transition-all"></div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mt-2">

          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
          >
            <Github size={16} />
          </a>

          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <Linkedin size={16} />
          </a>

        </div>
      </div>
    </div>
  );
}