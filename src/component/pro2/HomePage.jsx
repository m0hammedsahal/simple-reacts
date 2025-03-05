import React from "react";
import useFetchData from "./useFetchData";
import DataSection from "./DataSection";

function HomePage() {
  const { data: products, setData: setProducts, loading: productLoading, error: productError } = useFetchData("http://127.0.0.1:8000/api/products/");
  const { data: categories, loading: categoryLoading, error: categoryError } = useFetchData("http://127.0.0.1:8000/api/categories/");
  const { data: offers, loading: offerLoading, error: offerError } = useFetchData("http://127.0.0.1:8000/api/offers/");

  return (
    <div>
      <DataSection title="Our Products" data={products} loading={productLoading} error={productError} />
      <DataSection title="Categories" data={categories} loading={categoryLoading} error={categoryError} />
      <DataSection title="Special Offers" data={offers} loading={offerLoading} error={offerError} />
    </div>
  );
}

export default HomePage;
