import {
	PiggyBankIcon,
	TrendingDownIcon,
	TrendingUpIcon,
	WalletIcon,
} from 'lucide-react';
import SummaryCard from './summary-card';

interface SummaryCardsProps {
	month: string;
	balance: number;
	depositsTotal: number;
	investmentsTotal: number;
	expensesTotal: number;
}

const SummaryCards = async ({
	balance,
	depositsTotal,
	expensesTotal,
	investmentsTotal,
}: SummaryCardsProps) => {
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
					amount={investmentsTotal}
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
