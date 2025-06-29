import { db } from '@/app/_lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { TransactionType } from '@prisma/client';
import { TotalExpensePerCategory, TransactionPercentagePerType } from './types';

export const getDashboard = async (month: string) => {
	const { userId } = await auth();
	if (!userId) {
		throw new Error('Unauthorized');
	}
	const where = {
		userId,
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
	const investmentsTotal = Number(
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
	const balance = depositsTotal - investmentsTotal - expensesTotal;

	const transactionsTotal = Number(
		(
			await db.transaction.aggregate({
				where,
				_sum: { amount: true },
			})
		)._sum.amount,
	);

	const typesPercentage: TransactionPercentagePerType = {
		[TransactionType.DEPOSIT]: Math.round(
			(Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
		),
		[TransactionType.EXPENSE]: Math.round(
			(Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
		),
		[TransactionType.INVESTMENT]: Math.round(
			(Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
		),
	};

	const totalExpensePerCategory: TotalExpensePerCategory[] = (
		await db.transaction.groupBy({
			by: ['category'],
			where: {
				...where,
				type: TransactionType.EXPENSE,
			},
			_sum: {
				amount: true,
			},
		})
	).map((category) => ({
		category: category.category,
		totalAmount: Number(category._sum.amount),
		percentageOfTotal: Math.round(
			(Number(category._sum.amount) / Number(expensesTotal)) * 100,
		),
	}));

	const lastTransactions = await db.transaction.findMany({
		where,
		orderBy: { date: 'desc' },
		take: 10,
	});

	return {
		balance,
		depositsTotal,
		investmentsTotal,
		expensesTotal,
		typesPercentage,
		totalExpensePerCategory,
		lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
	};
};
