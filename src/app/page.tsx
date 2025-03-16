"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { path } from "@/constants/path"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="w-full p-4">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/support" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Support
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="flex flex-grow items-center justify-center pb-28">
        <div className="flex flex-col items-center justify-center space-y-5 text-lg">
          <div className="flex flex-col items-center">
            <h1 className="font-bold uppercase">super space</h1>
            <h1 className="uppercase">account</h1>
          </div>
          <Button
            variant="outline"
            className="gap-4 text-base"
            onClick={async () =>
              await signIn("google", { callbackUrl: path.WORKSPACES_MINI_APPS })
            }
          >
            <FcGoogle size={20} /> Login with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
