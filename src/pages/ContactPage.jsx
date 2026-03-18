export default function ContactPage(){
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-black">Contact Us</h2>
      <p className="text-gray-600 mt-2">Reach out for collaborations, support or media.</p>

      <form className="mt-6 bg-white p-6 rounded-2xl shadow">
        <label className="block text-sm font-bold text-gray-600">Name</label>
        <input className="w-full mt-2 p-3 border rounded-lg" />

        <label className="block text-sm font-bold text-gray-600 mt-4">Email</label>
        <input className="w-full mt-2 p-3 border rounded-lg" />

        <label className="block text-sm font-bold text-gray-600 mt-4">Message</label>
        <textarea className="w-full mt-2 p-3 border rounded-lg" rows={6} />

        <button className="mt-4 px-5 py-3 bg-red-600 text-white rounded-lg font-bold">Send</button>
      </form>
    </main>
  );
}
