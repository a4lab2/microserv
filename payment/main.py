from fastapi import FastAPI,Request,BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection,HashModel



from decouple import config
import time, requests

ENDPOINT=config("ENDPOINT")
PASSWORD=config("PASSWORD")
PORT=config("PORT")
app=FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:8000"],
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
class Order(HashModel):
    product_id:str
    price:float
    fee:float
    total:float
    quantity:int
    status:str # Can be pending, completed or refunded

    class Meta:
        database=redis

@app.post("/orders")
async def create_order(request: Request,bg:BackgroundTasks):
    body = await request.json()
    req = requests.get('http://localhost:8000/products/%s' %body['id'])
    product= req.json()
    order=Order(
        product_id=body['id'],
        price=product['price'],
        fee=0.2* product['price'],
        total=product['price'],
        quantity=product['quantity'],
        status='pending',
    )
    order.save()
    bg.add_task(complete_order,order)
    return order

async def complete_order(order:Order):
    order.status='completed'
    order.save()
    # redis stream event 
    redis.xadd('order_completed',order.dict(),"*")

@app.get("/orders/{pk}")
def get(pk:str ):
    order=Order.get(pk)
    redis.xadd('refund_order',order.dict(),"*")
    return order
