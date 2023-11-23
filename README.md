# PDF Data Extractor

PDF Data Extractor is a Python utility that lets users extract data from any PDF files. The user simply needs to define a schema that provides a structure for the data to be extracted.

 - For javascript implementation of this project checkout to `feat/javascript-implementation`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need Python installed on your system to run this program.

### Setup

1. Clone this repo to your local system.
2. Install the required dependencies using pip.
3. You need to define an environment variable named OPENAI_API_KEY in a .env file. Make sure to set the correct OpenAI API Key as the value of this variable.

### Usage

Define the schema for the data you're looking to extract from the PDF file. Here's an example:

```python
schema = {
    "properties": {
        "pdfType": {"type": "string"},
        "name": {"type": "string"},
        "email": {"type": "string"},
        "skills": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["name", "email","pdfType","skills"],
}
```

The function extract_resume(), loads the PDF document for processing, runs the extraction chain, and writes the extracted data to sample.json file.
``` bash
if __name__ == "__main__":
    extract_resume()
```
