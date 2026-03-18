import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="min-h-[60vh] flex items-center bg-soft-rose">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Save Lives with BloodLink</h1>
          <p className="mt-4 text-muted max-w-xl">Find local donors, register to help, or locate nearby blood banks — fast and reliable.</p>

          <div className="mt-6 flex gap-3">
            <Link to="/donors" className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold shadow-lg transform transition hover:scale-[1.02]">Find Donor</Link>
            <Link to="/register" className="px-5 py-3 rounded-xl border border-red-200 text-red-700 font-bold bg-white/70 btn-glass">Become Donor</Link>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 glass rounded-xl card-hover">
              <div className="text-sm font-black text-red-700">Total Donors</div>
              <div className="text-xl font-bold">10</div>
            </div>
            <div className="p-4 glass rounded-xl card-hover">
              <div className="text-sm font-black text-emerald-700">Active Donors</div>
              <div className="text-xl font-bold">6</div>
            </div>
            <div className="p-4 glass rounded-xl card-hover">
              <div className="text-sm font-black text-gray-700">Cities</div>
              <div className="text-xl font-bold">6</div>
            </div>
            <div className="p-4 glass rounded-xl card-hover">
              <div className="text-sm font-black text-rose-600">Lives Saved</div>
              <div className="text-xl font-bold">30+</div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-3xl glass shadow-2xl">
            <img src="public/team/hero.png" alt="Blood Donation" className="w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
