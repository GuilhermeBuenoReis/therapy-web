import { useSearch } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { type MedicalRecord, RecordCard } from '@/components/records-card';
import { RecordsPagination } from '@/components/records-pagination';

const PAGE_SIZE = 5;

const records: MedicalRecord[] = [
	{
		id: 'rec-01',
		patientName: 'João Santos',
		date: '2024-12-18',
		sessionLabel: 'Session #12',
		noteType: 'Progress Note',
		summary:
			'Patient presented significant improvement in anxiety symptoms. Discussed coping strategies and cognitive restructuring techniques. Homework assigned: daily mood journal. Next session scheduled to review progress.',
	},
	{
		id: 'rec-02',
		patientName: 'Maria Oliveira',
		date: '2024-12-12',
		sessionLabel: 'Session #08',
		noteType: 'Follow-up',
		summary:
			'Relato de melhor qualidade do sono e menor tensão muscular. Revisamos exercícios de respiração e incluímos 10 minutos de caminhada diária como rotina.',
	},
	{
		id: 'rec-03',
		patientName: 'Pedro Costa',
		date: '2024-12-05',
		sessionLabel: 'Session #06',
		noteType: 'Treatment Plan',
		summary:
			'Definido novo plano de tratamento focado em fortalecer adesão às atividades de exposição gradual. Paciente mostrou abertura para ajustes e estabelecemos metas semanais.',
	},
	{
		id: 'rec-04',
		patientName: 'Ana Silva',
		date: '2024-12-03',
		sessionLabel: 'Session #03',
		noteType: 'Progress Note',
		summary:
			'Evidências de melhora no humor após introdução de rotina matinal. Discutimos fatores de gatilho e combinamos registrar pensamentos automáticos.',
	},
	{
		id: 'rec-05',
		patientName: 'Lucas Mendes',
		date: '2024-11-28',
		sessionLabel: 'Session #09',
		noteType: 'Evaluation',
		summary:
			'Avaliação de progresso mostra redução de 30% nos relatos de dor e maior frequência de atividades físicas. Sem efeitos adversos relatados.',
	},
	{
		id: 'rec-06',
		patientName: 'Bruna Rocha',
		date: '2024-11-21',
		sessionLabel: 'Session #02',
		noteType: 'Medication Update',
		summary:
			'Ajuste de medicação em conjunto com psiquiatria. Monitorar efeitos colaterais de sonolência e registrar padrões de apetite durante a semana.',
	},
	{
		id: 'rec-07',
		patientName: 'Fernanda Santos',
		date: '2024-11-15',
		sessionLabel: 'Session #07',
		noteType: 'Follow-up',
		summary:
			'Paciente relata maior estabilidade emocional. Prática de diário de gratidão mantida por 10 dias. Próximo passo: introduzir meditação guiada curta.',
	},
	{
		id: 'rec-08',
		patientName: 'Carlos Alberto',
		date: '2024-11-10',
		sessionLabel: 'Session #05',
		noteType: 'Treatment Plan',
		summary:
			'Planejamento de rotina de exercícios para fortalecimento lombar. Sugerido acompanhamento semanal para revisão de postura em atividades diárias.',
	},
	{
		id: 'rec-09',
		patientName: 'Juliana Andrade',
		date: '2024-11-02',
		sessionLabel: 'Session #04',
		noteType: 'Progress Note',
		summary:
			'Melhora na confiança ao dirigir após técnicas de exposição gradual. Paciente concordou em ampliar percurso e registrar nível de ansiedade.',
	},
	{
		id: 'rec-10',
		patientName: 'Guilherme Costa',
		date: '2024-10-27',
		sessionLabel: 'Session #01',
		noteType: 'Evaluation',
		summary:
			'Sessão inicial para mapear queixas de estresse ocupacional. Identificados padrões de sono irregular e alimentação tardia. Agendado retorno em 7 dias.',
	},
];

export function RecordsList() {
	const { filter } = useSearch({ from: '/app/records' });
	const [currentPage, setCurrentPage] = useState(1);

	const filteredRecords = useMemo(() => {
		const normalizedFilter = filter?.trim().toLowerCase();
		if (!normalizedFilter) return records;

		return records.filter((record) =>
			record.patientName.toLowerCase().includes(normalizedFilter)
		);
	}, [filter]);

	useEffect(() => {
		setCurrentPage(1);
	}, []);

	const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
	const startIndex = (currentPage - 1) * PAGE_SIZE;
	const currentSlice = filteredRecords.slice(
		startIndex,
		startIndex + PAGE_SIZE
	);

	return (
		<section className='space-y-4'>
			{currentSlice.length > 0 ? (
				currentSlice.map((record) => (
					<RecordCard key={record.id} record={record} />
				))
			) : (
				<div className='rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center text-sm text-muted-foreground dark:border-slate-800 dark:bg-slate-900/40'>
					Nenhum registro encontrado para esse filtro.
				</div>
			)}

			<RecordsPagination
				currentPage={currentPage}
				totalPages={totalPages}
				totalItems={filteredRecords.length}
				pageSize={PAGE_SIZE}
				onPageChange={(page) => {
					setCurrentPage(Math.max(1, Math.min(page, totalPages)));
				}}
			/>
		</section>
	);
}
