"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function Middle() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const searchValue = search.trim();

    if (!searchValue) {
      return;
    }

    console.log("Searching:", searchValue);
    alert(`Searching for: ${searchValue}`);

    // Search শেষ হলে input খালি হবে
    setSearch("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex  items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 shadow-sm transition focus-within:border-green-500 focus-within:bg-white focus-within:shadow-md">
      
      {/* Search Icon */}
      <Search className="h-5 w-5 shrink-0 text-gray-500" />

      {/* Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />

      {/* Filter Button */}
      <button
        type="button"
        aria-label="Filter"
        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
      >
        <SlidersHorizontal className="h-5 w-5" />
      </button>

      {/* Search Button */}
      <button
        type="button"
        onClick={handleSearch}
        className="rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
}