// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Footer from "@/components/layout/footer";

// Google Fonts
const dmSans = DM_Sans({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tactech - Software Development & Digital Solutions",
  description:
    "Tactech delivers cutting-edge software solutions that drive business growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          dmSans.className,
          poppins.variable,
          "antialiased font-sans max-w-[100vw] box-border",
        )}
      >
        <Providers>
          <div className="">
            <div
              className="absolute 
                -top-[500px] 
                -left-[50px] 
                w-[800px] 
                h-[900px] 
                sm:w-[600px] 
                sm:-left-[100px] 
                max-w-full 
                opacity-20 
                pointer-events-none 
                z-[99]"
              style={{
                background:
                  "radial-gradient(circle at center, hsl(221, 83%, 53%) 0%, transparent 50%)",
                filter: "blur(64px)",
              }}
            />
            <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]">
              <div className="absolute inset-0 [transform:rotateX(35deg)]">
                <div className="animate-grid [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] [background-repeat:repeat] [background-size:120px_120px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]"></div>
              </div>
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%"></div> */}
            </div>
            <div className="">
              <main className="">{children}</main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
