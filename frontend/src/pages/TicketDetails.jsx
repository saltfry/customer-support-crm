import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import toast from "react-hot-toast";

function TicketDetails() {

  const { ticketId } = useParams();

  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  const [newNote, setNewNote] = useState("");

  const [addingNote, setAddingNote] = useState(false);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {

    try {

      const response = await api.get(
        `/tickets/${ticketId}`
      );

      setTicket(response.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load ticket"
      );

    }

  };

  const getStatusStyle = (status) => {

    if (status === "Open") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "In Progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Closed") {
      return "bg-green-100 text-green-700";
    }

    return "bg-slate-100 text-slate-700";

  };

  const handleStatusChange = async (e) => {

    const newStatus = e.target.value;

    try {

      await api.put(
        `/tickets/${ticket.id}`,
        {
          status: newStatus
        }
      );

      setTicket({
        ...ticket,
        status: newStatus
      });

      toast.success(
        "Status updated"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update status"
      );

    }

  };

  const addNote = async () => {

    if (!newNote.trim()) return;

    setAddingNote(true);

    try {

      await api.post(
        `/tickets/${ticket.id}/notes`,
        {
          note: newNote
        }
      );

      await fetchTicket();

      setNewNote("");

      toast.success(
        "Note added"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to add note"
      );

    } finally {

      setAddingNote(false);

    }

  };

  const handleDelete = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) return;

    setDeleting(true);

    try {

      await api.delete(
        `/tickets/${ticket.id}`
      );

      toast.success(
        "Ticket deleted"
      );

      navigate("/tickets");

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete ticket"
      );

    } finally {

      setDeleting(false);

    }

  };

  if (!ticket) {

    return (
      <div className="p-6">
        Loading...
      </div>
    );

  }

  return (

    <div className="max-w-5xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-8">
        Ticket Details
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="font-semibold text-slate-600">
              Ticket ID
            </p>

            <p className="text-lg">
              {ticket.ticket_id}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-600">
              Customer Name
            </p>

            <p className="text-lg">
              {ticket.customer_name}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-600">
              Customer Email
            </p>

            <p className="text-lg">
              {ticket.customer_email}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-600">
              Created
            </p>

            <p className="text-lg">
              {new Date(
                ticket.created_at
              ).toLocaleString()}
            </p>
          </div>

        </div>

        <div className="mt-6">

          <p className="font-semibold text-slate-600">
            Issue Title
          </p>

          <p className="text-lg">
            {ticket.issue_title}
          </p>

        </div>

        <div className="mt-6">

          <p className="font-semibold text-slate-600">
            Description
          </p>

          <p className="mt-2">
            {ticket.description}
          </p>

        </div>

        <div className="mt-6">

          <p className="font-semibold text-slate-600 mb-2">
            Current Status
          </p>

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-sm
              ${getStatusStyle(ticket.status)}
            `}
          >
            {ticket.status}
          </span>

        </div>

        <div className="mt-6">

          <p className="font-semibold text-slate-600 mb-2">
            Change Status
          </p>

          <select
            value={ticket.status}
            onChange={handleStatusChange}
            className="
              border
              rounded-lg
              p-2
              w-52
            "
          >

            <option value="Open">
              Open
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="
            mt-6
            bg-red-600
            text-white
            px-5
            py-2
            rounded-xl
            hover:bg-red-700
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >

          {deleting
            ? "Deleting..."
            : "Delete Ticket"}

        </button>

      </div>

      <div className="mt-8">

        <h3 className="text-2xl font-semibold mb-4">
          Notes
        </h3>

        {ticket.notes?.length === 0 && (

          <div className="
            bg-white
            rounded-xl
            shadow
            p-4
          ">
            No notes yet.
          </div>

        )}

        <div className="space-y-3">

          {ticket.notes?.map((note) => (

            <div
              key={note.id}
              className="
                bg-white
                rounded-xl
                shadow
                p-4
              "
            >

              <p>
                {note.note}
              </p>

              <p className="text-sm text-slate-500 mt-2">

                {new Date(
                  note.created_at
                ).toLocaleString()}

              </p>

            </div>

          ))}

        </div>

      </div>

      <div className="mt-8">

        <h3 className="text-2xl font-semibold mb-4">
          Add Note
        </h3>

        <div className="
          bg-white
          rounded-xl
          shadow-md
          p-6
        ">

          <textarea
            value={newNote}
            onChange={(e) =>
              setNewNote(e.target.value)
            }
            rows="4"
            placeholder="Write a note..."
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />

          <button
            onClick={addNote}
            disabled={addingNote}
            className="
              mt-4
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-xl
              hover:bg-blue-700
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {addingNote
              ? "Adding..."
              : "Add Note"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default TicketDetails;