from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection,HashModel

from decouple import config

ENDPOINT=config("ENDPOINT")
PASSWORD=config("PASSWORD")
PORT=config("PORT")
app=FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:"],
    allow_methods=["*"],
    allow_headers=["*"],
)


redis=get_redis_connection(
    host=ENDPOINT,
    port=PORT,
    password=PASSWORD,
    decode_response=True
)

# app.add_middleware( CORSMiddleware)

class Product(HashModel):
    name:str
    price:float
    quantity:int

    class Meta:
        database=redis


@app.get("/products")
async def all():
    return [format(pk) for pk in Product.all_pks()]



def format(pk:str):
    p=Product.get(pk)
    return {
        'id':p.pk,
        'name':p.name,
        'price':p.price,
        'quantity':p.quantity,
    }

@app.post("/products")
async def create(p:Product):
    return p.save()


@app.get("/products/{pk}")
async def get(pk:str):
    return Product.get(pk)


@app.delete("/products/{pk}")
async def delete(pk:str):
    return Product.delete(pk)