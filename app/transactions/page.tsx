import AddTransactionButton from '../_components/add-transaction-button';
import Navbar from '../_components/navbar';
import { DataTable } from '../_components/ui/data-table';
import { db } from '../_lib/prisma';
import { transactionColumns } from './_columns';

const TransactionsPage = async () => {
	const transactions = await db.transaction.findMany({});
	return (
		<>
			<Navbar />
			<div className="space-y-6 p-6">
				<div className="flex w-full items-center justify-between p-6">
					<h1 className="font-bold text-2xl">Transações</h1>
					<AddTransactionButton />
				</div>
				<DataTable columns={transactionColumns} data={transactions} />
			</div>
		</>
	);
};

export default TransactionsPage;
