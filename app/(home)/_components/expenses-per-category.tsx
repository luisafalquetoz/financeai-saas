import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Progress } from '@/app/_components/ui/progress';
import { ScrollArea } from '@/app/_components/ui/scroll-area';
import { TRANSACTION_CATEGORY_LABEL } from '@/app/_constants/transactions';
import { TotalExpensePerCategory } from '@/app/_data/get-dashboard/types';

interface ExpensesPerCategoryProps {
	expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
	expensesPerCategory,
}: ExpensesPerCategoryProps) => {
	return (
		// biome-ignore lint/nursery/useSortedClasses: <explanation>
		<ScrollArea className="border col-span-2 h-full pb-6 rounded-md">
			<CardHeader>
				<CardTitle className="font-bold">Gastos por categoria</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{expensesPerCategory.map((category) => (
					<div key={category.category} className="space-y-2">
						<div className="flex w-full justify-between">
							<p className="font-bold text-sm">
								{TRANSACTION_CATEGORY_LABEL[category.category]}
							</p>
							<p className="font-bold text-sm">{category.percentageOfTotal}%</p>
						</div>
						<Progress value={category.percentageOfTotal} />
					</div>
				))}
			</CardContent>
		</ScrollArea>
	);
};

export default ExpensesPerCategory;
