import { z } from 'zod'
import { DocumentKeys, DocumentSchemas } from '../types/documentTypes'

// These are some example how we need to define a document object for every document type
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

// !TODO - we need to define and add all the document types here
// For now i just added 2 example document types , and to prevent type error , i added same schema for all document types
export const docsJson: DocumentSchemas = {
	'Consolidated 1099': W2.Schema,
	W2: W2.Schema,
	'1099 INT': INT.Schema,
	'1099 DIV': W2.Schema,
	'W2 G': W2.Schema,
	'1099 G': W2.Schema,
	'1099 Q': W2.Schema,
	'SSA/RRB 1099': W2.Schema,
	'1099 MISC': W2.Schema,
	'1099 NEC': W2.Schema,
	'1099 K': W2.Schema,
	'Form 2439': W2.Schema,
	'1099 R': W2.Schema,
	'1099 SA': W2.Schema,
	'1098 E': W2.Schema,
	'Form 1098': W2.Schema,
	'1098 T': W2.Schema,
	'K 1': W2.Schema,
	'1095 A': W2.Schema,
	'1099 B': W2.Schema,
	'Old Tax Returns': W2.Schema,
	'Form 5498 SA': W2.Schema,
	'1099 A': W2.Schema,
	'1099 C': W2.Schema,
	'1099 S': W2.Schema,
	'1099 LTC': W2.Schema,
	'Charitable Donations': W2.Schema,
	'Non-Cash Donations': W2.Schema,
	'Brokerage Statement': W2.Schema,
}

export const docsEnum = Object.keys(docsJson) as DocumentKeys[]
