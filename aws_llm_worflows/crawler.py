import os
import boto3
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

s3 = boto3.client('s3')

MONGO_URI       = os.getenv('MONGO_URI')  
DB_NAME         = os.getenv('DB_NAME')
COLLECTION_NAME = os.getenv('COLLECTION_NAME')
BUCKET_S3_URI   = os.getenv('S3_URI') 

def download_pdfs_from_html(url, bucket_name):
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return

    soup = BeautifulSoup(response.content, 'html.parser')

    pdf_links = [a['href'] for a in soup.find_all('a', href=True) if a['href'].lower().endswith('.pdf')]

    if not pdf_links:
        print("No PDF links found on the page.")
        return

    for link in pdf_links:
        try:
            # If the link is relative, convert it to an absolute URL
            if not link.startswith('http'):
                link = requests.compat.urljoin(url, link)

            pdf_name = link.split('/')[-1]

            # Download the PDF
            print(f"Downloading {link}...")
            pdf_response = requests.get(link)
            if pdf_response.status_code == 200:

                # Upload to S3
                s3.put_object(
                    Bucket=bucket_name,
                    Key=f"pdfs/{pdf_name}",
                    Body=pdf_response.content,
                    ContentType='application/pdf'
                )

                print(f"Uploaded to S3: {bucket_name}/pdfs/{pdf_name}")
            else:
                print(f"Failed to download {link}. Status code: {pdf_response.status_code}")
        except Exception as e:
            print(f"Error downloading {link}: {e}")


def fetch_urls_from_mongo():
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]

        # Fetch URLs from MongoDB
        urls = [doc['url'] for doc in collection.find({}, {'url': 1})]
        return urls
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return []


def lambda_handler(event, context):
    urls = fetch_urls_from_mongo()

    if not urls:
        print("No URLs found in MongoDB.")
        return {
            'statusCode': 400,
            'body': 'No URLs found in MongoDB.'
        }

    # Process each URL
    for url in urls:
        print(f"Processing URL: {url}")
        download_pdfs_from_html(url, BUCKET_S3_URI)

    return {
        'statusCode': 200,
        'body': 'PDF download completed.'
    }
