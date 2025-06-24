import { auth } from '@clerk/nextjs/server';
import { CheckIcon, XIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import Navbar from '../_components/navbar';
import { Card, CardContent, CardHeader } from '../_components/ui/card';
import { Button } from '../_components/ui/button';
import AcquirePlanButton from './_components/acquire-plan-button';

const SubscriptionPage = async () => {
	const { userId } = await auth();
	if (!userId) {
		redirect('/login');
	}

	return (
		<>
			<Navbar />
			<div className="space-y-6 p-6">
				<h1 className="font-bold text-2xl">Assinatura</h1>
				<div className="flex gap-6">
					<Card className="w-[450px]">
						<CardHeader className="border-b border-solid py-8">
							<h2 className="font-semiboldtext-center text-2xl">
								Plano Básico
							</h2>
							<div className="flex items-center justify-center gap-3">
								<span className="text-4xl">R$</span>
								<span className="font-semibold text-6xl">0</span>
								<div className="text-2xl text-muted-foreground">/mês</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-8 py-8">
							<div className="flex items-center gap-2">
								<CheckIcon className="text-primary" />
								<p>Apenas 10 transações por mês (7/10)</p>
							</div>
							<div className="flex items-center gap-2">
								<XIcon />
								<p>Relatórios de IA</p>
							</div>
						</CardContent>
					</Card>

					<Card className="w-[450px]">
						<CardHeader className="border-b border-solid py-8">
							<h2 className="font-semiboldtext-center text-2xl">
								Plano Premium
							</h2>
							<div className="flex items-center justify-center gap-3">
								<span className="text-4xl">R$</span>
								<span className="font-semibold text-6xl">19</span>
								<div className="text-2xl text-muted-foreground">/mês</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-8 py-8">
							<div className="flex items-center gap-2">
								<CheckIcon className="text-primary" />
								<p>Transações ilimitadas</p>
							</div>
							<div className="flex items-center gap-2">
								<CheckIcon className='text-primary'/>
								<p>Relatórios de IA</p>
							</div>
							<AcquirePlanButton />
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default SubscriptionPage;
