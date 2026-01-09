"use client"
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    depart: "",
    returnDate: "",
    passengers: "1 Adult, Economy",
  });

  const sampleFlights = [
    { airline: "Emirates", time: "08:00 - 12:00", price: "$399" },
    { airline: "Qatar Airways", time: "09:30 - 13:30", price: "$420" },
    { airline: "Turkish Airlines", time: "11:00 - 15:00", price: "$380" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    // Validate required fields
    if (!formData.from || !formData.to || !formData.depart) {
      alert("Please fill From, To, and Depart Date fields!");
      return;
    }
    setShowResults(true);
  };
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <header className="w-full backdrop-blur-md bg-white/80 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wide">
            SkyBooker ✈️
          </h1>

          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-700 transition font-medium">
              Login
            </Link>

            <Link href="/signup" className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium shadow-md">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* HERO WITH FULL BANNER */}
      <section
        className="relative h-[90vh] w-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-3xl mx-auto text-center px-6 animate-fadeIn">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-6">
            Fly Beyond Your Expectations
          </h2>

          <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed">
            Discover premium destinations, world-class airlines, and
            effortless booking — all in one place.
          </p>

          <Link
            href="#search"
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition font-semibold"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* ADVANCED FLIGHT SEARCH
      <section id="search" className="relative -mt-20 z-30 mb-20 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-slideUp">

          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Search Flights
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                From
              </label>
              <input
                type="text"
                placeholder="Karachi (KHI)"
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                To
              </label>
              <input
                type="text"
                placeholder="Dubai (DXB)"
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Depart Date
              </label>
              <input
                type="date"
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Return Date
              </label>
              <input
                type="date"
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Passengers
              </label>
              <select className="p-3 border rounded-lg w-full focus:outline-indigo-500">
                <option>1 Adult, Economy</option>
                <option>2 Adults, Economy</option>
                <option>1 Adult, Business Class</option>
                <option>1 Adult, First Class</option>
              </select>
            </div>

            <div className="lg:col-span-4 flex justify-center mt-4">
              <button className="w-full lg:w-auto px-10 py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition font-semibold">
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* ADVANCED FLIGHT SEARCH */}
      <section id="search" className="relative -mt-20 z-30 mb-20 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-slideUp">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Search Flights
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">From</label>
              <input
                type="text"
                name="from"
                placeholder="Karachi (KHI)"
                value={formData.from}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">To</label>
              <input
                type="text"
                name="to"
                placeholder="Dubai (DXB)"
                value={formData.to}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Depart Date</label>
              <input
                type="date"
                name="depart"
                value={formData.depart}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Passengers</label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full focus:outline-indigo-500"
              >
                <option>1 Adult, Economy</option>
                <option>2 Adults, Economy</option>
                <option>1 Adult, Business Class</option>
                <option>1 Adult, First Class</option>
              </select>
            </div>

            <div className="lg:col-span-4 flex justify-center mt-4">
              <button
                onClick={handleSearch}
                className="w-full lg:w-auto px-10 py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition font-semibold"
              >
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FLIGHT RESULTS MODAL */}
      {showResults && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 animate-slideUp relative">
            <button
              onClick={() => setShowResults(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Flight Results</h3>
            <p className="text-gray-700 mb-6">
              Showing flights from <strong>{formData.from}</strong> to <strong>{formData.to}</strong> departing on <strong>{formData.depart}</strong>
            </p>

            <div className="space-y-4">
              {sampleFlights.map((flight, i) => (
                <div key={i} className="p-4 border rounded-lg hover:shadow-lg transition flex justify-between items-center">
                  <div>
                    <p className="font-bold text-indigo-700">{flight.airline}</p>
                    <p className="text-gray-600">{flight.time}</p>
                  </div>
                  <p className="text-xl font-extrabold">{flight.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TRENDING DESTINATIONS */}
      <section className="px-6 py-20 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-12">Trending Destinations</h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {[
            { name: "Dubai", img: "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/shutterstock_2414539851_ss_non-editorial_dcx0bm?_a=BAVAZGGf0" },
            { name: "Istanbul", img: "https://media.istockphoto.com/id/1499025854/photo/touristic-sightseeing-ships-in-istanbul-city-turkey.jpg?s=612x612&w=0&k=20&c=K43B2lq3aH_G1uzE8z48Oz0HDokFhCV1rbwzZh3iP_k=" },
            { name: "London", img: "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?cs=srgb&dl=pexels-chaitaastic-1796715.jpg&fm=jpg" },
            { name: "Singapore", img: "https://img.freepik.com/free-photo/cityscape-singapore-city-skyline_74190-6349.jpg?semt=ais_hybrid&w=740&q=80" },
            { name: "New York", img: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg" },
            { name: "Tokyo", img: "https://img.freepik.com/premium-photo/tokyo-skyline-with-tokyo-tower-twilight-japan_255553-1294.jpg" },
          ].map((d, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <img src={d.img} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h4 className="text-xl font-bold text-gray-900">{d.name}</h4>
                <p className="text-gray-600 mt-2">
                  Book affordable flights to {d.name}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIAL OFFERS SECTION */}
      <section className="px-6 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">
          🔥 Special Flight Deals
        </h3>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          {[
            { offer: "20% OFF Dubai Return", price: "$399" },
            { offer: "15% OFF London Direct", price: "$550" },
            { offer: "25% OFF Istanbul Trip", price: "$320" },
          ].map((deal, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl bg-indigo-50 hover:bg-indigo-100 transition shadow-md"
            >
              <h4 className="text-xl font-bold text-indigo-700">{deal.offer}</h4>
              <p className="text-gray-700 mt-2">Starting at</p>
              <p className="text-3xl font-extrabold text-indigo-800 mt-2">
                {deal.price}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">

          {[
            { step: "1. Search", desc: "Enter your travel details & browse flights." },
            { step: "2. Compare", desc: "Pick your ideal flight from best options." },
            { step: "3. Book", desc: "Complete secure payment and fly!" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition"
            >
              <h4 className="text-xl font-bold text-indigo-700">{item.step}</h4>
              <p className="text-gray-700 mt-3">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">
          What Our Travelers Say ❤️
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {[
            { name: "Ayesha", feedback: "Best flight booking experience!" },
            { name: "Hassan", feedback: "Clean UI and great prices." },
            { name: "Fatima", feedback: "I found flights within seconds!" },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <p className="text-gray-700 italic">“{t.feedback}”</p>
              <h4 className="text-lg font-semibold mt-4 text-indigo-700">
                — {t.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-indigo-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div>
            <h4 className="font-bold text-xl mb-4">SkyBooker</h4>
            <p className="text-gray-200">
              Your trusted partner for affordable and premium flight bookings.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-200">
              <li>About Us</li>
              <li>Support</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-4">Contact</h4>
            <p className="text-gray-200">info@skybooker.com</p>
            <p className="text-gray-200">+92 300 1234567</p>
          </div>

        </div>

        <p className="text-center text-gray-200 mt-10">
          © 2026 SkyBooker — All Rights Reserved.
        </p>
      </footer>

      {/* ANIMATIONS */}
      <style>
        {`
          .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-slideUp { animation: slideUp 1.2s ease-in-out; }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </main>
  );
}
