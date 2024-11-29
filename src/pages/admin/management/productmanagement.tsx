import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../../redux/api/productApi";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { resToast } from "../../../utils/feature";

const Productmanagement = () => {

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  )

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const param = useParams();
  const productID = param.id;

  const { data,isError } = useProductDetailsQuery(productID!);

  const [priceUpdate, setPriceUpdate] = useState<number>(0);
  const [stockUpdate, setStockUpdate] = useState<number>(0);
  const [nameUpdate, setNameUpdate] = useState<string>('');
  const [categoryUpdate, setCategoryUpdate] = useState<string>('');
  const [photo, setPhoto] = useState<string>('')
  const [photoUpdate, setPhotoUpdate] = useState<string>();
  const [photoFile, setPhotoFile] = useState<File>();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", nameUpdate);
    formData.set("category", categoryUpdate);
    formData.set("price", priceUpdate.toString());
    formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);

    const res = await updateProduct({
      userId: user?._id!,
      productId: productID!,
      formdata: formData,
    })
    resToast(res, navigate, "/admin/product")
  };

  useEffect(() => {
    if (data) {
      const { name, price, category, stock, photo } = data.product;
      setNameUpdate(name);
      setPriceUpdate(price);
      setCategoryUpdate(category);
      setStockUpdate(stock);
      setPhoto(photo);
    }
  }, [data])

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: productID!,
    })

    resToast(res,navigate,"/admin/product")
  };

  if(isError) return <Navigate to={'/404'}/>
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - {`${data?.product._id}`}</strong>
          <img src={photo} alt="Product" />
          <p>{nameUpdate}</p>
          {stockUpdate > 0 ? (
            <span className="green">{stockUpdate} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>₹{priceUpdate}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;
