from twilio.rest import Client
import os

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_from_number = "whatsapp:+14155238886"

client = Client(account_sid, auth_token)

def send_message(to: str, message: str):
    client.messages.create(
        body=message,
        from_=twilio_from_number,
        to=f"whatsapp:{to}"
    )
