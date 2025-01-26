type dataProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  price: number;
}[];

export function analytics(data: dataProps) {
  const totalUsers = data.length;
  const activeSubscriptions = data.filter((user) => user.price > 0).length;

  const dailyRevenue = data.reduce((acc, user) => {
    const createdAt = new Date(user.createdAt);
    const today = new Date();

    if (
      createdAt.getFullYear() === today.getFullYear() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getDate() === today.getDate()
    ) {
      return acc + user.price;
    }
    return acc;
  }, 0);

  let monthlySales = 0;

  const monthlyRevenue = data.reduce((acc, user) => {
    const createdAt = new Date(user.createdAt);
    const today = new Date();

    if (
      createdAt.getFullYear() === today.getFullYear() &&
      createdAt.getMonth() === today.getMonth()
    ) {
      if (user.price !== 0) {
        monthlySales++;
      }
      return acc + user.price;
    }
    return acc;
  }, 0);

  return {
    totalUsers,
    activeSubscriptions,
    dailyRevenue,
    monthlyRevenue,
    monthlySales,
  };
}

export function graphData(data: dataProps) {
  const currentYear = new Date().getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyRevenue = months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {} as Record<string, number>);

  data.forEach((user) => {
    const createdAt = new Date(user.createdAt);
    const year = createdAt.getFullYear();

    if (year === currentYear) {
      const month = createdAt.toLocaleString("default", { month: "long" });
      monthlyRevenue[month] += user.price;
    }
  });

  return monthlyRevenue;
}
