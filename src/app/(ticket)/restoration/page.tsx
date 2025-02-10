"use client";
import { createClient } from "@/supabase/client";
import React, { useState } from "react";

interface UserInfo {
  Name: string;
  LastName: string;
  Email: string;
  Ticket: number;
}

interface Ticket {
  from: string;
  to: string;
  date: string;
  price: number;
}

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userTicket, setUserTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string>("");
  const supabase = createClient();

  const handleFetchTicket = async () => {
    if (!email) {
      setError("Emailni kiriting!");
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("TicketUsers")
      .select("*")
      .eq("Email", email)
      .single();

    if (fetchError) {
      setError("Foydalanuvchi topilmadi yoki xatolik yuz berdi!");
      setUserInfo(null);
      setUserTicket(null);
    } else {
      setUserInfo(data);
      const { data: ticketData, error: ticketFetchError } = await supabase
        .from("AvtoTicket")
        .select("*")
        .eq("id", data.Ticket)
        .single();

      if (ticketFetchError) {
        setError("Chipta ma'lumotlarini olishda xatolik yuz berdi.");
        setUserTicket(null);
      } else {
        setUserTicket(ticketData);
        setError("");
      }
    }
  };

  return (
    <div className="home bg-gray-100 min-h-screen pt-32">
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div
            className="text-gray-900 text-3xl font-bold hover:cursor-pointer"
            onClick={() => (location.href = "/home")}
          >
            <span className="text-red-600">Auto</span>Ticket
          </div>

          <button
            onClick={() => (location.href = "/restoration")}
            className="bg-lime-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-lime-700 transition duration-300"
          >
            Chiptani tiklash
          </button>

          <button
            onClick={() => (location.href = "/admin")}
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Admin Page
          </button>
        </div>
      </nav>

      <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Chipta Ma&apos;lumotlarini Tekshirish
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Emailni kiriting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleFetchTicket}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Tekshirish
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        {userInfo && userTicket && (
          <div className="mt-6 p-4 border-t">
            <h3 className="text-xl font-semibold mb-4">
              Foydalanuvchi Ma&apos;lumotlari:
            </h3>
            <p className="text-sm text-gray-700">
              <strong>Ism: </strong>
              {userInfo.Name}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Familiya: </strong>
              {userInfo.LastName}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email: </strong>
              {userInfo.Email}
            </p>

            <div className="mt-6">
              <h4 className="font-bold mb-3">Sotib olingan Chipta:</h4>
              <p className="text-sm text-gray-700">
                <strong>Yo&apos;nalish: </strong>
                {userTicket.from} → {userTicket.to}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Sana: </strong>
                {userTicket.date}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Chipta narxi: </strong>
                {userTicket.price} UZS
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
