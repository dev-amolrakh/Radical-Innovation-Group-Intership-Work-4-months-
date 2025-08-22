import speech_recognition as sr

def voice_to_text():
    # Initialize recognizer
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Please speak something...")
        # Adjust for ambient noise
        recognizer.adjust_for_ambient_noise(source)
        audio_data = recognizer.listen(source)

    try:
        # Convert audio to text
        text = recognizer.recognize_google(audio_data)
        print("You said:", text)
        return text
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
    except sr.RequestError:
        print("Could not request results; check your internet connection.")
    return None

# Voice to Text
spoken_text = voice_to_text()

