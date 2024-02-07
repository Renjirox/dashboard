import { NextResponse } from "next/server";

type GraphData = {
  date: string;
  number: number;
};

// GET function for the API
export async function GET() {
  const data: GraphData[] = [];
  let previousNumbers = 500 + Math.floor(Math.random() * 4500);

  // Filling the JSON file with data for the graph - days & values that can't be lower than 750
  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    let dayNumbers: number;

    if (i === 6) {
      dayNumbers = previousNumbers;
    } else {
      const minChange = 1000;
      const changeDirection = Math.random() < 0.5 ? -1 : 1;
      const changeAmount = Math.floor(Math.random() * 1001) + minChange;
      dayNumbers = previousNumbers + changeDirection * changeAmount;

      dayNumbers = Math.max(750, dayNumbers);
    }

    data.push({
      date: day.toISOString().split("T")[0],
      number: dayNumbers,
    });

    previousNumbers = dayNumbers;
  }

  return NextResponse.json(data);
}
