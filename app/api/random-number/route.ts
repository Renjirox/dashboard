import { NextResponse } from "next/server";

type numberData = {
  date: string;
  number: number;
};

export async function GET() {
  const data: numberData[] = [];

  // Getting yesterday's date and the number for that day
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayNumbers = Math.floor(Math.random() * 5000);

  data.push({
    date: yesterday.toISOString().split('T')[0],
    number: yesterdayNumbers,
  });

    // Getting today's date and the number for that day
  const today = new Date();
  const todayNumbers = yesterdayNumbers + Math.floor(Math.random() * 5000) + 1;

  data.push({
    date: today.toISOString().split('T')[0],
    number: todayNumbers,
  });

  return NextResponse.json(data);
}