import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Navbar from '../_components/navbar';
import DateSelect from './_components/date-select';
import SummaryCards from './_components/summary-cards';
import { isMatch } from 'date-fns';

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

	const monthIsValid = !month || !isMatch(month, 'MM')
	if (monthIsValid) {
		redirect('?month=01');
	}

	return (
		<>
			<Navbar />
			<div className="space-y-6 p-6">
				<div className="flex justify-between">
					<h1 className="font-bold text-2xl">Dashboard</h1>
					<DateSelect />
				</div>
				<SummaryCards month={month} />
			</div>
		</>
	);
};

export default Home;
