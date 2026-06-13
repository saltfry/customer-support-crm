import { useEffect, useState } from "react";
import api from "../services/api";

import TicketTable from "../components/TicketTable";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/tickets");

      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = async () => {

  if (!searchTerm.trim()) {
    fetchTickets();
    return;
  }

  try {
    const response = await api.get(
      `/tickets/search?q=${searchTerm}`
    );

    setTickets(response.data);

  } catch (error) {
    console.error(error);
  }
  };
  const handleFilter = async (
  status
) => {

  if (!status) {
    fetchTickets();
    return;
  }

  try {
    const response = await api.get(
      `/tickets/filter?status=${status}`
    );

    setTickets(response.data);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-8">
        Tickets
      </h2>

      <div className="mb-6">
        <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  onSearch={handleSearch}
/>
      </div>
      <StatusFilter
  onFilter={handleFilter}
/>

      <TicketTable tickets={tickets} />

    </div>
  );
}

export default Tickets;