from gtts import gTTS
import os

import vtt

def text_to_voice(text, language="en"):
    # Initialize gTTS and save to a file
    tts = gTTS(text=text, lang=language, slow=False)
    tts.save("output.mp3")
    print("Text has been converted to voice and saved as 'output.mp3'")

    # Play the audio file
    os.system("start output.mp3")  # Use "afplay output.mp3" on macOS, or "xdg-open output.mp3" on Linux

spoken_text = vtt.voice_to_text()
if spoken_text:
    text_to_voice(spoken_text)