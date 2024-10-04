import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

interface HeaderProps{
    label: string;
}

export const Header = ({label}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
          "text-4xl font-semibold text-gray-400 drop-shadow-md flex flex-row",
          font.className,
        )}>
          Media<p className={cn(
          "text-4xl font-semibold text-black drop-shadow-md",
          font.className,
        )}>X</p>
        </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}