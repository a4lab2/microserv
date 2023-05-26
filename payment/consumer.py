from main import redis,Order
import time
key='refund_order'
group='payment-group'


try:
    redis.xgroup_create(key,group)

except:
    print('Group already exist')

while True:
    try:
        results=redis.xreadgroup(group,key,{key:'>'},None)
        if results!=[]:
            for res in results:
                obj=res[1][0][1]
                order=Order.get(obj['pk'])
                order.status="refunded"
                order.save()
        # print(results)
    except Exception as e:
        print(str(e))
    time.sleep(1)
