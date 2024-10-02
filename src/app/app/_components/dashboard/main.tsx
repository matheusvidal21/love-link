export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}

