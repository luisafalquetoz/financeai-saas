'use client';

import { ArrowDownUpIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip';
import UpsertTransactionDiaolog from './upsert-transaction-dialog';

interface AddTransactionButtonProps {
	userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
	userCanAddTransaction,
}: AddTransactionButtonProps) => {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="rounded-full font-bold"
							onClick={() => setDialogIsOpen(true)}
							disabled={!userCanAddTransaction}
						>
							Adicionar transação
							<ArrowDownUpIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						{!userCanAddTransaction &&
							'Você atingiu o limite de transações. Atulize seu plano para fazer transações ilimitadas.'}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<UpsertTransactionDiaolog
				isOpen={dialogIsOpen}
				setIsOpen={setDialogIsOpen}
			/>
		</>
	);
};

export default AddTransactionButton;
