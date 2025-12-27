import { createFileRoute } from '@tanstack/react-router';
import { CreateNewPayment } from '@/components/create-new-payment';
import { Header } from '@/components/header';
import { HeaderTitle } from '@/components/header-title';
import { PaymentCard } from '@/components/payment-card';

export const Route = createFileRoute('/app/payments')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='min-h-full min-w-full space-y-6'>
			<Header />

			<div className='flex justify-between items-center'>
				<HeaderTitle
					title='Registros de pagamento'
					description='Acompanhe os pagamentos e a receita das sessões.'
				/>

				<CreateNewPayment />
			</div>

			<PaymentCard />
		</div>
	);
}
