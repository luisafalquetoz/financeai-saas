import { Button } from '@/app/_components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { ScrollArea } from '@/app/_components/ui/scroll-area';
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/app/_constants/transactions';
import { formatCurrency } from '@/app/_utils/currency';
import { Transaction, TransactionType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface LastTransactionsProps {
	lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
	const getAmountColor = (transaction: Transaction) => {
		if (transaction.type === TransactionType.EXPENSE) {
			return 'text-red-500';
		}
		if (transaction.type === TransactionType.DEPOSIT) {
			return 'text-primary';
		}
		return 'text-white';
	};
	const getAmountPrefix = (transaction: Transaction) => {
		if (transaction.type === TransactionType.DEPOSIT) {
			return '+';
		}
		return '-';
	};

	return (
		<ScrollArea className="rounded-md border">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="font-bold">Últimas Transações</CardTitle>
				<Button variant="outline" className="rounded-full" asChild>
					<Link href="/transactions">Ver mais</Link>
				</Button>
			</CardHeader>
			<CardContent className="space-y-6">
				{lastTransactions.map((transaction) => (
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-white bg-opacity-[3%] p-3">
								<Image
									src={
										TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
									}
									alt="PIX"
									height={20}
									width={20}
								/>
							</div>
							<div>
								<p className="font-bold text-sm">{transaction.name}</p>
								<p className="text-muted-foreground text-xs">
									{new Date(transaction.date).toLocaleDateString('pt-BR', {
										day: '2-digit',
										month: 'short',
										year: 'numeric',
									})}
								</p>
							</div>
						</div>
						<p className={`font-bold text-sm ${getAmountColor(transaction)}`}>
							{getAmountPrefix(transaction)}
                            {formatCurrency(Number(transaction.amount))}
						</p>
					</div>
				))}
			</CardContent>
		</ScrollArea>
	);
};

export default LastTransactions;
