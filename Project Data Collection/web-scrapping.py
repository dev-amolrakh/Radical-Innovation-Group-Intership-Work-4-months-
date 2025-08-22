import requests
from bs4 import BeautifulSoup
from fpdf import FPDF
import os

# Define paths for both regular and bold font files
regular_font_path = os.path.join(os.getcwd(), "DejaVuSans.ttf")
bold_font_path = os.path.join(os.getcwd(), "DejaVuSans-Bold.ttf")

# Initialize FPDF with Unicode font support
pdf = FPDF()
pdf.add_page()

# Add regular and bold fonts
pdf.add_font("DejaVu", "", regular_font_path, uni=True)  # Regular font
pdf.add_font("DejaVu", "B", bold_font_path, uni=True)   # Bold font
pdf.set_font("DejaVu", size=12)

# Define the URL to scrape
url = "https://www.betterhealth.vic.gov.au/health/healthyliving/breakfast"  # Replace this with the target URL

# Send an HTTP request to the URL
response = requests.get(url)
response.raise_for_status()  # Check if the request was successful

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Function to add text with specified formatting
def add_text(text, style="regular"):
    if style == "heading":
        pdf.set_font("DejaVu", "B", 16)  # Bold for main headings
    elif style == "subheading":
        pdf.set_font("DejaVu", "B", 14)  # Bold for subheadings
    elif style == "list_item":
        pdf.set_font("DejaVu", size=12)  # Regular font for list items
        text = f"• {text}"  # Bullet point for list items
    else:
        pdf.set_font("DejaVu", size=12)  # Regular font for normal text

    # Add text with line breaks
    pdf.multi_cell(0, 10, text)
    pdf.ln(5)  # Add some space after each element

# Extract and add content to PDF based on HTML tags
for element in soup.find_all(['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li']):
    if element.name == 'h1':  # Main heading
        add_text(element.get_text(), style="heading")
    elif element.name == 'h2' or element.name == 'h3':  # Subheadings
        add_text(element.get_text(), style="subheading")
    elif element.name == 'p':  # Paragraphs
        add_text(element.get_text())
    elif element.name in ['ul', 'ol']:  # Lists
        # For each list item, print with list item style
        for list_item in element.find_all('li'):
            add_text(list_item.get_text(), style="list_item")

# Save the PDF
pdf.output("scraped_data.pdf")

print("Data scraped and saved to scraped_data.pdf")
