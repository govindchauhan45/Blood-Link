export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-red-800 to-rose-700 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-black text-lg">BloodLink</h4>
          <p className="text-sm text-red-200">Connecting donors with those in need · Every drop counts</p>
        </div>
        <div>
          <h5 className="font-bold">Quick Links</h5>
          <ul className="mt-2 text-sm text-red-200 space-y-1">
            <li className="hover:underline">Home</li>
            <li className="hover:underline">Find Donor</li>
            <li className="hover:underline">Register</li>
            <li className="hover:underline">Team</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Contact</h5>
          <p className="text-sm text-red-200 mt-2">hello@bloodlink.example · +91 90000 00000</p>
          <div className="flex items-center gap-3 mt-3">
            <a className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">GH</a>
            <a className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">LI</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 text-sm text-red-200 mt-6 text-center">© {new Date().getFullYear()} BloodLink — Built with ❤️</div>
    </footer>
  );
}
