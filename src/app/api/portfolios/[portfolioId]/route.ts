import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(
  req: NextRequest,
  { params }: { params: { portfolioId: string } }
) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { portfolioId } = params;

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

    // Eliminar cursos y otros datos relacionados primero
    await prisma.curso.deleteMany({ where: { portfolioId } });
    // Agrega aquí la eliminación de otros modelos relacionados si es necesario

    await prisma.portfolio.delete({ where: { id: portfolioId } });

    return NextResponse.json({ message: "Portafolio eliminado" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el portafolio:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
