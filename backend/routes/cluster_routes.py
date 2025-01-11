from fastapi import APIRouter, HTTPException, Depends, Query
from motor.motor_asyncio import AsyncIOMotorClient
from model.cluster_schema import Cluster
from typing import List
from database.connection import Fetch_Database_Object
from bson import ObjectId
router = APIRouter()

import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

def objectid_to_str(obj):
    """Recursively convert ObjectId to string for all fields"""
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: objectid_to_str(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [objectid_to_str(item) for item in obj]
    return obj


# Endpoint to fetch all clusters
@router.get("/get_clusters", response_model=List[dict])
async def get_data(
    limit: int = Query(10, description="Number of documents to fetch"),
    skip: int = Query(0, description="Number of documents to skip"),
    field: str = Query("name", description="Field to sort by ('name', 'users', 'projects', 'leads')"),
    sorted: str = Query("asc", description="Sort order ('asc' or 'desc')")
):       
    db_client = Fetch_Database_Object()

    # Validate field input
    valid_fields = {"name", "users", "projects", "leads"}
    if field not in valid_fields:
        raise HTTPException(status_code=400, detail=f"Invalid field: {field}. Choose from {valid_fields}")

    # Determine sort direction
    sort_order = 1 if sorted == "asc" else -1

    try:
        # Fetch clusters with specified sort, skip, and limit
        clusters = (
            await db_client["clusters"]
            .find()
            .sort(field, sort_order)
            .skip(skip)
            .limit(limit)
            .to_list(length=limit)
        )

        # Convert all ObjectId fields to string
        clusters = objectid_to_str(clusters)

        return clusters
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Endpoint to calculate metrics
@router.get("/metrics")
async def get_metrics():
    db_client = Fetch_Database_Object() 
    # print("============================> inside api/metrics")
    try:
        clusters = await db_client["clusters"].find().to_list(100)
        total_users = sum(c.get("users", 0) for c in clusters)
        total_clusters = len(clusters)
        total_projects = sum(c.get("projects", 0) for c in clusters)
        total_leads = sum(c.get("leads", 0) for c in clusters)
        avg_users_per_cluster = total_users / total_clusters if total_clusters else 0
        return {
            "total_users": total_users,
            "total_clusters": total_clusters,
            "total_projects": total_projects,
            "total_leads": total_leads,
            "avg_users_per_cluster": avg_users_per_cluster,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Endpoint to add a new cluster
@router.post("/add")
async def add_cluster(cluster: Cluster):
    db_client = Fetch_Database_Object()
    
    # Check if the cluster name already exists
    existing_cluster = await db_client["clusters"].find_one({"name": cluster.name})
    if existing_cluster:            
        raise HTTPException(status_code=400, detail="Cluster name is already registered !")               
        
    # Convert Pydantic model to dictionary
    cluster_data = cluster.dict()

    # Insert the new cluster data into the database
    result = await db_client["clusters"].insert_one(cluster_data)
    
    # Retrieve the inserted document using the inserted_id
    new_cluster = await db_client["clusters"].find_one({"_id": result.inserted_id})
    
    # Convert the ObjectId fields to strings
    new_cluster = objectid_to_str(new_cluster)

    # Return the successful response with the cluster data
    return {
        "status_code": 200,
        "message": "Cluster added successfully",
        "cluster": new_cluster
    }

    
    
    
    
    
# Endpoint to delete a cluster by ID
@router.delete("/delete/{docid}")
async def delete_cluster(docid: str):
    db_client = Fetch_Database_Object()
    # Validate if the docid is a valid ObjectId
    if not ObjectId.is_valid(docid):
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")
            
    # Attempt to delete the cluster by its ObjectId
    result = await db_client["clusters"].delete_one({"_id": ObjectId(docid)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cluster not found")

    return {
        "status_code": 200,
        "message": "Cluster deleted successfully"
    }