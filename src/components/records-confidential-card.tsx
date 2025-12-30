import { Lock } from 'lucide-react';

function RecordsConfidentialCard() {
	return (
		<div className='flex items-center justify-center gap-3 rounded-md border border-amber-200 bg-amber-100 px-4 py-3 text-amber-700 text-sm'>
			<Lock className='size-4' />
			<span>
				Os registros médicos são confidenciais e protegidos por leis de sigilo
				profissional.
			</span>
		</div>
	);
}

export { RecordsConfidentialCard };
