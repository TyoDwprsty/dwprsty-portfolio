import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Always run on request; never serve a cached response, or the database
// would never actually be touched and the project could still be paused.
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.error('Keep-alive cron: CRON_SECRET is not configured.')
    return NextResponse.json(
      { error: 'Server misconfigured.' },
      { status: 500 }
    )
  }

  if (request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    // A trivial read is enough to count as activity and reset Supabase's
    // inactivity timer. Counting rows keeps this cheap and side-effect free.
    const projectCount = await prisma.project.count()

    return NextResponse.json(
      {
        success: true,
        projectCount,
        checkedAt: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Keep-alive cron error:', err)
    return NextResponse.json(
      { error: 'Database keep-alive query failed.' },
      { status: 500 }
    )
  }
}
