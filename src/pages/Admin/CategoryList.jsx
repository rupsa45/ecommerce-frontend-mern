import { useState } from "react"
import { toast } from "react-toastify"
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery
} from '../../redux/api/categoryApiSlice'
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

export default function CategoryList() {
    const {data:categories,refetch} =useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateName,setUpdateName] = useState('');
    const [modalVisible,setModalVisible] = useState(false);

    const handleCreateCategory = async (e)=>{
        e.preventDefault()

        if(!name){
            toast.error(' category name is required ')
            return;
        }

        try {
            const result = await createCategory({name}).unwrap()
            if(result.error){
                toast.error(result.error.message)
            }
            else{
                setName("");
                toast.success(`category created.`);
                refetch();
            }
        } catch (error) {
            console.log(error);
            toast.error("Creating category failed , try again")
        }
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!selectedCategory) {
            toast.error('No category selected');
            return;
        }
        if (!updateName) {
            toast.error('Category name is required');
            return;
        }
        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: {
                    name: updateName,
                },
            }).unwrap();
            if (result.error) {
                toast.error(result.error.message);
            } else {
                toast.success('Category updated.');
                setSelectedCategory(null);
                setUpdateName("");
                setModalVisible(false);
                refetch();
            }
        } catch (error) {
            console.log(error);
            toast.error('Updating category failed, try again');
        }
    };

    const handleDeleteCategory = async ()=>{
        if (!selectedCategory) {
            toast.error('No category selected');
            return;
        }
        try {
            const result =await deleteCategory(selectedCategory._id).unwrap()
            if(result.error){
                toast.error(result.error.message)
            }
            else{
                toast.success('Category deleted')
                setSelectedCategory(null);
                setModalVisible(false);
                refetch()
            }
        } catch (error) {
            console.log(error);
            toast.error("Deleting category failed , try again")
        }
    }
    
  return (
    <div  className="ml-[10rem] flex flex-col md:flex-row">
        <AdminMenu/>
      <div className="md:w-3/4 p-3">
        <div>
            <h1 className="text-2xl font-bold">Categories</h1>
        </div>
        
        <CategoryForm 
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
        />
    
        <div className="flex flex-wrap">
            {
                categories?.map((category) =>
                    <div key={category._id}>
                        <button 
                            className=" bg-transparent border border-blue-500 text-blue-500 py-2
                             px-4 rounded-lg m-3 hover:bg-blue-500 hover:text-white 
                             focus:outline-none foucs:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={()=>{{
                                setModalVisible(true)
                                setSelectedCategory(category)
                                setUpdateName(category.name)
                            }}}> 
                            {category.name}
                        </button>
                    </div>
                )
            }
        </div>
        <Modal 
            isOpen={modalVisible} 
            onClose={()=>setModalVisible(false)}
        >
            <CategoryForm 
                value={updateName} 
                setValue={(value) => setUpdateName(value)}
                handleSubmit={handleUpdateCategory}
                buttonText="Update"
                handleDelete={handleDeleteCategory}
            />
        </Modal>
      </div>
    </div>
  )
}
