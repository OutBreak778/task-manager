import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized User", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing Required Details",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be more than 3 characters",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    // console.log(task)

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error Creating Task: ", error);
    return NextResponse.json({ error: "Error Creating Task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized Access", status: 401 });
    }

    const task = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    // console.log(task)
    return NextResponse.json(task);
  } catch (error) {
    console.log("Error Creating Task: ", error);
    return NextResponse.json({ error: "Error Updating Task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { isCompleted, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized Access", status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error Creating Task: ", error);
    return NextResponse.json({ error: "Error Putting Task", status: 500 });
  }
}

