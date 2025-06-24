import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AddTransactionButton from '../_components/add-transaction-button';
import Navbar from '../_components/navbar';
import { DataTable } from '../_components/ui/data-table';
import { ScrollArea } from '../_components/ui/scroll-area';
import { db } from '../_lib/prisma';
import { transactionColumns } from './_columns';
import { canUserAddTransaction } from '../_data/can-user-add-transaction';

const TransactionsPage = async () => {
	const { userId } = await auth();
	if (!userId) {
		redirect('/login');
	}

	const transactions = await db.transaction.findMany({
		where: {
			userId,
		},
	}); 
	const userCanAddTransaction = await canUserAddTransaction();

	return (
		<>
			<Navbar /> 
			<div className="space-y-6 overflow-hidden p-6">
				<div className="flex w-full items-center justify-between p-6">
					<h1 className="font-bold text-2xl">Transações</h1>
					<AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
				</div>
				<ScrollArea className='h-[540px]'>
					<DataTable columns={transactionColumns} data={transactions} />
				</ScrollArea>
			</div>
		</>
	);
};

export default TransactionsPage;
