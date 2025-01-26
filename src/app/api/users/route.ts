import { userSchema } from "@/data/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  if (
    await prisma.user.findUnique({ where: { email: validation.data.email } })
  ) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const user = await prisma.user.create({ data: validation.data });

  return NextResponse.json(user, { status: 201 });
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}

// export async function PUT(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const userId = Number(searchParams.get("id"));

//   const body = await request.json();
//   const validation = userSchema.safeParse(body);

//   if (!validation.success) {
//     return NextResponse.json(validation.error.format(), { status: 400 });
//   }

//   const user = await prisma.user.update({
//     where: { id: userId },
//     data: {
//       email: validation.data.email,
//       firstName: validation.data.firstName,
//       lastName: validation.data.lastName,
//       price: validation.data.price,
//     },
//   });

//   return NextResponse.json(user, { status: 201 });
// }
