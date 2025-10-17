import React from "react";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm px-6 py-5">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Gemini AI Chat
            </h1>
            <p className="text-sm text-gray-500">Your intelligent assistant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
