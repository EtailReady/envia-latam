import { NextRequest, NextResponse } from 'next/server';

/** Generate a human-readable pickup ID: ENV-YYYY-XXXXXX */
function generatePickupId(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars (0/O, 1/I)
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ENV-${year}-${suffix}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const pickupId = generatePickupId();
    const pickupData = {
      pickupId,
      courierName: body.courierName,
      courierSlug: body.courierSlug,
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
      city: body.city,
      state: body.state,
      destination: body.destination,
      weight: body.weight,
      contents: body.contents,
      preferredDate: body.preferredDate,
      notes: body.notes || '',
      status: 'Solicitado',
      createdAt: new Date().toISOString(),
    };

    // ─── TODO: Real email integration ────────────────────────────────────────
    // When ready, install Resend: npm install resend
    // Then replace the console.log below with:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // // Email to courier
    // await resend.emails.send({
    //   from: 'noreply@envialatam.com',
    //   to: body.courierEmail,
    //   subject: `Nueva solicitud de pickup — ${pickupId}`,
    //   html: `
    //     <h2>Nueva solicitud de pickup</h2>
    //     <p><strong>Número:</strong> ${pickupId}</p>
    //     <p><strong>Cliente:</strong> ${body.name}</p>
    //     <p><strong>Teléfono:</strong> ${body.phone}</p>
    //     <p><strong>Dirección:</strong> ${body.address}, ${body.city}, ${body.state}</p>
    //     <p><strong>Destino:</strong> ${body.destination}</p>
    //     <p><strong>Peso estimado:</strong> ${body.weight} lbs</p>
    //     <p><strong>Contenido:</strong> ${body.contents}</p>
    //     <p><strong>Fecha preferida:</strong> ${body.preferredDate}</p>
    //     <p><strong>Notas:</strong> ${body.notes || 'Ninguna'}</p>
    //   `,
    // });
    //
    // // Confirmation email to customer
    // await resend.emails.send({
    //   from: 'noreply@envialatam.com',
    //   to: body.email,
    //   subject: `Tu solicitud de pickup ${pickupId} fue enviada`,
    //   html: `<p>Hola ${body.name}, tu solicitud ${pickupId} fue enviada a ${body.courierName}. Te llamarán para confirmar.</p>`,
    // });
    // ─────────────────────────────────────────────────────────────────────────

    console.log('[PICKUP REQUEST]', JSON.stringify(pickupData, null, 2));

    return NextResponse.json(pickupData, { status: 201 });
  } catch (err) {
    console.error('[PICKUP ERROR]', err);
    return NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
  }
}
