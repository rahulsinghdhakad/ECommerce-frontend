import { useState } from "react"
import ProductCart from "../components/ProductCart";
import { useCategoriesQuery, useSearchProductQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducers/cartReducer";
import { useDispatch } from "react-redux";

const Search = () => {
  const { data: categoriesData, isLoading, isError, error } = useCategoriesQuery("");

  if (isError) {
    toast.error((error as CustomError).data.message)
  }

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { data: searchData, isError: isErororSearch, error: errorSearch } = useSearchProductQuery({
    search,
    sort,
    price: String(maxPrice),
    category,
    page: String(page),
  });

  if (isErororSearch) {
    toast.error((errorSearch as CustomError).data.message)
  }

  const isPrevPage = page > 1;
  const isNextPage = searchData ? page < searchData.totalPages : true;

  const dispatch=useDispatch();
  
  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock<1) return ;
    dispatch(addToCart(cartItem));
    toast.success("item added to cart")
  };

  return (
    <div className="search">
      <aside>
        <h1>filters</h1>
        <div>
          <h4>sort</h4>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">none</option>
            <option value="asc">price (low to high)</option>
            <option value="des">price (high to low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price {maxPrice || ""}</h4>
          <input
            type="range"
            min={0}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {
              !isLoading && categoriesData?.categories.map((i) =>
                <option value={i}>{i.toUpperCase()}</option>
              )
            }
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="seach by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="search-product-cart">
          {
            searchData?.products.map(i => (
              <ProductCart
                key={i._id}
                name={i.name}
                id={i._id}
                price={i.price}
                stock={i.stock}
                photo={i.photo}
                handler={addToCartHandler}
              />
            ))
          }

        </div>

        {
          searchData && searchData.totalPages > 0 && (
            <article>
              <button
                disabled={!isPrevPage}
                onClick={() => setPage(prev => prev - 1)}
              >
                prev
              </button>

              <span>{page} of {searchData.totalPages}</span>

              <button
                disabled={!isNextPage}
                onClick={() => setPage(prev => prev + 1)}
              >
                next
              </button>
            </article>
          )
        }
      </main>
    </div>
  )
}

export default Search