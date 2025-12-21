import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/subscriptions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/subscriptions"!</div>
}
