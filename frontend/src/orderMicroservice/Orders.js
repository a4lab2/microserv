import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Wrapper from '../inventoryMicroservice/wrapper';
// Wrapper
const Orders = () => {
    const [id, setid] = useState();
    const [quantity, setquantity] = useState();
    const [message, setmessage] = useState("Buy product");
    useEffect(() => {

        try {
            if (id) {
                axios.get("http://localhost:8000/products" + id).then((r) => {
                    setmessage(`Your product Price is  ${r.data.price}`)
                })
            }

        } catch (error) {
            setmessage("Buy product")
        }

    }
        , [id]);
    const submit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8001/orders", { id, quantity }, { headers: { 'Content-Type': 'application/json' } },).then((r) => {

        })
        setmessage("Thank you for your order")
    }
    return (
        <Wrapper>
            {message}
            <form onSubmit={submit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Product</label>
                    <input type="text" onChange={e => setid(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Quantity</label>
                    <input type="number" onChange={e => setquantity(e.target.value)} class="form-control" id="exampleInputPassword1" />
                </div>



                <button type="submit" class="btn btn-primary">Buy</button>
            </form>
        </Wrapper>
    )
}

export default Orders