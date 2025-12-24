import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { Sidebar } from '@/components/sidebar';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<main className='min-h-screen w-screen bg-background text-foreground'>
				<ResizablePanelGroup className='min-h-screen min-w-full h-full'>
					<ResizablePanel defaultSize={15}>
						<Sidebar />
					</ResizablePanel>
					<ResizableHandle
						withHandle
						className='bg-border/50 hover:bg-border/80 transition-colors'
					/>
					<ResizablePanel
						defaultSize={76}
						minSize={60}
						className='flex-1 min-w-0 overflow-y-auto'
					>
						<div className='flex-1 min-h-full px-8 py-6 min-w-0'>
							<Outlet />
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</main>
			<TanStackDevtools
				config={{
					position: 'bottom-right',
				}}
				plugins={[
					{
						name: 'Tanstack Router',
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		</>
	),
});
