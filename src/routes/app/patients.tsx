import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/patients')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/patients"!</div>;
}
