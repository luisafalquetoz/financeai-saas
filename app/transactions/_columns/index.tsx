'use client';

import { type Transaction, TransactionType } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import TransactionTypeBadge from '../_components/type-badge';

export const transactionColumns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'name',
		header: 'Nome',
	},
	{
		accessorKey: 'type',
		header: 'Tipo',
		cell: ({ row: { original: transaction } }) => (
			<TransactionTypeBadge transaction={transaction} />
		),
	},
	{
		accessorKey: 'category',
		header: 'Categoria',
	},
	{
		accessorKey: 'paymentMethod',
		header: 'Método de pagamento',
	},
	{
		accessorKey: 'date',
		header: 'Data',
	},
	{
		accessorKey: 'amount',
		header: 'Valor',
	},
	{
		accessorKey: 'actions',
		header: '',
	},
];
