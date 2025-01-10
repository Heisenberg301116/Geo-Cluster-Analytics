from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from database.connection import connect_to_database
from routes.cluster_routes import router as cluster_router

# Load environment variables from .env file
load_dotenv()

USERNAME = os.getenv('DB_USERNAME')
PASSWORD = os.getenv('DB_PASSWORD')
SERVER_PORT = int(os.getenv('SERVER_PORT', 8000))
CLIENT_URL = os.getenv('CLIENT_URL')

# Initialize FastAPI app
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Dependency to get database
@app.on_event("startup")
async def startup_event():
    global db
    db = await connect_to_database(USERNAME, PASSWORD)
    # print("=====================> db = ", db)

# Include router
app.include_router(cluster_router, prefix="/cluster", tags=["Cluster"])

# Example route
@app.get("/")
def home():
    return {"message": "Server is running successfully!"}


# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=SERVER_PORT)