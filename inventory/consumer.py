from main import redis,Product
import time
key='order_completed'
group='inventory-group'


try:
    redis.xgroup_create(key,group)
except:
    print('Group already exist')

while True:
    try:
        results=redis.xreadgroup(group,key,{key:'>'},None)
        if results!=[]:
            for res in results:
                print(res)
                obj=res[1][0][1]
                print(obj)
                product=Product.get(obj['product_id'])
                if product:
                    print(product.quantity)
                    product.quantity=product.quantity-int(obj['quantity'])
                    product.save()
                else:
                    redis.xadd('refund_order',obj,"*")

        # print(results)
    except Exception as e:
        print(str(e))
    
    time.sleep(1)
