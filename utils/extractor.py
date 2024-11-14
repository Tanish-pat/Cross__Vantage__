import pdfplumber
from pathlib import Path
import os

def extract_text_from_pdf(pdf_path):
    try:
        # Convert the path to Path object
        pdf_path = Path(pdf_path)
        
        if not pdf_path.exists():
            raise FileNotFoundError(f"PDF file not found: {pdf_path}")
        
        with pdfplumber.open(pdf_path) as pdf:
            full_text = pdf.pages[0].extract_text()
            for page in pdf.pages[1:]:
                full_text += "\n" + page.extract_text()
        
        output_dir = Path("data") / "processed" / "Constraints"
        output_dir.mkdir(parents=True, exist_ok=True)
        output_path = output_dir / f"{pdf_path.stem}.txt"
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(full_text)
        
        print(f"Saved text from {pdf_path.name} to {output_path}")
    
    except Exception as e:
        print(f"Error processing PDF: {str(e)}")

def main():
    script_dir = Path(__file__).parent
    
    pdf_folder = script_dir / "data" / "raw" / "pdf_downloads"
    
    if not pdf_folder.exists():
        print(f"The '{pdf_folder}' folder does not exist. Please create it and place the PDF files there.")
        return
    
    for pdf_file in pdf_folder.glob("*.pdf"):
        print(f"Extracting text from {pdf_file.name}...")
        extract_text_from_pdf(pdf_file)
    
    print("\nFinished extracting text from all PDF files.")

if __name__ == "__main__":
    main()