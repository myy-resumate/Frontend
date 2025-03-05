import React from "react";

const ShopTemplate = () => {
    return (
        <>
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#!">
                        Start Bootstrap
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#!">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#!">
                                    About
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Shop
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            All Products
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            Popular Items
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            New Arrivals
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button className="btn btn-outline-dark" type="submit">
                                <i className="bi-cart-fill me-1" />
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            {/* Product section*/}
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img
                                className="card-img-top mb-5 mb-md-0"
                                src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">SKU: BST-498</div>
                            <h1 className="display-5 fw-bolder">Shop item template</h1>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through">$45.00</span>
                                <span>$40.00</span>
                            </div>
                            <p className="lead">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
                                at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi
                                alias magni, accusamus eius blanditiis delectus ipsam minima ea iste
                                laborum vero?
                            </p>
                            <div className="d-flex">
                                <input
                                    className="form-control text-center me-3"
                                    id="inputQuantity"
                                    type="num"
                                    defaultValue={1}
                                    style={{ maxWidth: "3rem" }}
                                />
                                <button
                                    className="btn btn-outline-dark flex-shrink-0"
                                    type="button"
                                >
                                    <i className="bi-cart-fill me-1" />
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Related items section*/}
            <section className="py-5 bg-light">
                <div className="container px-4 px-lg-5 mt-5">
                    <h2 className="fw-bolder mb-4">Related products</h2>
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        <div className="col mb-5">
                            <div className="card h-100">
                                {/* Product image*/}
                                <img
                                    className="card-img-top"
                                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                    alt="..."
                                />
                                {/* Product details*/}
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        {/* Product name*/}
                                        <h5 className="fw-bolder">Fancy Product</h5>
                                        {/* Product price*/}
                                        $40.00 - $80.00
                                    </div>
                                </div>
                                {/* Product actions*/}
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto" href="#">
                                            View options
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-5">
                            <div className="card h-100">
                                {/* Sale badge*/}
                                <div
                                    className="badge bg-dark text-white position-absolute"
                                    style={{ top: "0.5rem", right: "0.5rem" }}
                                >
                                    Sale
                                </div>
                                {/* Product image*/}
                                <img
                                    className="card-img-top"
                                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                    alt="..."
                                />
                                {/* Product details*/}
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        {/* Product name*/}
                                        <h5 className="fw-bolder">Special Item</h5>
                                        {/* Product reviews*/}
                                        <div className="d-flex justify-content-center small text-warning mb-2">
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                        </div>
                                        {/* Product price*/}
                                        <span className="text-muted text-decoration-line-through">
                                            $20.00
                                        </span>
                                        $18.00
                                    </div>
                                </div>
                                {/* Product actions*/}
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-5">
                            <div className="card h-100">
                                {/* Sale badge*/}
                                <div
                                    className="badge bg-dark text-white position-absolute"
                                    style={{ top: "0.5rem", right: "0.5rem" }}
                                >
                                    Sale
                                </div>
                                {/* Product image*/}
                                <img
                                    className="card-img-top"
                                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                    alt="..."
                                />
                                {/* Product details*/}
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        {/* Product name*/}
                                        <h5 className="fw-bolder">Sale Item</h5>
                                        {/* Product price*/}
                                        <span className="text-muted text-decoration-line-through">
                                            $50.00
                                        </span>
                                        $25.00
                                    </div>
                                </div>
                                {/* Product actions*/}
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-5">
                            <div className="card h-100">
                                {/* Product image*/}
                                <img
                                    className="card-img-top"
                                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                    alt="..."
                                />
                                {/* Product details*/}
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        {/* Product name*/}
                                        <h5 className="fw-bolder">Popular Item</h5>
                                        {/* Product reviews*/}
                                        <div className="d-flex justify-content-center small text-warning mb-2">
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                        </div>
                                        {/* Product price*/}
                                        $40.00
                                    </div>
                                </div>
                                {/* Product actions*/}
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright © Your Website 2023</p>
                </div>
            </footer>
        </>
    );
};

export default ShopTemplate;
