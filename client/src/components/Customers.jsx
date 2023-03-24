import { useEffect, useState } from "react";
import {
  getAllCustomers,
  createCustomer,
  deleteCustomer,
  editCustomer,
} from "../services/api/customers";

const Customers = () => {
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [formField, setFormField] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    favoriteColors: "",
  });

  const handleChange = (event) => {
    const { target } = event;
    if (target.type === "checkbox") {
      setFormField({
        ...formField,
        [target.name]: target.checked,
      });
    } else {
      setFormField({
        ...formField,
        [target.name]: target.value,
      });
    }
  };

  const fetchCustomers = async () => {
    try {
      const customersData = await getAllCustomers();
      setData(customersData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const insertDocument = async () => {
    const customerInfo = {
      firstName: formField.firstName,
      lastName: formField.lastName,
      favoriteColors: formField.favoriteColors.split(" "),
      age: formField.age,
    };
    const user = await createCustomer(customerInfo);
    setData([...data, user]);
    setFormField({
      firstName: "",
      lastName: "",
      favoriteColors: "",
      age: 0,
    });
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (editStatus) {
      const newCustomer = {
        firstName: formField.firstName,
        lastName: formField.lastName,
        age: formField.age,
        favoriteColors: formField.favoriteColors.split(" "),
      };
      const result = await editCustomer(customer._id, newCustomer);
      console.log(result);
      setEditStatus(false);
      setCustomer({});
      setFormField({
        firstName: "",
        lastName: "",
        favoriteColors: "",
        age: 0,
      });
    } else {
      if (formField.firstName && formField.lastName) {
        try {
          insertDocument();
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEditCustomer = (id) => {
    setEditStatus(true);
    const user = data.filter((customer) => customer._id === id)[0];
    setCustomer(user);
    setFormField({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      favoriteColors: user.favoriteColors.join(" "),
    });
  };

  const handleDeleteCustomer = async (id) => {
    await deleteCustomer(id);
    // window.location.reload();
    const customers = await getAllCustomers();
    setData(customers);
  };

  return (
    <div>
      <h1>customers component</h1>
      <form action="">
        <div>
          firstName:
          <input
            type="text"
            name="firstName"
            value={formField.firstName}
            onChange={handleChange}
            required
          />
          lastName:
          <input
            type="text"
            name="lastName"
            value={formField.lastName}
            onChange={handleChange}
          />
          <br />
          age:
          <input
            type="number"
            name="age"
            value={formField.age}
            onChange={handleChange}
          />
          <br />
          colors favorite:
          <input
            type="text"
            name="favoriteColors"
            value={formField.favoriteColors}
            onChange={handleChange}
          />
          <button onClick={handleAddCustomer}>submit</button>
        </div>
      </form>
      {data &&
        data.map((customer) => (
          <div
            key={customer._id}
            style={{
              background: "black",
              color: "white",
              padding: "1rem",
              margin: ".25rem 0",
            }}
          >
            <p>{customer.firstName}</p>
            <button onClick={() => handleEditCustomer(customer._id)}>
              edit
            </button>
            <button onClick={() => handleDeleteCustomer(customer._id)}>
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Customers;
