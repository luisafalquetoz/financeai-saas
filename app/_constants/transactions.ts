import {
	TransactionCategory,
	TransactionPaymentMethod,
	TransactionType,
} from '@prisma/client';

export const TRANSACTION_CATEGORY_LABEL = {
	HOUSING: 'Moradia',
	FOOD: 'Alimentação',
	TRANSPORT: 'Transporte',
	ENTERTAINMENT: 'Entretenimento',
	HEALTH: 'Saúde',
	UTILITIES: 'Utilidade',
	SALARY: 'Salário',
	EDUCATION: 'Educação',
	OTHER: 'Outros',
};

export const TRANSACTION_PAYMENT_METHOD_LABEL = {
	CREDIT_CARD: 'Cartão de crédito',
	DEBIT_CARD: 'Cartão de débito',
	BANK_TRANSFER: 'Transferência bancária',
	BANK_SLIP: 'Boleto',
	CASH: 'Dinheiro',
	PIX: 'Pix',
	OTHER: 'Outros',
};

export const TRANSACTION_TYPE_OPTIONS = [
	{
		value: TransactionType.EXPENSE,
		label: 'Despesa',
	},
	{
		value: TransactionType.DEPOSIT,
		label: 'Entrada',
	},
	{
		value: TransactionType.INVESTMENT,
		label: 'Investimento',
	},
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
	{
		value: TransactionPaymentMethod.BANK_TRANSFER,
		label:
			TRANSACTION_PAYMENT_METHOD_LABEL[TransactionPaymentMethod.BANK_TRANSFER],
	},
	{
		value: TransactionPaymentMethod.BANK_SLIP,
		label: TRANSACTION_PAYMENT_METHOD_LABEL[TransactionPaymentMethod.BANK_SLIP],
	},
	{
		value: TransactionPaymentMethod.CASH,
		label: TRANSACTION_PAYMENT_METHOD_LABEL[TransactionPaymentMethod.CASH],
	},
	{
		value: TransactionPaymentMethod.CREDIT_CARD,
		label:
			TRANSACTION_PAYMENT_METHOD_LABEL[TransactionPaymentMethod.CREDIT_CARD],
	},
	{
		value: TransactionPaymentMethod.DEBIT_CARD,
		label:
			TRANSACTION_PAYMENT_METHOD_LABEL[TransactionPaymentMethod.DEBIT_CARD],
	},
	{
		value: TransactionPaymentMethod.OTHER,
		label: TRANSACTION_PAYMENT_METHOD_LABEL[TransactionPaymentMethod.OTHER],
	},
	{
		value: TransactionPaymentMethod.PIX,
		label: TRANSACTION_PAYMENT_METHOD_LABEL[TransactionPaymentMethod.PIX],
	},
];

export const TRANSACTION_CATEGORY_OPTIONS = [
	{
		value: TransactionCategory.EDUCATION,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.EDUCATION],
	},
	{
		value: TransactionCategory.ENTERTAINMENT,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.ENTERTAINMENT],
	},
	{
		value: TransactionCategory.FOOD,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.FOOD],
	},
	{
		value: TransactionCategory.HEALTH,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.HEALTH],
	},
	{
		value: TransactionCategory.HOUSING,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.HOUSING],
	},
	{
		value: TransactionCategory.OTHER,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.OTHER],
	},
	{
		value: TransactionCategory.SALARY,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.SALARY],
	},
	{
		value: TransactionCategory.TRANSPORT,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.TRANSPORT],
	},
	{
		value: TransactionCategory.UTILITIES,
		label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.UTILITIES],
	},
];
