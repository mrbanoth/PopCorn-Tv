"use client"

import Link from "next/link"

export function MainNav() {
  return <nav className="hidden items-center gap-7 md:flex">
    <Link className="nav-link active" href="/browse">Home</Link>
    <Link className="nav-link" href="/browse?category=movies">Movies</Link>
    <Link className="nav-link" href="/browse?category=tv">TV Shows</Link>
    <Link className="nav-link" href="/my-list">My Library</Link>
  </nav>
}
