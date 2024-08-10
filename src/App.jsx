import { useState } from "react";
import Filter from "./Filter";
import Form from "./Form";
import List from "./List";
import Search from "./Search";

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "NoteBook", amount: 50, category: "Utilities" },
    { id: 2, description: "Pencil", amount: 5, category: "Utilities" },
    { id: 3, description: "Milk", amount: 30, category: "Groceries" },
    { id: 4, description: "Pen", amount: 20, category: "Utilities" },
    {
      id: 5,
      description: "Movie Ticket",
      amount: 490,
      category: "Entertainment",
    },
  ]);

  const visibleExpenses = expenses.filter(
    (e) =>
      (selectedCategory ? e.category === selectedCategory : true) &&
      e.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Form
        onSubmit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      />
      <hr />
      <div className="filter-com">
        <Filter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
        <Search onSearch={(query) => setSearch(query)} />
      </div>
      <List
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </>
  );
}

export default App;
