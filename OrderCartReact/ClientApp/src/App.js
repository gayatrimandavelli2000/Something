import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { Button, InputAdornment, TextField } from "@mui/material";
import "./style.css";

export default function App() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { field: "title", headerName: "Title", width: 350 },
        { field: "price", headerName: "Unit Price", width: 100 },
        {
            headerName: "Action",
            width: 150,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClick(cellValues)}
                    >
                        Add To Cart
                    </Button>
                );
            }
        }
    ];

    const cartColumns = [
        { field: "title", headerName: "Product Title", width: 250 },
        { field: "price", headerName: "Unit Price", width: 100 },
        { field: "quantity", headerName: "Quantity", width: 100 },
        { field: "totalPrice", headerName: "Total Price", width: 100 }
    ];

    const handleClick = (cellValues) => {
        const { title, price, id } = cellValues.row;
        console.log(cartData);
        const isExist =
            cartData && cartData.filter((cart) => cart.id === id).length;
        if (isExist) {
            cartData.forEach((cart) => {
                if (cart.id === id) {
                    cart.quantity = ++cart.quantity;
                    cart.totalPrice += cart.price;
                }
            });
            setCartData([...cartData]);
            return false;
        }
        const item = {
            id: id,
            title: title,
            price: price,
            quantity: 1,
            totalPrice: price
        };
        const mergedData = [...cartData, item];
        setCartData([...mergedData]);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (err) {
            console.log(err, "Api throws error");
        }
    };

    const handleChange = (event) => {
        setSearchText(event.target.value);
        let filteredProducts = products;
        if (!!event.target.value) {
            filteredProducts = products.filter((product) =>
                product.title.toLowerCase().includes(event.target.value.toLowerCase())
            );
        }
        setFilteredProducts(filteredProducts);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.get(
                "https://requestcatcher.com/SubmitDetails",
                JSON.stringify(cartData)
            );
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (err) {
            console.log(err, "Api throws error");
        }
    };

    return (
        <div className="App">
            <h1>Products</h1>
            <TextField
                size="small"
                className="product-search-bar"
                value={searchText}
                placeholder="Search By Title"
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <GridSearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid rows={filteredProducts} columns={columns} />
            </div>
            <div className="cart-title"> Cart Details </div>
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid rows={cartData} columns={cartColumns} />
            </div>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Submit
      </Button>
        </div>
    );
}
