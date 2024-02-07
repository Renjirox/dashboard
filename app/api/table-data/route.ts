import { NextResponse } from "next/server";

type TableData = {
    id: number;
    title: string;
    category: string;
    date: string;
    owner: string;
};

export async function GET() {
    const records: TableData[] = [];

    for (let i = 1; i <= 20; i++) {
        records.push({
            id: i,
            title: `Report Title ${i}`,
            category: `Category ${i % 5}`,
            date: new Date(2022, 0, i).toISOString(),
            owner: `Owner ${(i % 3) + 1}`
        });
    }

    const jsonRecords = JSON.stringify(records);

    return new NextResponse(jsonRecords, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
