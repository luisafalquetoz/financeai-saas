import { auth, clerkClient } from '@clerk/nextjs/server';
import { isMatch } from 'date-fns';
import { redirect } from 'next/navigation';
import Navbar from '../_components/navbar';
import { canUserAddTransaction } from '../_data/can-user-add-transaction';
import { getDashboard } from '../_data/get-dashboard';
import AiReportButton from './_components/ai-report-button';
import DateSelect from './_components/date-select';
import ExpensesPerCategory from './_components/expenses-per-category';
import LastTransactions from './_components/last-transactions';
import SummaryCards from './_components/summary-cards';
import TransactionsPieChart from './_components/transactions-pie-chart';

interface HomeProps {
	searchParams: {
		month: string;
	};
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
	const { userId } = await auth();
	if (!userId) {
		redirect('/login');
	}

	const monthIsValid = !month || !isMatch(month, 'MM');
	if (monthIsValid) {
		redirect(`?month=${new Date().getMonth() + 1}`);
	}

	const dashboard = await getDashboard(month);
	const userCanAddTransaction = await canUserAddTransaction();
	const user = await clerkClient().users.getUser(userId);

	return (
		<>
			<Navbar />
			<div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
				<div className="flex justify-between">
					<h1 className="font-bold text-2xl">Dashboard</h1>
					<div className="flex items-center gap-3">
						<AiReportButton month={month} hasPremiumPlan={user.publicMetadata.subscriptionPlan === 'premium'} />
						<DateSelect />
					</div>
				</div>
				<div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
					<div className="flex flex-col gap-6 overflow-hidden">
						<SummaryCards
							month={month}
							{...dashboard}
							userCanAddTransaction={userCanAddTransaction}
						/>
						<div className="grid h-full grid-cols-3 grid-rows-1 gap-6 ">
							<TransactionsPieChart {...dashboard} />
							<ExpensesPerCategory
								expensesPerCategory={dashboard.totalExpensePerCategory}
							/>
						</div>
					</div>
					<LastTransactions lastTransactions={dashboard.lastTransactions} />
				</div>
			</div>
		</>
	);
};

export default Home;
