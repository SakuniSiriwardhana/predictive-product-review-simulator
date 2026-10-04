from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Predictive Product Review Simulator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://predictive-product-review-simulator-sigma.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is not set in the .env file")

client = Groq(api_key=api_key)


class ReviewRequest(BaseModel):
    product_idea: str
    persona: str


@app.get("/")
def home():
    return {
        "message": "Predictive Product Review Simulator Backend is running"
    }


@app.post("/generate-review")
async def generate_review(request: ReviewRequest):

    prompt = f"""
You are simulating feedback from a specific customer persona.

Product idea:
{request.product_idea}

Customer persona:
{request.persona}

Generate realistic simulated customer feedback.

Include:

1. Simulated review
2. Positive points
3. Negative points / pain points
4. Purchase interest from 1 to 5
5. Overall sentiment: Positive, Neutral, or Negative

Do not claim that this is real customer data.
Make the response realistic and easy to understand.
"""

    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": "You are a product research and customer feedback simulation assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7
        )

        result = response.choices[0].message.content

        return {"review": result}

    except Exception as e:
        return {"review": f"Error generating review: {str(e)}"}