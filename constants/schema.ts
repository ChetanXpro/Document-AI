import { z } from 'zod'
import { DocumentKeys, DocumentSchemas } from '../types/documentTypes'

// This is a schema for W2 document , you can add all the details you want to extract from the document
const W2 = {
	SchemaName: 'W2',
	Schema: z.object({
		employer: z.string(),
		employerAddress: z.string(),
		employee: z.string(),
		employeeAddress: z.string(),
	}),
}

const INT = {
	SchemaName: '1099 INT',
	Schema: z.object({
		accoundNumber: z.string(),
		payersTin: z.string(),
		payerName: z.string(),
	}),
}

// Here we have maping of document type to document object
export const docsJson: DocumentSchemas = {
	W2: W2.Schema,
	'1099 INT': INT.Schema,
}

export const docsEnum = Object.keys(docsJson) as DocumentKeys[]
