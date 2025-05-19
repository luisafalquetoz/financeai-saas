import { ReactNode } from 'react';

interface PercentageItemProps {
	icon: ReactNode;
	title: string;
	value: number;
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-white bg-opacity-[3%] p-2">{icon}</div>
				<p className="text-muted-foreground text-sm">{title}</p>
			</div>
			<p className="font-bold text-sm">{value}%</p>
		</div>
	);
};

export default PercentageItem;
