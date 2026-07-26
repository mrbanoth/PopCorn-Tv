"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import { Menu, Search, UserRound, X } from "lucide-react"
import { fetchContentfulData } from "@/lib/contentful"
import { FeaturedMovie } from "@/components/featured-movie"
import { MovieCard } from "@/components/movie-card"
import { MainNav } from "@/components/main-nav"
import { Logo } from "@/components/logo"
import { VideoPlayerModal } from "@/components/video-player-modal"

type Movie = ReturnType<typeof fetchContentfulData>["categories"][number]["movies"][number]

export default function BrowsePage() {
  const categories = useMemo(() => fetchContentfulData().categories, [])
  const allMovies = useMemo(() => Array.from(new Map(categories.flatMap(c => c.movies).map(m => [m.id, m])).values()), [categories])
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [playing, setPlaying] = useState<Movie | null>(null)
  const featured = allMovies[2] || allMovies[0]
  const results = query.trim() ? allMovies.filter(m => `${m.title} ${m.genres.join(" ")}`.toLowerCase().includes(query.toLowerCase())) : []
  const submitSearch = (e: FormEvent) => { e.preventDefault(); setSearchOpen(true) }

  return <div className="min-h-screen overflow-x-hidden bg-[#07110f] text-white">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#07110f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center gap-8 px-5 lg:px-10">
        <Logo className="shrink-0" /><MainNav />
        <form onSubmit={submitSearch} className="ml-auto hidden items-center rounded-full border border-white/10 bg-white/5 px-4 sm:flex">
          <Search className="h-4 w-4 text-white/45" /><input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setSearchOpen(true)} placeholder="Search titles" className="w-36 bg-transparent px-3 py-2.5 text-sm outline-none lg:w-52" />
          {query && <button type="button" onClick={() => setQuery("")}><X className="h-4 w-4 text-white/40" /></button>}
        </form>
        <Link href="/profile" className="grid h-10 w-10 place-items-center rounded-full border border-emerald-300/30 bg-emerald-300/10"><UserRound className="h-4 w-4 text-emerald-300" /></Link>
        <button className="md:hidden"><Menu /></button>
      </div>
    </header>

    <main className="relative z-10 mx-auto max-w-[1500px] px-4 pb-20 pt-24 sm:px-6 lg:px-10">
      {searchOpen && query.trim() ? <section className="min-h-[70vh] pt-10">
        <div className="mb-8 flex items-end justify-between"><div><p className="eyebrow">Search</p><h1 className="text-3xl font-bold">Results for “{query}”</h1></div><button onClick={() => { setSearchOpen(false); setQuery("") }} className="secondary-action"><X className="h-4 w-4" /> Close</button></div>
        <div className="poster-grid">{results.map(movie => <MovieCard key={movie.id} movie={movie} onPlay={setPlaying} />)}</div>
        {!results.length && <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-white/50">No titles found. Try a genre or another movie name.</p>}
      </section> : <>
        <FeaturedMovie movie={featured} onPlay={setPlaying} />
        <div className="mt-12 space-y-14">
          {categories.slice(0, 7).map((category, categoryIndex) => <section key={category.id}>
            <div className="mb-5 flex items-end justify-between"><div><p className="eyebrow">{categoryIndex === 0 ? "Everyone's watching" : "Curated for you"}</p><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{category.name}</h2></div><button className="text-sm font-medium text-emerald-300/80 hover:text-emerald-300">View all →</button></div>
            <div className="poster-grid">{category.movies.slice(0, 6).map((movie, i) => <MovieCard key={movie.id} movie={movie} onPlay={setPlaying} rank={categoryIndex === 0 ? i + 1 : undefined} />)}</div>
          </section>)}
        </div>
      </>}
    </main>
    {playing && <VideoPlayerModal videoUrl={playing.videoUrl} title={`${playing.title} trailer`} onClose={() => setPlaying(null)} />}
  </div>
}
