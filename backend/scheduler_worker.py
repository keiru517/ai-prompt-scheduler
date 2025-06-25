from apscheduler.schedulers.blocking import BlockingScheduler
from sqlalchemy.orm import Session

from services.scheduler_logic import process_due_prompts
from database import get_db

scheduler = BlockingScheduler()

@scheduler.scheduled_job("cron", minute="*")
def run_scheduler():
    print("⏰ Checking due prompts...")

    db_gen = get_db()
    db = next(db_gen) 
    
    try:
        process_due_prompts(db)
    finally:
        db.close()

if __name__ == "__main__":
    print("🔁 Scheduler worker started.")
    scheduler.start()
