from motor.motor_asyncio import AsyncIOMotorClient
from urllib.parse import quote_plus
from constants.default import sample_data

db = None

def Fetch_Database_Object():
    return db

async def connect_to_database(username, password):
    global db
    if(db is not None):
        return db
    
    encoded_password = quote_plus(password)
    url = f"mongodb+srv://{username}:{encoded_password}@cluster0.qnj0d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try:
        client = AsyncIOMotorClient(url)
        # Test the connection
        await client.admin.command('ping')             
        db = client["analytics_dashboard"]
        
        # await db['clusters'].insert_many(sample_data, ordered=False)
        
        print("====================> Database connected successfully!")   
        return db       # Return the database object

    except Exception as error:
        print("====================> Error while connecting with database:", error)
        raise