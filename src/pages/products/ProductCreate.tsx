import axios from 'axios';
import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Wrapper from "../../components/Wrapper";

const ProductCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('products', {
            title,
            description,
            price
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/products"/>;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control"
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control"
                              onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control"
                           onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductCreate;
