import {
	Bolt,
	Calendar,
	ChartNoAxesColumnIncreasing,
	CreditCard,
	FileText,
	Home,
	Star,
	Users,
} from 'lucide-react';
import { LogotypeCarely } from './logotype-carely';
import { SidebarItem } from './sidebar-item';
import { SidebarUserProfile } from './sidebar-user-profile';
import { Separator } from './ui/separator';

export function Sidebar() {
	return (
		<div className='min-h-full h-full flex flex-col px-4 py-2 text-sidebar-foreground'>
			<div className='flex flex-col gap-4 flex-1'>
				<div className='flex items-center gap-3'>
					<LogotypeCarely className='size-8 rounded-full' />
					<span className='font-medium text-xl'>Carely</span>
				</div>

				<Separator className='bg-border/80' />

				<div className='flex flex-col items-center gap-3'>
					<SidebarItem
						icon={<Home size={16} />}
						title='Dashboard'
						to='/app/dashboard'
					/>

					<SidebarItem
						icon={<Users size={16} />}
						title='Pacientes'
						to='/app/patients'
					/>

					<SidebarItem
						icon={<Calendar size={16} />}
						title='Sessões'
						to='/app/sessions'
					/>

					<SidebarItem
						icon={<FileText size={16} />}
						title='Registros'
						to='/app/records'
					/>

					<SidebarItem
						icon={<CreditCard size={16} />}
						title='Pagamentos'
						to='/app/payments'
					/>

					<SidebarItem
						icon={<ChartNoAxesColumnIncreasing size={16} />}
						title='Relatório'
						to='/app/reports'
					/>

					<SidebarItem
						icon={<Star size={16} />}
						title='Assinatura'
						to='/app/subscriptions'
					/>

					<SidebarItem
						icon={<Bolt size={16} />}
						title='Configurações'
						to='/app/settings'
					/>
				</div>
			</div>
			<SidebarUserProfile />
		</div>
	);
}
