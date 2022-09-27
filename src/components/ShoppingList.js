import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then(res => res.json())
    .then((items) => setItems(items))


  }, [])


  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedItems)
  }


  function handleAddItem(newItem) {
    setItems([...items, newItem])
    //console.log("In Shopping List:", newItem)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
     return ((item.id === updatedItem.id) ? updatedItem :item)
    })
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
