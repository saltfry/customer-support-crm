import { Link } from "react-router-dom";

function TicketTable({ tickets }) {

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

  if (tickets.length === 0) {
    return (
      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          p-8
          text-center
          text-slate-500
        "
      >
        No tickets found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="text-left p-4">
              Ticket ID
            </th>

            <th className="text-left p-4">
              Customer
            </th>

            <th className="text-left p-4">
              Subject
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {tickets.map((ticket) => (

            <tr
              key={ticket.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-4">

                <Link
                  to={`/tickets/${ticket.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {ticket.ticket_id}
                </Link>

              </td>

              <td className="p-4">
                {ticket.customer_name}
              </td>

              <td className="p-4">
                {ticket.issue_title}
              </td>

              <td className="p-4">

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

              </td>

              <td className="p-4">

                {new Date(
                  ticket.created_at
                ).toLocaleDateString()}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TicketTable;