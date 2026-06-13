import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import toast from "react-hot-toast";

function CreateTicket() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    issue_title: "",
    description: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await api.post(
        "/tickets",
        formData
      );

      toast.success(
        "Ticket created successfully"
      );

      navigate("/tickets");

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to create ticket"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-3xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-8">
        Create Ticket
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        />

        <input
          type="email"
          name="customer_email"
          placeholder="Customer Email"
          value={formData.customer_email}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        />

        <input
          type="text"
          name="issue_title"
          placeholder="Issue Title"
          value={formData.issue_title}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        />

        <textarea
          name="description"
          placeholder="Describe the issue..."
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full p-3 border rounded-xl"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="
            bg-blue-600
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-blue-700
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >

          {loading
            ? "Creating..."
            : "Create Ticket"}

        </button>

      </form>

    </div>

  );
}

export default CreateTicket;