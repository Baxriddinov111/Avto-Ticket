"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@/supabase/client";

const AdminPage = () => {
  useEffect(() => {
    fetchTickets();
  }, []);

  const [tickets, setTickets] = useState<any>([]);
  const [from, setFromCity] = useState("");
  const [to, setToCity] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [editingTicket, setEditingTicket] = useState<any>(null);
  const supabase = createClient();

  async function fetchTickets() {
    const { data, error } = await supabase.from("AvtoTicket").select("*");
    if (error) {
      console.error("Error fetching tickets:", error);
    } else {
      setTickets(data);
    }
  }

  const createTicket = async () => {
    if (!from || !to || !price || !count || !time || !date) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    if (from === to) {
      toast.error("Qayerdan va qayerga shaharlar farqli bo'lishi kerak.");
      return;
    }

    if (editingTicket) {
      const { data, error } = await supabase
        .from("AvtoTicket")
        .update({ from, to, price, count, time, date })
        .eq("id", editingTicket.id);

      if (error) {
        console.error("Update error:", error);
      } else {
        setEditingTicket(null);
        fetchTickets();
      }
    } else {
      const { data, error } = await supabase
        .from("AvtoTicket")
        .insert([{ from, to, price, count, time, date }]);

      if (error) {
        console.error("Insert error:", error);
        toast.error("Ticket qo'shishda xatolik yuz berdi! ❌");
      } else {
        toast.success("Ticket muvaffaqiyatli qo'shildi! 🎉");
        fetchTickets();
      }
    }

    setFromCity("");
    setToCity("");
    setPrice("");
    setCount("");
    setTime("");
    setDate("");
  };

  function editTicket(ticket: any) {
    setEditingTicket(ticket);
    setFromCity(ticket.from);
    setToCity(ticket.to);
    setPrice(ticket.price);
    setCount(ticket.count);
    setTime(ticket.time);
    setDate(ticket.date);
  }

  async function deleteTicket(id: number) {
    const { error } = await supabase.from("AvtoTicket").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      fetchTickets();
    }
  }

  return (
    <div>
      <ToastContainer />
      <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-3 shadow-lg fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="text-white text-3xl font-bold hover:cursor-pointer"
            onClick={() => (location.href = "/home")}
          >
            <span className="text-red-600">My</span>Logo
          </div>
          <div>
            <button
              onClick={() => (location.href = "/admin")}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 transition duration-300"
            >
              Admin Page
            </button>
          </div>
        </div>
      </nav>

      <div className="h-screen w-full mt-10 pt-20 p-4 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700">
        <div className="bg-black w-full max-w-lg p-8 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            Admin Panel
          </h1>
          <div className="space-y-6">
            <select
              value={from}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            >
              <option value="" disabled>
                Qayerdan
              </option>
              {[
                "Toshkent",
                "Buxoro",
                "Farg'ona",
                "Xorazm",
                "Surxondaryo",
                "Jizzax",
                "Samarqand",
                "Navoiy",
                "Qashqadaryo",
                "Andijon",
                "Namangan",
                "Qoraqalpog'iston",
              ].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select
              value={to}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            >
              <option value="" disabled>
                Qayerga
              </option>
              {[
                "Toshkent",
                "Buxoro",
                "Farg'ona",
                "Xorazm",
                "Surxondaryo",
                "Jizzax",
                "Samarqand",
                "Navoiy",
                "Qashqadaryo",
                "Andijon",
                "Namangan",
                "Qoraqalpog'iston",
              ].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Puli"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />

            <input
              type="number"
              min={25}
              max={51}
              placeholder="Nechta chipta"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />

            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            >
              <option value="" disabled>
                Vaqt
              </option>
              {["20:00", "21:00", "22:00", "22:30", "23:00", "23:30"].map(
                (t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                )
              )}
            </select>

            <input
              type="date"
              min="2025-03-01"
              max="2025-03-31"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />

            <button
              onClick={createTicket}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 transition"
            >
              Ticket Yaratish
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-[1518.9] mx-auto">
        {tickets.map((ticket: any) => (
          <div
            key={ticket.id}
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-xl p-6 transform transition duration-300 hover:scale-105"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {ticket.from} - {ticket.to}
              </h2>
              <span className="text-lg">
                {ticket.date} <br /> {ticket.time}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg">
                Puli: <span className="font-bold">{ticket.price} so'm</span>
              </p>
              <p className="text-lg">
                Count: <span className="font-bold">{ticket.count}</span>
              </p>
            </div>
            <div className="border-t border-gray-500 pt-4 mt-4">
              <button
                onClick={() => editTicket(ticket)}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTicket(ticket.id)}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded-lg mt-2 hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
