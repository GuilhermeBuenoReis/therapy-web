import { MoveHorizontal } from 'lucide-react';
import {
	Panel,
	Group as PanelGroup,
	type GroupProps as PanelGroupProps,
	type PanelProps,
	Separator as PanelResizeHandle,
	type SeparatorProps as PanelResizeHandleProps,
} from 'react-resizable-panels';

import { cn } from '@/lib/utils';

function ResizablePanelGroup({
	className,
	...props
}: PanelGroupProps & { children?: React.ReactNode }) {
	return (
		<PanelGroup
			data-slot='resizable-panel-group'
			className={cn(
				'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
				className
			)}
			{...props}
		/>
	);
}

function ResizablePanel(props: PanelProps) {
	return <Panel data-slot='resizable-panel' {...props} />;
}

function ResizableHandle({
	withHandle,
	className,
	...props
}: PanelResizeHandleProps & { withHandle?: boolean }) {
	return (
		<PanelResizeHandle
			data-slot='resizable-handle'
			className={cn(
				'bg-border/70 group relative flex w-px items-center justify-center transition-opacity transition-colors hover:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 data-[resize-handle-active=true]:opacity-100 focus-visible:outline-none data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full [&[data-panel-group-direction=vertical]>div]:rotate-90',
				className
			)}
			{...props}
		>
			{withHandle && (
				<div className='relative h-full w-full'>
					<div
						className={cn(
							'z-10 absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[resize-handle-active=true]:opacity-100',
							'data-[panel-group-direction=vertical]:flex-col'
						)}
					>
						<MoveHorizontal
							aria-hidden
							className='size-3 data-[panel-group-direction=vertical]:hidden'
						/>
					</div>
				</div>
			)}
		</PanelResizeHandle>
	);
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
