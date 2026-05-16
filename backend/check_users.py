import asyncio
from sqlalchemy.future import select
from app.db.session import engine
from app.models.sales import User

async def main():
    async with engine.connect() as conn:
        result = await conn.execute(select(User.email, User.plan).where(User.email.in_(['aajay1118@gmail.com', 'leonraj1997@gmail.com'])))
        users = result.fetchall()
        for u in users:
            print(f"Email: {u.email}, Plan: {u.plan}")

if __name__ == "__main__":
    asyncio.run(main())
