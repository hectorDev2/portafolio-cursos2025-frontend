
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const portfolioId = searchParams.get('portfolioId');
  const docType = searchParams.get('docType');

  if (!portfolioId || !docType) {
    return NextResponse.json({ message: 'Faltan parámetros en la URL' }, { status: 400 });
  }

  const validDocTypes = ['caratula', 'carga-lectiva', 'filosofia'];
  if (!validDocTypes.includes(docType)) {
    return NextResponse.json({ message: 'Tipo de documento no válido' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No se ha subido ningún archivo' }, { status: 400 });
    }

    const apiResponse = await fetch(`${process.env.API_URL}/portfolios/${portfolioId}/${docType}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: formData,
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json({ message: `Error del servidor de la API: ${errorData.message}` }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error('Error en el manejador de subida:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
