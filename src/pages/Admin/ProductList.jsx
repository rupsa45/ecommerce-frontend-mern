import { useState } from "react"

import {
  useCreateProductMutation
} from '../../redux/api/productApiSlice'
import {
  useGetCategoriesQuery
} from '../../redux/api/categoryApiSlice'
import {toast} from 'react-toastify'
import AdminMenu from "./AdminMenu"

const ProductList = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("countInStock", stock);
    formData.append("brand", brand);
    formData.append("quantity", quantity);
    if (image) {
      formData.append("image", image);
    }

    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return <div className="xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-4xl ">Create Product</div>
            {image && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="product"
                  className="block mx-auto max-h-[200px]"
                />
              </div>
            )}
             <div className="mb-3">
                <label className="block mb-2">
                  Upload Image
                </label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="block w-full text-sm  bg-gray-800 placeholder-gray-600
                    rounded-lg  focus:outline-none p-3 cursor-pointer"
                  />
             </div>

            <div className="p-1">
              <div className="flex flex-wrap">
                <div className="one">
                  <label className="">Name</label><br />
                  <input 
                    type="text"  
                    className="p-2 mb-3 w-[25rem] border border-blue-500 
                      rounded-lg bg-transparent text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="two ml-10">
                  <label className="" htmlFor="name block">Price</label><br />
                  <input 
                    type="number"  
                    className="p-2 mb-3 w-[25rem] border border-blue-500 
                      rounded-lg bg-transparent text-white"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label><br />
                <input 
                  type="number"  
                  className="p-2 mb-3 w-[25rem] border border-blue-500 
                    rounded-lg bg-transparent text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label  htmlFor="name block">Brand</label><br />
                <input 
                  type="text"  
                  className="p-2 mb-3 w-[25rem] border border-blue-500 
                    rounded-lg bg-transparent text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
              <label htmlFor="" className="my-5"> Description</label>
              <textarea 
                type="text" 
                className="p-2 mb-3 bg-transparent border border-blue-500 rounded-lg w-[95%]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

                <div className="flex justify-between">
                  <div>
                    <label htmlFor="name block">Count In Stock</label> <br />
                    <input
                      type="text"
                      className="p-2 mb-3 w-[25rem] border rounded-lg bg-transparent border-blue-500"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div>
                  <label htmlFor="">Category</label> <br />
                  <select  
                    placeholder="Choose Category"
                    className="p-2 mb-3 w-[25rem] border rounded-lg bg-transparent bg-gray-900 border-blue-500"
                    onChange={e=>setCategory(e.target.value)}
                  >
                      {
                        categories?.map((c)=>(
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))
                      }
                  </select>
                </div>
                </div>
                <button  
                onClick={handleSubmit} 
                 className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-2 px-4 rounded-md"
                >Submit</button>
                
            </div>
             
        </div>
    </div>
  </div>





}

export default ProductList
