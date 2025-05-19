import { db } from '@/app/_lib/prisma';
import {
	PiggyBankIcon,
	TrendingDownIcon,
	TrendingUpIcon,
	WalletIcon,
} from 'lucide-react';
import SummaryCard from './summary-card';

interface SummaryCardsProps {
	month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
	const where = {
		date: {
			gte: new Date(`2025-${month}-01`),
			lte: new Date(`2025-${month}-31`),
		},
	};
	const depositsTotal = Number(
		(
			await db.transaction.aggregate({
				where: { ...where, type: 'DEPOSIT' },
				_sum: { amount: true },
			})
		)._sum?.amount,
	);
	const investimentsTotal = Number(
		(
			await db.transaction.aggregate({
				where: { ...where, type: 'INVESTMENT' },
				_sum: { amount: true },
			})
		)._sum?.amount,
	);
	const expensesTotal = Number(
		(
			await db.transaction.aggregate({
				where: { ...where, type: 'EXPENSE' },
				_sum: { amount: true },
			})
		)._sum?.amount,
	);
	const balance = depositsTotal - investimentsTotal - expensesTotal;

	return (
		<>
			<div className="mb-6 space-y-6">
				<SummaryCard
					icon={<WalletIcon size={16} />}
					title="Saldo"
					amount={balance}
					size="large"
				/>
			</div>

			<div className="grid grid-cols-3 gap-6">
				<SummaryCard
					icon={<PiggyBankIcon size={16} />}
					title="Investido"
					amount={investimentsTotal}
				/>
				<SummaryCard
					icon={<TrendingUpIcon size={16} className="text-primary" />}
					title="Receita"
					amount={depositsTotal}
				/>
				<SummaryCard
					icon={<TrendingDownIcon size={16} className="text-red-700" />}
					title="Despesas"
					amount={expensesTotal}
				/>
			</div>
		</>
	);
};

export default SummaryCards;
