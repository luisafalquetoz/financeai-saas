import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog';
import { Button } from '@/app/_components/ui/button';
import { TrashIcon } from 'lucide-react';
import { deleteTransaction } from '../_actions/delete-transaction';
import { toast } from 'sonner';

interface DeleteTransactionButtonProps {
	transactionId: string;
}

const DeleteTransactionButton = ({
	transactionId,
}: DeleteTransactionButtonProps) => {

    const handleConfirmDeleteClick = async () => {
		try {
			await deleteTransaction({ transactionId });
            toast.success('Transação excluída com sucesso!');
		} catch (error) {
			console.error(error);
            toast.error('Ocorreu um erro ao excluir a transação.');
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" size="icon" className="text-muted-foreground">
					<TrashIcon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Você deseja realmente excluir essa transação?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirmDeleteClick}>Excluir</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteTransactionButton;
