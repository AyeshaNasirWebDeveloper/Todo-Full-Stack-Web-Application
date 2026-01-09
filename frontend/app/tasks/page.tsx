"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "../../src/utils/token";
import { TaskPublic } from "../../src/services/taskService";
import { getTasks, createTask, updateTask, deleteTask } from "../../src/services/taskService";

const FlightBookingPage: React.FC = () => {
  const router = useRouter();
  const [flights, setFlights] = useState<TaskPublic[]>([]);
  const [newFlight, setNewFlight] = useState({
    from: "",
    to: "",
    depart: "",
    returnDate: "",
    passengers: "1 Adult, Economy",
  });
  const [editingFlight, setEditingFlight] = useState<TaskPublic | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    fetchFlights();
  }, [router]);

  const fetchFlights = async () => {
    try {
      const fetchedFlights = await getTasks();
      setFlights(fetchedFlights);
    } catch (error) {
      console.error("Failed to fetch flights:", error);
      if ((error as any).message === "Unauthorized") {
        removeToken();
        router.push("/login");
      }
    }
  };

  const handleCreateFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlight.from || !newFlight.to || !newFlight.depart) {
      alert("Please fill From, To, and Depart Date fields!");
      return;
    }
    try {
      await createTask({
        title: `${newFlight.from} → ${newFlight.to}`,
        description: `Depart: ${newFlight.depart} ${
          newFlight.returnDate ? "| Return: " + newFlight.returnDate : ""
        } | Passengers: ${newFlight.passengers}`,
      });
      setNewFlight({
        from: "",
        to: "",
        depart: "",
        returnDate: "",
        passengers: "1 Adult, Economy",
      });
      fetchFlights();
    } catch (error) {
      console.error("Failed to create flight:", error);
      alert("Failed to create flight.");
    }
  };

  const handleUpdateFlight = async (flight: TaskPublic) => {
    try {
      await updateTask(flight.id, {
        title: flight.title,
        description: flight.description,
        completed: flight.completed,
      });
      setEditingFlight(null);
      fetchFlights();
    } catch (error) {
      console.error("Failed to update flight:", error);
      alert("Failed to update flight.");
    }
  };

  const handleDeleteFlight = async (id: number) => {
    if (!confirm("Are you sure you want to delete this flight?")) return;
    try {
      await deleteTask(id);
      fetchFlights();
    } catch (error) {
      console.error("Failed to delete flight:", error);
      alert("Failed to delete flight.");
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 md:mb-0">
            Flight Bookings
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Add Flight Form */}
        <form
          onSubmit={handleCreateFlight}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="From"
            className="p-4 border rounded-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={newFlight.from}
            onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })}
          />
          <input
            type="text"
            placeholder="To"
            className="p-4 border rounded-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={newFlight.to}
            onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })}
          />
          <input
            type="date"
            className="p-4 border rounded-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={newFlight.depart}
            onChange={(e) => setNewFlight({ ...newFlight, depart: e.target.value })}
          />
          <input
            type="date"
            className="p-4 border rounded-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={newFlight.returnDate}
            onChange={(e) => setNewFlight({ ...newFlight, returnDate: e.target.value })}
          />
          <select
            className="p-4 border rounded-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={newFlight.passengers}
            onChange={(e) => setNewFlight({ ...newFlight, passengers: e.target.value })}
          >
            <option>1 Adult, Economy</option>
            <option>2 Adults, Economy</option>
            <option>1 Adult, Business Class</option>
            <option>1 Adult, First Class</option>
          </select>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-2xl font-semibold shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1 col-span-1 md:col-span-1"
          >
            Add Flight
          </button>
        </form>

        {/* Edit Flight Modal */}
        {editingFlight && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">Edit Flight</h3>
              <input
                type="text"
                className="w-full p-3 border rounded-xl mb-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                value={editingFlight.title}
                onChange={(e) =>
                  setEditingFlight({ ...editingFlight, title: e.target.value })
                }
              />
              <textarea
                className="w-full p-3 border rounded-xl mb-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                value={editingFlight.description || ""}
                onChange={(e) =>
                  setEditingFlight({ ...editingFlight, description: e.target.value })
                }
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingFlight(null)}
                  className="px-5 py-2 bg-gray-200 rounded-2xl hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateFlight(editingFlight)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Flight List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="p-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl shadow-md hover:shadow-xl transition flex flex-col justify-between"
            >
              <div className="mb-4">
                <h4 className="text-lg font-bold text-indigo-700">{flight.title}</h4>
                <p className="text-gray-600 mt-1">{flight.description}</p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingFlight(flight)}
                  className="px-4 py-2 bg-yellow-200 rounded-xl hover:bg-yellow-300 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFlight(flight.id)}
                  className="px-4 py-2 bg-red-200 rounded-xl hover:bg-red-300 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightBookingPage;
