// app/page.tsx (default route redirects to image generation)
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/image')
}