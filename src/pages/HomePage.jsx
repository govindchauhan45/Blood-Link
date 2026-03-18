import HeroSection from "../components/HeroSection";
import { MOCK_DONORS } from "../data/mockDonors";

export default function HomePage() {
  const total = MOCK_DONORS.length;
  const active = MOCK_DONORS.filter(d=>d.available).length;
  const cities = new Set(MOCK_DONORS.map(d=>d.city)).size;
  const lives = total * 3;

  return (
    <main>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 glass rounded-2xl shadow-sm fade-in">
            <div className="text-sm font-black text-red-600">Total Donors</div>
            <div className="text-3xl font-bold">{total}</div>
            <div className="text-xs text-muted mt-1">Verified volunteers</div>
          </div>
          <div className="p-6 glass rounded-2xl shadow-sm fade-in">
            <div className="text-sm font-black text-emerald-600">Active Donors</div>
            <div className="text-3xl font-bold">{active}</div>
            <div className="text-xs text-muted mt-1">Ready to donate now</div>
          </div>
          <div className="p-6 glass rounded-2xl shadow-sm fade-in">
            <div className="text-sm font-black text-gray-700">Cities</div>
            <div className="text-3xl font-bold">{cities}</div>
            <div className="text-xs text-muted mt-1">Across regions</div>
          </div>
        </div>

        <div className="mt-8 p-6 glass rounded-2xl shadow-sm fade-in">
          <h3 className="font-black text-lg">Impact</h3>
          <p className="mt-2 text-muted">Estimated lives saved: <span className="font-bold text-rose-600">{lives}+</span></p>
        </div>
      </section>
    </main>
  );
}
