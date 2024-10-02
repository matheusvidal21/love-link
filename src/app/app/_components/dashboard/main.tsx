import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-gray-100">
            <div className="absolute top-10 right-10 p-5">
                <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">3</Badge>
                </Button>
            </div>

            <main className="flex-1 p-12">
                {children}
            </main>
        </div>
    )
}

