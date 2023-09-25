import React, { useContext, useEffect, useState } from "react";
import "./CreateCategory.css";
import { productsContext } from "../../context/productContext";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const {
    createCategory,
    getCategories,
    categories,
    category,
    getCategoryById,
    handleEditCategory,
    deleteCategory,
  } = useContext(productsContext);
  const [show, setShow] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  console.log(categories);

  const handleClose = () => {
    setShow(false);
  };

  const handleEdit = (id) => {
    setEditCategory(id);
    setShow(true);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    await getCategories();
  };

  const handleCreate = async () => {
    if (!categoryName) {
      toast.warn("Заполните поле!");
      return;
    }
    toast.success("Вы успешно добавили категорию !");
    await createCategory({ name: categoryName });
    await getCategories();
    setCategoryName("");
  };
  const handelSubmit = async () => {
    await handleEditCategory(editCategory, { name: editCategoryName });
    getCategories();
    handleClose();
  };

  useEffect(() => {
    if (category) {
      setEditCategoryName(category.name);
    }
  }, [category]);

  useEffect(() => {
    if (editCategory) {
      getCategoryById(editCategory);
    }
  }, [editCategory]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="categories">
      <div>
        <h3>Create Category</h3>
        <input
          type="text"
          placeholder="Category name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div>
        <h3>All categories</h3>
        {categories
          ? categories.map((item, id) => (
              <div key={item.id}>
                {item.name}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
              </div>
            ))
          : "Empty"}
      </div>
      <div className={`modal ${show ? "show" : "hide"}`}>
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <h2>Modal heading</h2>
          </div>
          <div className="modal-body">
            <input
              style={{ width: "100%" }}
              type="text"
              onChange={(e) => setEditCategoryName(e.target.value)}
              value={editCategoryName}
            />
          </div>
          <div className="modal-footer">
            <button onClick={handleClose} className="close-button">
              Close
            </button>
            <button onClick={handelSubmit} className="save-button">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
