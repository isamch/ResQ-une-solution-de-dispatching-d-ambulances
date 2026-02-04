'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MapPin, Ambulance, History, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/map', label: 'Dispatch Map', icon: MapPin },
  { href: '/fleet', label: 'Fleet', icon: Ambulance },
  { href: '/incidents', label: 'Incidents', icon: History },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">ResQ</h1>
        <p className="text-sm text-muted-foreground">Dispatch System</p>
      </div>

      <nav className="space-y-2 px-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
              pathname === href
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
            pathname === '/settings'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-muted'
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  )
}
