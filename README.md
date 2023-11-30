# Extract Data from PDF

This script extracts structured data from PDF files.

## Prerequisites

Before you run the script, make sure you have:

- `Node.js` installed on your machine
- An API key for `gpt-4`.

## Setup Instructions

- First, define all the possible document types in the `types/documentType.ts` file.
- Then, specify all the document schemas in the `constants/schema.ts` file.

- To configure the script to work with your `gpt-4` API key and any other settings, you'll need to set up environment variables:

Rename the provided `.example.env` file to `.env` in the root directory of the project:

```mv .example.env .env```



