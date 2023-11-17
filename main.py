from langchain.chat_models import ChatOpenAI
from langchain.chains import create_extraction_chain
from dotenv import load_dotenv
from langchain.document_loaders import PyPDFLoader
import json

load_dotenv()


def extract_resume():
    # Schema
    schema = {
        "properties": {
            "pdfType": {"type": "string"},
            "name": {"type": "string"},
            "email": {"type": "string"},
            "skills": {"type": "array", "items": {"type": "string"}},
        },
        "required": ["name", "email", "pdfType", "skills"],
    }
    # Schema to extract some details from W2 form
    # schema = {
    #     "properties": {
    #         "DocumentClassification": {"type": "string"},
    #         "employer": {"type": "string"},
    #         "employee": {"type": "string"},
    #         "wages": {"type": "string"},
    #         "socialSecurityWages": {"type": "string"},
    #         "socialSecurityTax": {"type": "string"},
    #         "medicareWages": {"type": "string"},
    #         "medicareTax": {"type": "string"},
    #     },
    #     "required": [
    #         "DocumentClassification",
    #         "employer",
    #         "employee",
    #         "wages",
    #         "socialSecurityWages",
    #         "socialSecurityTax",
    #         "medicareWages",
    #         "medicareTax",
    #     ],
    # }
    # Load documents for processing
    loader = PyPDFLoader("sample_resume.pdf")
    documents = loader.load()

    with open("sample.txt", "w") as outfile:
        outfile.write(str(documents[0].page_content))

    return

    # Run chain
    llm = ChatOpenAI(
        temperature=0,
        model="gpt-4",
    )
    chain = create_extraction_chain(schema, llm)
    response = chain.run(documents)[0]

    json_object = json.dumps(response, indent=4)

    # Writing to sample.json
    with open("sample.json", "w") as outfile:
        outfile.write(json_object)


if __name__ == "__main__":
    extract_resume()
