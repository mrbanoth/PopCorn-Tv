"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Play, Search, UserRound, X } from "lucide-react"
import { fetchContentfulData, fetchMovieById } from "@/lib/contentful"
import { VideoPlayerModal } from "@/components/video-player-modal"

type Movie = ReturnType<typeof fetchContentfulData>["categories"][number]["movies"][number]

export default function BrowsePage() {
  const categories = useMemo(() => fetchContentfulData().categories, [])
  const movies = useMemo(() => Array.from(new Map(categories.flatMap(c => c.movies).map(m => [m.id, m])).values()), [categories])
  const [playing, setPlaying] = useState<Movie | null>(null)
  const [query, setQuery] = useState("")
  const featured = fetchMovieById("16") || movies[0]
  const visibleMovies = movies.filter(movie => movie.id !== featured.id && (!query || movie.title.toLowerCase().includes(query.toLowerCase()))).slice(0, 8)

  return (
    <main className="reference-stage">
      <div className="dot-field dot-field-top" aria-hidden="true" />
      <div className="dot-field dot-field-bottom" aria-hidden="true" />

      <section className="reference-player">
        <div className="reference-hero">
          <Image src={featured.bannerUrl} alt={featured.title} fill priority className="object-cover object-center" />
          <div className="reference-overlay" />

          <header className="reference-header">
            <nav className="reference-nav" aria-label="Primary navigation">
              <Link className="selected" href="/browse">Home</Link>
              <Link href="/browse?category=movies">Movies</Link>
              <Link href="/browse?category=tv">TV shows</Link>
              <Link href="/my-list">My Library</Link>
            </nav>
            <div className="reference-tools">
              <label className="reference-search">
                <Search className="h-4 w-4" />
                <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" />
                {query && <button onClick={() => setQuery("")} aria-label="Clear search"><X className="h-3.5 w-3.5" /></button>}
              </label>
              <Link href="/profile" className="reference-avatar" aria-label="Profile"><UserRound className="h-4 w-4" /></Link>
            </div>
          </header>

          <div className="reference-copy">
            <div className="reference-genres">
              {featured.genres.slice(0, 3).map(genre => <span key={genre}>{genre}</span>)}
            </div>
            <p className="reference-studio">POPCORN TV</p>
            <h1>{featured.title}</h1>
            <p className="reference-subtitle">THE UNTOLD STORY</p>
            <div className="reference-meta">
              <span>A PopcornTV Original Film</span><b>98% Match</b><span>{featured.releaseYear}</span>
            </div>
            <div className="reference-actions">
              <button onClick={() => setPlaying(featured)}><Play className="h-5 w-5 fill-current" />Play now</button>
              <button className="heart-button" aria-label="Add to favorites"><Heart className="h-6 w-6" /></button>
            </div>
          </div>
        </div>

        <section className="reference-movies">
          <h2>{query ? `Results for “${query}”` : "Movies"}</h2>
          <div className="reference-rail">
            {visibleMovies.map((movie, index) => (
              <button key={movie.id} className={index === 0 ? "reference-card reference-card-wide" : "reference-card"} onClick={() => setPlaying(movie)}>
                <Image src={index === 0 ? movie.bannerUrl : movie.posterUrl} alt={movie.title} fill className="object-cover" />
                <span className="reference-card-shade" />
                {index === 0 && <span className="reference-card-copy"><strong>{movie.title}</strong><small>{movie.duration} · {movie.genres.slice(0, 3).join(", ")}</small></span>}
                {index === 0 && <span className="reference-play"><Play className="h-5 w-5 fill-current" /></span>}
              </button>
            ))}
            {!visibleMovies.length && <p className="py-12 text-sm text-white/50">No movies found.</p>}
          </div>
        </section>
      </section>

      {playing && <VideoPlayerModal videoUrl={playing.videoUrl} title={`${playing.title} trailer`} onClose={() => setPlaying(null)} />}
    </main>
  )
}
