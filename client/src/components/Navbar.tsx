import React from "react";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-purple-600">
            Query AI Chat
          </h1>
          <p className="text-sm text-gray-500">
            Your AI for research, writing, and more
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
