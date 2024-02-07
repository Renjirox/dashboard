"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import NumberWidget from "@/components/numberWidget";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WidgetProps {
  title: string;
  url: string;
  color: "emerald" | "indigo" | "amber" | "sky" | "rose" | "fuchsia";
}

interface GraphData {
  date: string;
  number: number;
}

export default function Home() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [user, setUser] = useState<string>("User Name");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const magnifyingGlassRef = useRef<HTMLButtonElement>(null);

  // Fetching data for graph
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/graph-data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: GraphData[] = await response.json();
        setGraphData(data);
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      }
    }

    fetchData();
  }, []);

  // Function to format the date
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Debouncing (delaying) updates
  function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearchInput = useDebounce(searchInput, 300);

  // Function for filtering the widgets
  const shouldShowWidget = (widgetTitle: string): boolean => {
    if (!debouncedSearchInput.trim()) return true;

    const keywords = debouncedSearchInput
      .split(",")
      .map((keyword) => keyword.trim().toLowerCase())
      .filter((keyword) => keyword);

    return keywords.some((keyword) =>
      widgetTitle.toLowerCase().includes(keyword)
    );
  };

  // Focusing the search input field when opening it
  useEffect(() => {
    if (showSearch === true) {
      searchInputRef.current?.focus();
    }
  }, [showSearch]);

  const cards = [
    { title: "Visitors", color: "emerald", url: "/api/random-number" },
    { title: "Customers", color: "indigo", url: "/api/random-number" },
    { title: "Issues", color: "rose", url: "/api/random-number" },
    { title: "Reports", color: "amber", url: "/api/random-number" },
    { title: "Growth", color: "sky", url: "/api/random-number" },
    { title: "Revenue", color: "fuchsia", url: "/api/random-number" },
  ];

  return (
    <main className="m-12 grid grid-cols-12 gap-4 text-gray-800">
      {/* Top bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-3 col-span-12">
        <div className="flex gap-4 justify-start capitalize">
          {formatDate(currentDateTime)}
          <div className="w-[2px] border border-gray-400" />
        </div>
        <div className="flex justify-center">
          Welcome back&nbsp;<span className="font-bold">{user}</span>!
        </div>
        {/* Search input field */}
        <div className="flex justify-end gap-4">
          <input
            ref={searchInputRef}
            type="text"
            value={searchInput}
            onBlur={(event) => {
              if (event.relatedTarget !== magnifyingGlassRef.current) {
                setShowSearch(false);
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            disabled={!showSearch}
            placeholder="Visitors, Customers ..."
            className={`border border-gray-400 rounded-xl transition-all ${
              showSearch ? "w-64 px-2" : "w-0 p-0"
            }`}
          />
          <button
            ref={magnifyingGlassRef}
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          >
            <MagnifyingGlassIcon className="w-6" />
          </button>
        </div>
      </div>
      {/* Card widgets mapping */}
      {cards.map((card, index) => (
        <NumberWidget
          key={index}
          title={card.title}
          url={card.url}
          color={card.color as WidgetProps["color"]}
          className={`col-span-4 xl:col-span-2 ${
            shouldShowWidget(card.title) ? "" : "hidden"
          }`}
        />
      ))}
      {/* Graph widget - two different renders for different screen sizes */}
      <div
        className={`col-span-12 bg-gradient-to-br from-slate-500/25 via-slate-500/50 to-slate-500/25 shadow-slate-500/25 shadow-md rounded-xl p-4 flex flex-col items-center space-y-8 text-gray-800 ${
          shouldShowWidget("Orders") ? "" : "hidden"
        }`}
      >
        <span className="text-3xl font-light">Orders</span>
        <ResponsiveContainer
          width="100%"
          height={400}
          className="flex 2xl:hidden"
        >
          <LineChart
            data={graphData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" tick={{ fill: "#1f2937" }} />
            <YAxis tick={{ fill: "#1f2937" }} />
            <Tooltip wrapperClassName="text-gray-800" />
            <Line
              type="monotone"
              dataKey="number"
              stroke="#64748b"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer
          width="100%"
          height={600}
          className="hidden 2xl:flex"
        >
          <LineChart
            data={graphData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" tick={{ fill: "#1f2937" }} />
            <YAxis tick={{ fill: "#1f2937" }} />
            <Tooltip wrapperClassName="text-gray-800" />
            <Line
              type="monotone"
              dataKey="number"
              stroke="#64748b"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
