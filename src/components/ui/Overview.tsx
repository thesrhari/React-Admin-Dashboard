"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { graphData } from "@/app/analytics";

type userProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  price: number;
}[];

type OverviewProps = {
  users: userProps;
};

export function Overview({ users }: OverviewProps) {
  const month = graphData(users);

  const data = [
    {
      name: "Jan",
      total: month.January,
    },
    {
      name: "Feb",
      total: month.February,
    },
    {
      name: "Mar",
      total: month.March,
    },
    {
      name: "Apr",
      total: month.April,
    },
    {
      name: "May",
      total: month.May,
    },
    {
      name: "Jun",
      total: month.June,
    },
    {
      name: "Jul",
      total: month.July,
    },
    {
      name: "Aug",
      total: month.August,
    },
    {
      name: "Sep",
      total: month.September,
    },
    {
      name: "Oct",
      total: month.October,
    },
    {
      name: "Nov",
      total: month.November,
    },
    {
      name: "Dec",
      total: month.December,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
