import { useEffect, useState } from "react"
import {useNavigate,  useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
} from '../../redux/api/productApiSlice'
import {useGetCategoriesQuery} from '../../redux/api/categoryApiSlice'
import {toast} from 'react-toastify'
import AdminMenu from "./AdminMenu"

const ProductUpdate = () => {
  const { id } = useParams();
    const { data: productData } = useGetProductByIdQuery(id);
    console.log("Fetching product data for ID:", id); // Debugging line

    const {data:categories=[]} = useGetCategoriesQuery()

    const [updateProduct] = useUpdateProductMutation()

    const [deleteProduct] = useDeleteProductMutation()

    const navigate = useNavigate()
    const [image,setImage ]= useState(productData?.image || "")
    const [name,setName] = useState(productData?.name || "")
    const [price,setPrice] = useState(productData?.price || "")
    const [description,setDescription] = useState(productData?.description || "")
    const [category,setCategory] = useState(productData?.category || "")
    const [brand,setBrand] =useState(productData?.brand ||"")
    const [quantity,setQuantity] = useState(productData?.quantity ||"")
    const[stock,setStock] = useState(productData?.countInStock)

    const handleDelete = async () => {
      try {
        let answer = window.confirm(
          "Are you sure you want to delete this product?"
        );
        if (!answer) return;
  
        const { data } = await deleteProduct(id);
        toast.success(`"${data.name}" is deleted`);
        navigate("/admin/allproductslist");
      } catch (err) {
        console.log(err);
        toast.error("Delete failed. Try again.");
      }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
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
      
          const {data} = await updateProduct({productId:id,formData}) 
          if(data.error){
            toast.error(data.error)
          }
          else{
            toast.success("Product Updated Successfully")
          }
        } catch (error) {
            console.log(error);
            toast.error("Product update failed.Try again");
        }

      };

    useEffect(()=>{
        if(productData && productData._id){
          setName(productData.name)
          setPrice(productData.price)
          setDescription(productData.description)
          setCategory(productData.category)
          setBrand(productData.brand)
          setQuantity(productData.quantity)
          setStock(productData.countInStock)
          setImage(productData.image)
        }
    },[productData])
    return <div className="xl:mx-[9rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
      <AdminMenu/>
      <div className="md:w-3/4 p-3">
        <div className="h-12 text-4xl ">Update / Delete Product</div>
          {image && (
            <div className="text-center">
              <img
                 src={image}
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
                  className="p-2 mb-3 w-[25rem] border rounded-lg bg-gray-900 border-blue-500"
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
              <div>
                <button  
                    onClick={handleUpdate} 
                    className="text-white bg-gradient-to-r from-green-400 via-green-500
                    to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                    focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg 
                    text-sm px-5 py-2.5 text-center me-2 mb-2"
                >Update</button>
                <button  
                 onClick={handleDelete} 
                 className="text-white bg-gradient-to-r from-red-400
                  via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 
                  focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 
                 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >Delete</button>
              </div>
              
          </div>
           
      </div>
  </div>
</div>


};

export default ProductUpdate
