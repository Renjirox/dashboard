"use client";

import { DocumentPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type TableData = {
  id: number;
  title: string;
  category: string;
  date: string;
  owner: string;
  isVisible?: boolean;
};

export default function Reports() {
  const [tableData, setTableData] = useState<TableData[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/table-data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: TableData[] = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      }
    }

    fetchData();
  }, []);

  const formatDate = (isoDateString: string): string => {
    const dateObject = new Date(isoDateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(dateObject);

    return formattedDate.replace(/\//g, "-");
  };

  const handleDelete = (id: number) => {
    setTableData((currentData) =>
      currentData?.map((data) =>
        data.id === id ? { ...data, isVisible: false } : data
      )
    );
  };

  return (
    <main className="p-12">
      <div className="flex justify-between">
        <span className="text-5xl font-light">Reports</span>
        <button className="rounded-xl bg-gradient-to-br from-indigo-500/50 via-indigo-500/75 to-indigo-500/50 p-4 text-gray-200 shadow-md shadow-indigo-500/50 hover:scale-105 transition-all flex space-x-4 items-center">
          <span>New Report</span>
          <DocumentPlusIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="mt-12">
        <div className="bg-white shadow-md rounded-xl p-4">
          <div className="grid grid-cols-12 gap-4 text-center text-lg font-medium m-2 p-4 border-b border-gray-200">
            <span className="col-span-1">ID</span>
            <span className="col-span-3">Title</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-2">Date</span>
            <span className="col-span-3">Owner</span>
            <span className="col-span-1">Action</span>
          </div>
          {tableData ? (
            tableData?.map(
              (data) =>
                data.isVisible !== false && (
                  <div className="border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4 rounded-xl hover:shadow-sm hover:bg-gray-100 text-center text-sm m-2 p-4">
                      <span className="col-span-1">{data.id}</span>
                      <span className="col-span-3">{data.title}</span>
                      <span className="col-span-2">{data.category}</span>
                      <span className="col-span-2">
                        {formatDate(data.date)}
                      </span>
                      <span className="col-span-3">{data.owner}</span>
                      <span className="col-span-1 flex items-center justify-center">
                        <button onClick={() => handleDelete(data.id)}>
                          <TrashIcon className="w-4 h-4 text-red-500" />
                        </button>
                      </span>
                    </div>
                  </div>
                )
            )
          ) : (
            <div className="space-y-8 mt-4">
              <div className="bg-gray-200/75 w-full h-8 rounded-xl shadow-sm" />
              <div className="bg-gray-200/75 w-full h-8 rounded-xl shadow-sm" />
              <div className="bg-gray-200/75 w-full h-8 rounded-xl shadow-sm" />
              <div className="bg-gray-200/75 w-full h-8 rounded-xl shadow-sm" />
              <div className="bg-gray-200/75 w-full h-8 rounded-xl shadow-sm" />
              <div className="bg-gray-200/75 w-full h-8 rounded-xl shadow-sm" />
              <div className="bg-gray-200/75 w-full h-8 rounded-xl shadow-sm" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
