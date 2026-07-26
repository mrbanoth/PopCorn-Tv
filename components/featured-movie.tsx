"use client"

import Image from "next/image"
import Link from "next/link"
import { Info, Play, Plus } from "lucide-react"

interface Movie {
  id: string
  title: string
  description: string
  bannerUrl: string
  videoUrl: string
  releaseYear: number
  duration: string
  genres: string[]
}

export function FeaturedMovie({ movie, onPlay }: { movie: Movie; onPlay: (movie: Movie) => void }) {
  return (
    <section className="hero-shell relative min-h-[640px] overflow-hidden rounded-[28px] border border-white/10">
      <Image src={movie.bannerUrl} alt="" fill priority className="object-cover object-center" />
      <div className="absolute inset-0 hero-shade" />
      <div className="relative z-10 flex min-h-[640px] max-w-2xl flex-col justify-end px-6 pb-16 pt-32 sm:px-12 lg:px-16">
        <div className="mb-5 flex flex-wrap gap-2">
          {movie.genres.slice(0, 3).map((genre) => <span className="genre-pill" key={genre}>{genre}</span>)}
        </div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.28em] text-emerald-300">PopcornTV Original</p>
        <h1 className="max-w-xl text-5xl font-black leading-[.95] tracking-[-.04em] sm:text-7xl">{movie.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/70">
          <span className="font-bold text-emerald-400">98% Match</span><span>{movie.releaseYear}</span><span>{movie.duration}</span><span className="rounded border border-white/30 px-1.5 py-0.5 text-[10px]">HD</span>
        </div>
        <p className="mt-5 max-w-lg text-sm leading-6 text-white/70 sm:text-base">{movie.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={() => onPlay(movie)} className="primary-action"><Play className="h-4 w-4 fill-current" /> Play trailer</button>
          <Link href={`/movie/${movie.id}`} className="secondary-action"><Info className="h-4 w-4" /> Details</Link>
          <button className="icon-action" aria-label="Add to my list"><Plus className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  )
}
