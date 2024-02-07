import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

interface WidgetData {
  date: string;
  number: number;
}

interface WidgetProps {
  title: string;
  url: string;
  color: "emerald" | "indigo" | "amber" | "sky" | "rose" | "fuchsia";
  className?: string;
}

const colorClasses = {
  emerald:
    "bg-gradient-to-br from-emerald-500/25 via-emerald-500/50 to-emerald-500/25 shadow-emerald-500/25",
  indigo:
    "bg-gradient-to-br from-indigo-500/25 via-indigo-500/50 to-indigo-500/25 shadow-indigo-500/25",
  amber:
    "bg-gradient-to-br from-amber-500/25 via-amber-500/50 to-amber-500/25 shadow-amber-500/25",
  sky: "bg-gradient-to-br from-sky-500/25 via-sky-500/50 to-sky-500/25 shadow-sky-500/25",
  rose: "bg-gradient-to-br from-rose-500/25 via-rose-500/50 to-rose-500/25 shadow-rose-500/25",
  fuchsia:
    "bg-gradient-to-br from-fuchsia-500/25 via-fuchsia-500/50 to-fuchsia-500/25 shadow-fuchsia-500/25",
};

export default function NumberWidget({ title, url, color, className }: WidgetProps) {
  const [numberData, setNumberData] = useState<WidgetData[]>([]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [hideWidget, setHideWidget] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: WidgetData[] = await response.json();
        setNumberData(data);
      } catch (error) {
        console.error("Failed to fetch visitor data:", error);
      }
    }

    fetchData();
  }, []);

  function calculateGrowth(oldValue: number, newValue: number): string {
    if (oldValue === 0) {
      return "0%";
    }
    const growth = ((newValue - oldValue) / oldValue) * 100;
    return `${growth > 0 ? "+" : ""}${growth.toFixed(2)}%`;
  }

  function formatNumberWithSpace(number: number): string {
    const formatter = new Intl.NumberFormat("en-EN", {
      style: "decimal",
      useGrouping: true,
    });

    return formatter.format(number);
  }

  if (hideWidget) {
    return null;
  }

  return (
    <div
      className={`w-full flex flex-col space-y-8 ${colorClasses[color]} p-4 rounded-xl shadow-md text-gray-800 ${className}`}
    >
      <div className="flex justify-between items-end">
        <span className="text-3xl font-light">{title}</span>
        <div className="relative">
          <button
            onClick={() => {
              setShowTooltip(!showTooltip);
            }}
          >
            <EllipsisVerticalIcon className="w-6 h-6 hover:scale-125 transition-all" />
          </button>
          {showTooltip && (
            <div className="absolute top-6 left-4 bg-white rounded-b-xl rounded-r-xl min-w-48 shadow-md flex flex-col items-start p-4">
              <button className="hover:bg-indigo-200 hover:text-indigo-500 w-full text-start p-2 rounded-xl">
                More Details
              </button>
              <button className="hover:bg-indigo-200 hover:text-indigo-500 w-full text-start p-2 rounded-xl">
                Open In New Tab
              </button>
              <button
                className="hover:bg-indigo-200 hover:text-indigo-500 w-full text-start p-2 rounded-xl"
                onClick={() => {
                  setHideWidget(true);
                }}
              >
                Hide Widget
              </button>
              <button
                className="hover:bg-red-200 hover:text-red-500 w-full text-start p-2 rounded-xl"
                onClick={() => {
                  setShowTooltip(false);
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <span className="text-4xl">
          {numberData[1] !== undefined
            ? formatNumberWithSpace(numberData[1].number)
            : "..."}
        </span>
        <div>
          <span
            className={`rounded-xl ${colorClasses[color]} text-gray-100 p-2`}
          >
            {numberData.length > 1
              ? calculateGrowth(numberData[0].number, numberData[1].number)
              : "0%"}
          </span>
        </div>
      </div>
    </div>
  );
}
