import os
import boto3
import pdfplumber
from pathlib import Path


s3 = boto3.client("s3")

def extract_text_from_pdf(pdf_bytes, output_file_name):
    """
    Extracts text from a PDF given its byte content.
    """
    try:
        with pdfplumber.open(pdf_bytes) as pdf:
            full_text = pdf.pages[0].extract_text()
            for page in pdf.pages[1:]:
                full_text += "\n" + page.extract_text()
        
        return full_text
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")

def lambda_handler(event, context):
    try:
        
      
        output_bucket = os.getenv("OUTPUT_BUCKET")
        output_folder = os.getenv("OUTPUT_FOLDER") 

        
        for record in event["Records"]:
            key = record["s3"]["object"]["key"]
            bucket_name = record["s3"]["bucket"]["name"]

            
            if not key.lower().endswith(".pdf"):
                print(f"Skipping non-PDF file: {key}")
                continue

            print(f"Processing PDF file: {key}")

           
            pdf_object = s3.get_object(Bucket=bucket_name, Key=key)
            pdf_bytes = pdf_object["Body"].read()

            
            extracted_text = extract_text_from_pdf(pdf_bytes, key)

           
            output_key = f"{output_folder}{Path(key).stem}.txt"

          
            s3.put_object(
                Bucket=output_bucket,
                Key=output_key,
                Body=extracted_text,
                ContentType="text/plain"
            )

            print(f"Saved extracted text to s3://{output_bucket}/{output_key}")
        
        return {"statusCode": 200, "body": "PDFs processed successfully!"}

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": str(e)}
