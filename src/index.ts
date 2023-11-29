import { docsEnum, docsJson } from '../constants/schema'
import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import { DocumentKeys } from '../types/documentTypes'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { HumanMessage } from 'langchain/schema'

import { createExtractionChainFromZod } from 'langchain/chains'
import { z } from 'zod'

import { PDFLoader } from 'langchain/document_loaders/fs/pdf'

type DocumentSchemas = {
	[K in DocumentKeys]: z.ZodObject<any>
}

const loadDocument = async (documentPath: string) => {
	const loader = new PDFLoader(documentPath, {
		splitPages: false,
	})

	const docs = await loader.load()

	return docs
}

const findDocumentType = async (docs: { pageContent: string }[]): Promise<string | undefined> => {
	try {
		const parser = new JsonOutputFunctionsParser()
		const extractionFunctionSchema = {
			name: 'extractor',
			description: 'Extracts fields from the input.',
			parameters: {
				type: 'object',
				properties: {
					documentType: {
						type: 'string',
						enum: docsEnum,
						description: 'Document type',
					},
				},
				required: ['documentType'],
			},
		}

		// gpt-4 is must
		const model = new ChatOpenAI({ modelName: 'gpt-4', temperature: 0 })

		const runnable: any = model
			.bind({
				functions: [extractionFunctionSchema],
				function_call: { name: 'extractor' },
			})
			.pipe(parser)

		const result = await runnable.invoke([
			new HumanMessage(
				`
        Document is defined between three stars

        ***

        ${docs[0].pageContent}

        ***
        `
			),
		])

		return result.documentType
	} catch (error) {
		console.error('Error in finding document type:', error)
		return undefined
	}
}

const extractData = async (documentType: string, docs: { pageContent: string }[]) => {
	try {
		if (!documentType) {
			console.error('Document type is not defined')
			return undefined
		}

		const chatModel = new ChatOpenAI({
			modelName: 'gpt-4',
			temperature: 0,
		})

		const schema = docsJson[documentType as DocumentKeys]

		if (schema) {
			const chain = createExtractionChainFromZod(schema, chatModel)

			const data = await chain.run(docs[0].pageContent)

			return data
		} else {
			console.log('extractData: No schema found')
		}
	} catch (error) {
		console.log(error)
		console.log('extractData: Error in parsing the document')
	}
}

// Final function
const run = async () => {
	// 1. Load the document
	const loadDocumentStart = Date.now()
	const docs = await loadDocument('./W22.pdf')
	const loadDocumentEnd = Date.now()
	console.log(`loadDocument Time: ${((loadDocumentEnd - loadDocumentStart) / 1000).toFixed(2)} s`)

	// 2. Find the document type
	const findDocumentTypeStart = Date.now()
	const documentType = await findDocumentType(docs)
	const findDocumentTypeEnd = Date.now()
	console.log(`findDocumentType Time: ${((findDocumentTypeEnd - findDocumentTypeStart) / 1000).toFixed(2)} s`)

	if (!documentType) {
		console.log('Document type not found')
		return
	}

	console.log('Document type:', documentType)

	// 3. Extract the data
	const extractDataStart = Date.now()
	const extractedData = await extractData(documentType, docs)

	if (!extractedData) {
		console.log('extractedData not found')
		return
	}

	const extractDataEnd = Date.now()
	console.log(extractedData)
	console.log(`extractData Time: ${((extractDataEnd - extractDataStart) / 1000).toFixed(2)} s`)
}

// test how much time it takes in seconds to run the whole script
const start = Date.now()
run().then(() => {
	const end = Date.now()
	console.log('Total Time taken in seconds:', (end - start) / 1000)
})
