from fastapi import FastAPI

app = FastAPI(
    title="AI Smart Hotel",
    description="AI-powered hotel check-in system",
    version="0.1.0",
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}
