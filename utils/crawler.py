import os
import requests
from bs4 import BeautifulSoup

def download_pdfs_from_html(url, download_folder='./data/raw/pdf_downloads'):
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    # Fetch the HTML content of the URL
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all <a> tags with href ending in '.pdf'
    pdf_links = [a['href'] for a in soup.find_all('a', href=True) if a['href'].lower().endswith('.pdf')]

    if not pdf_links:
        print("No PDF links found on the page.")
        return

    # Download each PDF
    for link in pdf_links:
        try:
            # If the link is relative, convert it to an absolute URL
            if not link.startswith('http'):
                link = requests.compat.urljoin(url, link)

            pdf_name = os.path.join(download_folder, link.split('/')[-1])

            # Download the PDF
            print(f"Downloading {link}...")
            pdf_response = requests.get(link)
            if pdf_response.status_code == 200:
                with open(pdf_name, 'wb') as pdf_file:
                    pdf_file.write(pdf_response.content)
                print(f"Downloaded: {pdf_name}")
            else:
                print(f"Failed to download {link}. Status code: {pdf_response.status_code}")
        except Exception as e:
            print(f"Error downloading {link}: {e}")

#  You need to initially crawl every ENDPOINTS in the LIST ( from Clerk UI DB )
urls = [
    'https://www.dgft.gov.in/CP/',
    'https://www.dgft.gov.in/CP/?opt=RoDTEP' 
]

for url in urls:
    download_pdfs_from_html(url)