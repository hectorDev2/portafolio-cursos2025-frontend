import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(
  req: NextRequest,
  { params }: { params: { portfolioId: string } }
) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { portfolioId } = params;
  const { name, code } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: "El nombre del curso es requerido" },
      { status: 400 }
    );
  }

  try {
    // Verificar que el portafolio pertenece al usuario
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: portfolioId,
        teacherId: token.sub,
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portafolio no encontrado o no autorizado" },
        { status: 404 }
      );
    }

    const newCourse = await prisma.curso.create({
      data: {
        name,
        code,
        portfolio: {
          connect: {
            id: portfolioId,
          },
        },
      },
    });

    // Adaptar la respuesta para que coincida con la estructura de `Course` en el frontend
    const courseForFrontend = {
      id: newCourse.id,
      name: newCourse.name,
      code: newCourse.code,
      syllabus: "missing",
      progress: "missing",
      record: "missing",
    };

    return NextResponse.json(courseForFrontend, { status: 201 });
  } catch (error) {
    console.error("Error al crear el curso:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}