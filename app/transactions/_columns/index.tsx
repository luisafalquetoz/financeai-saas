'use client';

import { Button } from '@/app/_components/ui/button';
import { Transaction } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import TransactionTypeBadge from '../_components/type-badge';

export const TRANSACTION_CATEGORY_LABEL = {
	HOUSING: 'Moradia',
	FOOD: 'Alimentação',
	TRANSPORT: 'Transporte',
	ENTERTAINMENT: 'Entretenimento',
	HEALTH: 'Saúde',
	UTILITIES: 'Utilidade',
	SALARY: 'Salário',
	EDUCATION: 'Educação',
	OTHER: 'Outros',
};

export const TRANSACTION_PAYMENT_METHOD_LABEL = {
	CREDIT_CARD: 'Cartão de crédito',
	DEBIT_CARD: 'Cartão de débito',
	BANK_TRANSFER: 'Transferência bancária',
	BANK_SLIP: 'Boleto',
	CASH: 'Dinheiro',
	PIX: 'Pix',
	OTHER: 'Outros',
};

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
		cell: ({ row: { original: transaction } }) =>
			TRANSACTION_CATEGORY_LABEL[transaction.category],
	},
	{
		accessorKey: 'paymentMethod',
		header: 'Método de pagamento',
		cell: ({ row: { original: transaction } }) =>
			TRANSACTION_PAYMENT_METHOD_LABEL[transaction.paymentMethod],
	},
	{
		accessorKey: 'date',
		header: 'Data',
		cell: ({ row: { original: transaction } }) =>
			new Date(transaction.date).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
	},
	{
		accessorKey: 'amount',
		header: 'Valor',
		cell: ({ row: { original: transaction } }) =>
			new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}).format(Number(transaction.amount)),
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: () => {
			return (
				<div className='space-x-1'>
					<Button variant="ghost" size="icon" className='text-muted-foreground'>
						<PencilIcon />
					</Button>
					<Button variant="ghost" size="icon" className='text-muted-foreground'>
						<TrashIcon />
					</Button>
				</div>
			);
		},
	},
];
