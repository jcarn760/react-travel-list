import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

// main app component
export default function App() {
  const [list, setList] = useState(initialItems);

  // state change to update style live upon click
  const [checked, setChecked] = useState(false);

  return (
    <div className="app">
      <Logo />
      <Form list={list} setList={setList} />
      <PackingList
        list={list}
        setList={setList}
        checked={checked}
        setChecked={setChecked}
      />
      <Stats list={list} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Travel Buddy 🧳</h1>;
}

// submit new item form component
function Form({ list, setList }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    const newList = list.concat(newItem);

    setList(newList);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🤔</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

// list of items component
function PackingList({ list, setList, checked, setChecked }) {
  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item
            list={list}
            setList={setList}
            checked={checked}
            setChecked={setChecked}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

// individual item component
function Item({ item, list, setList, checked, setChecked }) {
  // handler function for checkbox toggle
  function handleChange(e) {
    if (e.target.checked) {
      item.packed = true;
      setChecked(!checked);
    } else {
      item.packed = false;
      setChecked(!checked);
    }
  }

  // handler function for delete button
  function handleDelete(id) {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  }

  return (
    <li>
      <input type="checkbox" onClick={handleChange} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}

// footer component
function Stats({ list }) {
  let listLength = list.length;
  let totalPacked = list.filter((checked) => checked.packed === true).length;
  let percentagePacked = Math.floor((totalPacked / listLength) * 100);

  return (
    <footer className="stats">
      <em>
        💼 You have {listLength} {listLength === 1 ? "item" : "items"} on your
        list, and you already packed {totalPacked} ({percentagePacked}%)
      </em>
    </footer>
  );
}
