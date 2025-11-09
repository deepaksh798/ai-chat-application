"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Info, X } from "lucide-react";

export default function PopupInfo() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = Cookies.get("hasSeenPopup");

    if (!hasSeenPopup) {
      setShowPopup(true);
    }
  }, []);

  const handleOk = () => {
    Cookies.set("hasSeenPopup", "true");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={handleOk}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 rounded-full p-2">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Quick Heads-Up
          </h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          The backend server runs on a{" "}
          <span className="font-semibold text-blue-600">
            free Cloudflare service
          </span>
          . It may take a moment to wake up on{" "}
          <span className="font-semibold text-gray-900">
            first use or login
          </span>
          . If your first request is slow or failed,{" "}
          <span className="font-semibold text-gray-900">
            wait a few seconds and try again
          </span>
          .
        </p>

        <button
          onClick={handleOk}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
