from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import requests
from PIL import Image, ImageDraw, ImageFont
from transformers import BlipProcessor, BlipForConditionalGeneration
import torch
import textwrap
import os
import io

# Initialize FastAPI app
app = FastAPI()

# CORS setup
origins = [
    "http://localhost",  # Example for local frontend
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load processor and model
processor = BlipProcessor.from_pretrained("noamrot/FuseCap")
model = BlipForConditionalGeneration.from_pretrained("noamrot/FuseCap").to(device)

# Upload folder configuration
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# PostgreSQL connection configuration
db_config = {
    "dbname": "image_database",
    "user": "postgres",  # Replace with your PostgreSQL username
    "password": "#Amol@22",  # Replace with your PostgreSQL password
    "host": "localhost",
    "port": 5432
}

# Function to generate caption and save image details to PostgreSQL
def process_and_store_image(image_path_or_url):
    if image_path_or_url.startswith("http"):
        raw_image = Image.open(requests.get(image_path_or_url, stream=True).raw).convert('RGB')
    else:
        raw_image = Image.open(image_path_or_url).convert("RGB")

    # Generate caption
    text = "a picture of "
    inputs = processor(raw_image, text, return_tensors="pt").to(device)
    out = model.generate(**inputs, num_beams=3)
    caption = processor.decode(out[0], skip_special_tokens=True)

    print("Generated Caption: ", caption)

    # Display the caption on the image
    draw = ImageDraw.Draw(raw_image)

    try:
        font_path = "arial.ttf"  # Ensure you have a valid font file path
        font_size = 25
        font = ImageFont.truetype(font_path, font_size)
    except IOError:
        font = ImageFont.load_default()
        font_size = 25

    image_width, image_height = raw_image.size
    max_width = image_width - 20
    wrapped_caption = "\n".join(textwrap.wrap(caption, width=int(max_width / font_size * 1.8)))

    lines = wrapped_caption.split("\n")
    text_height = len(lines) * (font_size + 5)

    x = 10
    y = 10
    rectangle_height = text_height + 10
    draw.rectangle([(x - 10, y - 5), (image_width - 10, y + rectangle_height)], fill=(0, 0, 0, 128))

    for i, line in enumerate(lines):
        draw.text((x, y + i * (font_size + 5)), line, fill="white", font=font)

    # Save the updated image
    saved_image_path = os.path.join(UPLOAD_FOLDER, "captioned_" + os.path.basename(image_path_or_url))
    raw_image.save(saved_image_path)

    # Get image details
    image_size = f"{image_width}x{image_height}"
    file_name = os.path.basename(image_path_or_url)

    # Store image details and caption in PostgreSQL database
    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO images (file_name, caption, size, file_path) VALUES (%s, %s, %s, %s)",
            (file_name, caption, image_size, saved_image_path)
        )
        conn.commit()
        cursor.close()
        conn.close()
    except psycopg2.Error as err:
        print(f"Error saving to database: {err}")

    return caption, saved_image_path

# FastAPI POST endpoint to upload and process an image
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file part in the request")

    try:
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Process the image and store details in PostgreSQL
        caption, saved_image_path = process_and_store_image(file_path)

        return JSONResponse(content={'message': 'File successfully uploaded and processed',
                                     'caption': caption,
                                     'saved_image_path': saved_image_path}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the file: {str(e)}")

# Running the app with Uvicorn (this part would typically be done in the terminal)
# uvicorn app:app --reload