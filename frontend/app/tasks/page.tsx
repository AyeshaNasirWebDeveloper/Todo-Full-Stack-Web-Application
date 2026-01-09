"use client";
import React, { useState } from "react";

type Flight = {
  id: number;
  airline: string;
  time: string;
  price: string;
  selected: boolean;
};

export default function FlightBookingPage() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    depart: "",
    returnDate: "",
    passengers: "1 Adult, Economy",
  });

  const [flights, setFlights] = useState<Flight[]>([]);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [showResults, setShowResults] = useState(false);

  const sampleFlights: Flight[] = [
    { id: 1, airline: "Emirates", time: "08:00 - 12:00", price: "$399", selected: false },
    { id: 2, airline: "Qatar Airways", time: "09:30 - 13:30", price: "$420", selected: false },
    { id: 3, airline: "Turkish Airlines", time: "11:00 - 15:00", price: "$380", selected: false },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.depart) {
      alert("Please fill From, To, and Depart Date fields!");
      return;
    }
    // Load sample flights (you can replace with API later)
    setFlights(sampleFlights);
    setShowResults(true);
  };

  const handleToggleSelect = (id: number) => {
    setFlights((prev) =>
      prev.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f))
    );
  };

  const handleDeleteFlight = (id: number) => {
    if (!confirm("Remove this flight?")) return;
    setFlights((prev) => prev.filter((f) => f.id !== id));
  };

  const handleEditFlight = (flight: Flight) => {
    setEditingFlight(flight);
  };

  const handleUpdateFlight = (updatedFlight: Flight) => {
    setFlights((prev) => prev.map((f) => (f.id === updatedFlight.id ? updatedFlight : f)));
    setEditingFlight(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Search Form */}
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-6">Search Flights</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="from"
            placeholder="From"
            className="p-3 border rounded-lg"
            value={formData.from}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            className="p-3 border rounded-lg"
            value={formData.to}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="depart"
            className="p-3 border rounded-lg"
            value={formData.depart}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="returnDate"
            className="p-3 border rounded-lg"
            value={formData.returnDate}
            onChange={handleInputChange}
          />
          <select
            name="passengers"
            className="p-3 border rounded-lg md:col-span-2"
            value={formData.passengers}
            onChange={handleInputChange}
          >
            <option>1 Adult, Economy</option>
            <option>2 Adults, Economy</option>
            <option>1 Adult, Business Class</option>
            <option>1 Adult, First Class</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Search Flights
        </button>
      </div>

      {/* Flights Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative">
            <button
              onClick={() => setShowResults(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Flight Results</h3>
            <div className="space-y-4">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="p-4 border rounded-lg flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <p className="font-bold text-indigo-700">{flight.airline}</p>
                    <p className="text-gray-600">{flight.time}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="text-xl font-extrabold">{flight.price}</p>
                    <input
                      type="checkbox"
                      checked={flight.selected}
                      onChange={() => handleToggleSelect(flight.id)}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <button
                      onClick={() => handleEditFlight(flight)}
                      className="text-sm px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFlight(flight.id)}
                      className="text-sm px-2 py-1 bg-red-200 rounded hover:bg-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Flight Modal */}
      {editingFlight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setEditingFlight(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Edit Flight</h3>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md mb-3"
              value={editingFlight.airline}
              onChange={(e) => setEditingFlight({ ...editingFlight, airline: e.target.value })}
            />
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md mb-3"
              value={editingFlight.time}
              onChange={(e) => setEditingFlight({ ...editingFlight, time: e.target.value })}
            />
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md mb-3"
              value={editingFlight.price}
              onChange={(e) => setEditingFlight({ ...editingFlight, price: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingFlight(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateFlight(editingFlight)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
