'use client';

import { Button } from '@/app/_components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/_components/ui/dialog';
import { BotIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { generateAIReport } from '../_actions/generate-ai-report';
import { ScrollArea } from '@/app/_components/ui/scroll-area';
import Markdown from 'react-markdown';
import { set } from 'date-fns';
import Link from 'next/link';

interface AiReportButtonProps {
    hasPremiumPlan?: boolean;
	month: string;
} 

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
	const [report, setReport] = useState<string | null>(null);  
    const [reportIsLoading, setReportIsLoading] = useState(false);
	const handleGenerateReportClick = async () => {
		try {
            setReportIsLoading(true);
            const aiReport = await generateAIReport({ month });
            setReport(aiReport);
		} catch (error) {
			console.error(error);
		} finally {
            setReportIsLoading(false);
        }
	};

	return (
		<Dialog onOpenChange={(open) => {
            if (!open) {
                setReport(null);
            }
        }}>
			<DialogTrigger asChild>
				<Button variant="ghost">
					Relatório IA
					<BotIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[600px]'>
				{hasPremiumPlan ? (
                    <>
                    <DialogHeader>
					<DialogTitle>Relatório IA</DialogTitle>
					<DialogDescription>
						Use inteligência artificial para gerar um relatório com insights
						sobre suas finanças.
					</DialogDescription>
				</DialogHeader>
                <ScrollArea className='prose max-h-[600px] prose-h3:text-white prose-h4:text-white prose-strong:text-white text-white'>
                    <Markdown>{report}</Markdown>
                </ScrollArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost">Cancelar</Button>
					</DialogClose>
					<Button onClick={handleGenerateReportClick} disabled={reportIsLoading}>
                        {reportIsLoading && <Loader2Icon className='animate-spin' />}
                        Gerar Relatório
                    </Button>
				</DialogFooter>
                    </>
                ) : (
                    <>
                    <DialogHeader>
					<DialogTitle>Relatório IA</DialogTitle>
					<DialogDescription>
						Você precisa de um plano Premium para gerar relatórios com
                        IA.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost">Cancelar</Button>
					</DialogClose> 
					<Button asChild>
                        <Link href='/subscription'>
                        Assinar plano Premium
                        </Link>
                    </Button>
				</DialogFooter>
                    </>
                )}
			</DialogContent>
		</Dialog>
	);
};

export default AiReportButton;
