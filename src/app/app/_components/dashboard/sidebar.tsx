'use client'

import { Heart, Home, FileText, HelpCircle, LogOut } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function Sidebar(){
    const [activeNavItem, setActiveNavItem] = useState('home')

    return (
        <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between h-screen sticky top-3">

        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">LoveLink</span>
          </div>
          <nav>
            <Link href="/app">
                <NavItem icon={<Home />} label="Home" isActive={activeNavItem === 'home'} onClick={() => setActiveNavItem('home')}/>
            </Link>
            <Link href="/app/my-templates">
                <NavItem icon={<FileText />} label="Meus Templates" isActive={activeNavItem === 'templates'} onClick={() => setActiveNavItem('templates')} />
            </Link>
            <Link href="/app/help">
            <NavItem icon={<HelpCircle />} label="Ajuda" isActive={activeNavItem === 'support'} onClick={() => setActiveNavItem('support')} />
            </Link>
          </nav>
        </div>
        
        <div className="p-4">
          <NavItem icon={<LogOut />} label="Sair" onClick={() => signOut()} isActive={false} />
        </div>
      </aside>
    )
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
    return (
      <button
        className={`flex items-center space-x-2 w-full p-2 rounded-lg mb-2 ${
          isActive ? 'bg-pink-100 text-red-500' : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </button>
    )
  }