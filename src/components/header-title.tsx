interface HeaderTitleProps {
	title: string;
	description: string;
}

export function HeaderTitle({ title, description }: HeaderTitleProps) {
	return (
		<div>
			<p className='text-3xl font-bold leading-tight'>{title}</p>
			<p className='text-muted-foreground font-medium'>{description}</p>
		</div>
	);
}
