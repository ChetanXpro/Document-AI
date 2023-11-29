import { z } from 'zod'

// Define all document types here
export type DocumentKeys = 'W2' | '1099 INT'

export type DocumentSchemas = {
	[K in DocumentKeys]: z.ZodObject<any>
}
