from pydantic import BaseModel, Field

class Location(BaseModel):
    latitude: float = Field(..., description="Latitude of the cluster's location")
    longitude: float = Field(..., description="Longitude of the cluster's location")

class Cluster(BaseModel):
    name: str = Field(..., description="Name of the cluster")
    location: Location
    users: int = Field(..., ge=0, description="Total number of users in the cluster")
    projects: int = Field(..., ge=0, description="Total number of projects in the cluster")
    leads: int = Field(..., ge=0, description="Total number of leads in the cluster")