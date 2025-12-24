import { useState } from 'react';
import { SessionDialogShell } from './session-dialog-shell';
import { SessionForm, type SessionPayload } from './session-form';
import type { PatientOption } from './session-patient-select-field';
import type { ProfessionalOption } from './session-professional-select-field';

const patientOptions: PatientOption[] = [
	{ id: '11111111-1111-1111-1111-111111111111', name: 'João Santos' },
	{ id: '22222222-2222-2222-2222-222222222222', name: 'Maria Oliveira' },
	{ id: '33333333-3333-3333-3333-333333333333', name: 'Pedro Costa' },
	{ id: '44444444-4444-4444-4444-444444444444', name: 'Ana Silva' },
];

const professionalOptions: ProfessionalOption[] = [
	{ id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Dra. Paula Lima' },
	{ id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', name: 'Dr. Rafael Souza' },
];

export function CreateNewSession() {
	const [open, setOpen] = useState(false);

	const handleSubmit = async (
		payload: SessionPayload,
		{ reset }: { reset: () => void }
	) => {
		console.log('Nova sessão', payload);
		reset();
		setOpen(false);
	};

	return (
		<SessionDialogShell open={open} onOpenChange={setOpen}>
			<SessionForm
				open={open}
				onSubmit={handleSubmit}
				onCancel={() => setOpen(false)}
				patientOptions={patientOptions}
				professionalOptions={professionalOptions}
			/>
		</SessionDialogShell>
	);
}
