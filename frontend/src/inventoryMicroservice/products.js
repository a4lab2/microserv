import React, { useEffect, useState } from 'react'
import Wrapper from './wrapper'
import axios from 'axios'; import { Link } from 'react-router-dom';
const Products = () => {
    const [products, setproducts] = useState([]);
    // useEffect
    useEffect(() => {
        axios.get("http://localhost:8000/products").then((r) => {
            console.log(r.data)
            setproducts(r.data)
        })

        // return () => {
        //     cleanup
        // };
    },);
    const del = async (id) => {
        if (window.confirm("Confirm to delete record")) {
            await axios.delete("http://localhost:8000/products/id")
            setproducts(products.filter(p => p.id !== id))
        }
    }
    return (
        <Wrapper>
            <div className='pt-3 pb-2 mb-3 border-bottom'>
                <Link to={`/create`} className='"btn btn-sm btn-outline-secondary'>
                    Add
                </Link>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>
                                    <td>{p.quantity}</td>
                                    <td>

                                        <a href='#' onClick={(e) => del(p.id)} className='btn btn-sm btn-outline-danger'>
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div></Wrapper>
    )
}

export default Products