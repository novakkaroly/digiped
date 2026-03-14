#!/usr/bin/env python3
"""Backend server for the DigiPed ÓVÓ course – handles quiz result emails."""
import asyncio
import json
import os
from datetime import datetime

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


class QuizResult(BaseModel):
    student_name: str
    neptun_code: str
    score: int
    total: int
    percentage: float
    answers: list
    timestamp: str


async def call_tool(source_id, tool_name, arguments):
    proc = await asyncio.create_subprocess_exec(
        "external-tool", "call", json.dumps({
            "source_id": source_id, "tool_name": tool_name, "arguments": arguments,
        }),
        stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate()
    if proc.returncode != 0:
        raise RuntimeError(stderr.decode())
    return json.loads(stdout.decode())


@app.post("/api/submit-quiz")
async def submit_quiz(result: QuizResult):
    # Build email body
    grade = ""
    if result.percentage >= 85:
        grade = "Jeles (5)"
    elif result.percentage >= 70:
        grade = "Jó (4)"
    elif result.percentage >= 55:
        grade = "Közepes (3)"
    elif result.percentage >= 40:
        grade = "Elégséges (2)"
    else:
        grade = "Elégtelen (1)"

    answers_text = ""
    for i, a in enumerate(result.answers, 1):
        status = "HELYES" if a.get("correct") else "HELYTELEN"
        answers_text += f"\n{i}. kerdes: {a.get('question', '')}\n"
        answers_text += f"   Valasz: {a.get('selected', '')}\n"
        answers_text += f"   Helyes valasz: {a.get('correctAnswer', '')}\n"
        answers_text += f"   Eredmeny: {status}\n"

    body = f"""DigiPed OVO - Online ertekeles eredmenye
{'='*50}

Hallgato neve: {result.student_name}
Neptun kod: {result.neptun_code}
Datum: {result.timestamp}

Eredmeny: {result.score}/{result.total} ({result.percentage:.1f}%)
Erdemjegy: {grade}

{'='*50}
RESZLETES VALASZOK:
{answers_text}
{'='*50}
Ez egy automatikus uzenet a DigiPed OVO online kurzus rendszerebol.
"""

    subject = f"DigiPed OVO - Ertekeles: {result.student_name} ({result.neptun_code}) - {result.score}/{result.total}"

    try:
        await call_tool("gcal", "send_email", {
            "action": "send",
            "to": ["novak.karoly71@gmail.com"],
            "subject": subject,
            "body": body,
            "in_reply_to": None,
        })
        return {"success": True, "message": "Az eredmeny sikeresen elkuldve!", "grade": grade}
    except Exception as e:
        print(f"Email send error: {e}")
        return {"success": False, "message": f"Hiba tortent: {str(e)}", "grade": grade}


@app.get("/api/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
