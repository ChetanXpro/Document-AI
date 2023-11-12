from langchain.chat_models import ChatOpenAI
from langchain.chains import create_extraction_chain
from dotenv import load_dotenv
from langchain.document_loaders import PyPDFLoader
import json

load_dotenv()

# Schema
schema = {
    "properties": {
        "pdfType": {"type": "string"},
        "name": {"type": "string"},
        "email": {"type": "string"},
        "skills": {"type": "array", "items": {"type": "string"}},
    
    },
    "required": ["name", "email","pdfType","skills"],
}


# Load documents for processing
loader = PyPDFLoader("sample_resume.pdf")
documents = loader.load()

# Run chain
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
chain = create_extraction_chain(schema, llm)
response=chain.run(documents)[0]


json_object = json.dumps(response , indent=4)


 
# Writing to sample.json
with open("sample.json", "w") as outfile:
    outfile.write(json_object)