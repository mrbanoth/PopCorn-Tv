"use client"

import Image from "next/image"
import { Play, Plus } from "lucide-react"

interface Movie {
  id: string; title: string; description: string; posterUrl: string; releaseYear: number; duration: string; genres: string[]; videoUrl?: string
}

export function MovieCard({ movie, onPlay, rank }: { movie: Movie; isAuthenticated?: boolean; onPlay?: (movie: Movie) => void; rank?: number }) {
  return (
    <article className="movie-tile group relative min-w-0">
      <button className="block w-full text-left" onClick={() => onPlay?.(movie)} aria-label={`Play ${movie.title} trailer`}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-white/5">
          <Image src={movie.posterUrl || "/placeholder.jpg"} alt={movie.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07110f] via-transparent to-transparent opacity-70" />
          {rank && <span className="absolute left-3 top-3 rounded-full bg-emerald-400 px-2.5 py-1 text-xs font-black text-[#07110f]">#{rank}</span>}
          <span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100"><span className="grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-xl"><Play className="h-5 w-5 fill-current" /></span></span>
        </div>
      </button>
      <div className="flex items-start justify-between gap-2 px-1 pt-3">
        <div className="min-w-0"><h3 className="truncate text-sm font-semibold">{movie.title}</h3><p className="mt-1 text-xs text-white/45">{movie.releaseYear} · {movie.genres[0]}</p></div>
        <button className="mt-0.5 text-white/45 transition hover:text-emerald-300" aria-label={`Add ${movie.title} to list`}><Plus className="h-4 w-4" /></button>
      </div>
    </article>
  )
}
