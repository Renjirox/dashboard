"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRightStartOnRectangleIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  InboxIcon,
  PresentationChartLineIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <section className="flex bg-gray-950 text-gray-200 p-12 flex-col">
      <div className="text-3xl text-center font-semibold flex items-end gap-4">
        <BuildingOffice2Icon className="w-10 h-10" />
        <span>Company</span>
      </div>
      <nav className="flex flex-1 flex-col mt-12 text-lg justify-between">
        <div className="grid gap-4">
          <Link
            href="/"
            className={`flex items-start gap-4 ${
              pathName === "/" ? "text-indigo-400" : ""
            }`}
          >
            <Squares2X2Icon className="w-6 h-6" />
            <span>Overview</span>
          </Link>
          <div
            className={`flex items-start gap-4 text-gray-500 ${
              pathName === "/issues" ? "text-indigo-400" : ""
            }`}
          >
            <ExclamationTriangleIcon className="w-6 h-6" />
            <span>Issues</span>
          </div>
          <div>
            <Link
              href="/reports"
              className={`flex items-start gap-4 ${
                pathName.startsWith("/reports") ? "text-indigo-400" : ""
              }`}
            >
              <DocumentChartBarIcon className="w-6 h-6" />
              <span>Reports</span>
            </Link>
            {pathName.startsWith("/reports") && (
              <div className="ml-10 mt-4 flex flex-col gap-4">
                <Link
                  href="/reports/profits"
                  className={`flex items-start gap-4 border-l-2 border-white-400 pl-4 ${
                    pathName === "/reports/profits"
                      ? "text-indigo-400 border-indigo-400"
                      : ""
                  }`}
                >
                  <span>Profits</span>
                </Link>
                <Link
                  href="/reports/losses"
                  className={`flex items-start gap-4 border-l-2 border-white-400 pl-4 ${
                    pathName === "/reports/losses"
                      ? "text-indigo-400 border-indigo-400"
                      : ""
                  }`}
                >
                  <span>Losses</span>
                </Link>
              </div>
            )}
          </div>
          <div
            className={`flex items-start gap-4 text-gray-500 ${
              pathName === "/growth" ? "text-indigo-400" : ""
            }`}
          >
            <PresentationChartLineIcon className="w-6 h-6" />
            <span>Growth</span>
          </div>
          <div
            className={`flex items-start gap-4 text-gray-500 ${
              pathName === "/customers" ? "text-indigo-400" : ""
            }`}
          >
            <UserGroupIcon className="w-6 h-6" />
            <span>Customers</span>
          </div>
        </div>
        <div className="grid gap-4">
          <div
            className={`flex items-start gap-4 text-gray-500 ${
              pathName === "/settings" ? "text-indigo-400" : ""
            }`}
          >
            <Cog6ToothIcon className="w-6 h-6" />
            <span>Settings</span>
          </div>
          <div
            className={`flex items-start gap-4 text-gray-500 ${
              pathName === "/inbox" ? "text-indigo-400" : ""
            }`}
          >
            <InboxIcon className="w-6 h-6" />
            <span>Inbox</span>
          </div>
          <div className="flex items-start gap-4 text-gray-500">
            <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
            <span>Log Out</span>
          </div>
        </div>
      </nav>
    </section>
  );
}
