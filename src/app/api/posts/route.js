import { NextResponse } from 'next/server'
import { fetchData } from '@/src/lib/api/fetcher'
import { API_URL } from '@/src/lib/api/url'

export async function POST(request) {
  try {
    const body = await request.json()
    const data = await fetchData(API_URL.POSTS, 'post', body)

    if (global.io) {
      global.io.emit('new-post', data)
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add new post' }, { status: 500 })
  }
}
