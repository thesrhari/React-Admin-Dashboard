import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type userProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  price: number;
}[];

type RecentSalesProps = {
  users: userProps;
};

export function RecentSales({ users }: RecentSalesProps) {
  const filtered = users.filter((user) => user.price > 0);
  const recentSales = filtered.slice(-5);

  return (
    <div className="space-y-8">
      {recentSales.toReversed().map((user) => (
        <div key={user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {user.firstName[0] + user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="md:flex w-full">
            <div className="ml-2 md:ml-4 space-y-1 ">
              <p className="text-sm font-medium leading-none">
                {user.firstName + " " + user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="ml-2 md:ml-auto font-medium text-xs">
              +{user.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
