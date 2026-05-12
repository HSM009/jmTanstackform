import { AppSidebar } from '@/components/app-sidebar'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { getSessionFn } from '@/data/session'
import { cn } from '@/lib/utils'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: async () => {
    const session = await getSessionFn()
    return {
      user: session.user,
    }
  },
  notFoundComponent: () => {
    return (
      <div>
        <div className=" p-4 text-amber-700 ">
          <p>Page Not found :(</p> <p>Most probably under Development.</p>
          <p>Comeback Soon</p>
        </div>
        <Link
          className={cn(
            ' block ml-4 mt-4 ',
            buttonVariants({ variant: 'secondary' }),
          )}
          to="/dashboard"
        >
          Go Dasboard Home Page
        </Link>
      </div>
    )
  },
})

function RouteComponent() {
  const { user } = Route.useLoaderData()

  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          <div className=" flex flex-1 flex-col gap-4 p-4 pt-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
