import React, { useState } from 'react'
import Wrapper from './wrapper'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// axios

const CreateProduct = () => {
    const [name, setname] = useState();
    const [price, setprice] = useState();
    const [quantity, setquantity] = useState();
    // Navigate
    // useNavigate
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault()

        fetch('http://localhost:8000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, quantity })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data
                console.log(data);
                navigate(-1); // Perform navigation
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

    }
    return (
        <Wrapper>

            <form onSubmit={submit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" onChange={e => setname(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Price</label>
                    <input type="number" onChange={e => setprice(e.target.value)} class="form-control" id="exampleInputPassword1" />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Quantity</label>
                    <input type="number" onChange={e => setquantity(e.target.value)} class="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </Wrapper>
    )
}

export default CreateProduct