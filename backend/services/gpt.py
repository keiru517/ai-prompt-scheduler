import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def send_prompt(prompt_text: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt_text}],
    )
    return response['choices'][0]['message']['content']
