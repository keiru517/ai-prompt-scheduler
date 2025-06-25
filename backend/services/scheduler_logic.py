from sqlalchemy.orm import Session
from datetime import datetime
from services import gpt, whatsapp
from sqlalchemy import and_
import pytz

import models

def process_due_prompts(db: Session):
    print("process_due_prompt...............")
    now = datetime.now(pytz.timezone("Asia/Tokyo"))
    current_time = now.time().replace(second=0, microsecond=0)
    current_weekday = now.strftime("%a")  # 'Mon', 'Tue', etc.
    print(f"🔍 Current time: {current_time}, weekday: {current_weekday}")

    prompts = (
        db.query(
            models.Prompt
        )
        .filter(
            models.Prompt.is_active == True
        )
        .all()
    )

    print(f"📦 Checking {len(prompts)} prompts in DB")

    for prompt in prompts:
        print(f"🔍 Scheduler_time: {prompt.schedule_time.replace(second=0, microsecond=0)}, current: {current_time}")
        if prompt.schedule_time.replace(second=0, microsecond=0) != current_time:
            continue

        should_send = False
        if prompt.schedule_frequency == "daily":
            should_send = True
        elif prompt.schedule_frequency == "weekly":
            if prompt.schedule_week_day and current_weekday in prompt.schedule_week_day:
                should_send = True

        if should_send:
            print(f"📤 Sending prompt: {prompt.title}")

            # result = gpt.send_prompt(prompt.prompt)
            recipients = (
                db.query(
                    models.PromptRecipient
                )
                .filter(
                    models.PromptRecipient.prompt_id == prompt.id
                )
                .all()
            )

            for r in recipients:
                recipient = (
                    db.query(
                        models.User
                    )
                    .filter(
                        models.User.id == r.id
                    )
                    .first()
                )
                print(f"📤 Sending prompt: {recipient.phone_number}")
                print ("Content: test prompt")

                # whatsapp.send_message(recipient.phone_number, result)