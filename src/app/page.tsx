import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-400 to-gray-800">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md flex flex-row",
          font.className,
        )}>
          Media<p className={cn(
          "text-6xl font-semibold text-black drop-shadow-md",
          font.className,
        )}>X</p>
        </h1>
        <div>
          <div className="flex flex-row gap-4">
          <LoginButton  asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
          <RegisterButton asChild>
            <Button  size="lg">
              Sign up
            </Button>
          </RegisterButton>
          </div>
        </div>
      </div>
    </main>
  )
}