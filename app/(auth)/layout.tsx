import { Mountain } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-lg bg-forest flex items-center justify-center">
          <Mountain className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          Sherpa <span className="text-forest-light">AI</span>
        </span>
      </Link>
      {children}
    </div>
  );
}
