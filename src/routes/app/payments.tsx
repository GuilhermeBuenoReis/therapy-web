import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/payments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/payments"!</div>
}
