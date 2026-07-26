import Link from "next/link"

interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/browse" className={className}>
      <span className="font-black text-xl tracking-[-.04em] sm:text-2xl">
        <span className="text-white">POPCORN</span>
        <span className="text-emerald-300">TV</span>
      </span>
    </Link>
  )
}
