import type { Metadata } from "next"

import { Providers } from "@/components/providers"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "CMS",
  description: "CMS"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
