import React, { useState, useEffect } from "react";
import { Box, Heading, Button, Flex, Text, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaEdit } from "react-icons/fa";

const HomePage = ({ events, onAddEvent, onEditEvent }) => (
  <Box>
    <Heading as="h1" mb={4}>
      Events
    </Heading>
    {events.map((event, index) => (
      <Box key={index} p={4} borderWidth={1} mb={4}>
        <Heading as="h2" size="md">
          {event.name}
        </Heading>
        <Text>{event.description}</Text>
        <Button leftIcon={<FaEdit />} size="sm" onClick={() => onEditEvent(index)}>
          Edit
        </Button>
      </Box>
    ))}
  </Box>
);

const CreateEventPage = ({ onSave, onError }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const newEvent = await response.json();
      onSave(newEvent);
      setTitle("");
      setDescription("");
    } catch (error) {
      onError(error.message);
    }
  };

  return (
    <Box>
      <Heading as="h1" mb={4}>
        Create Event
      </Heading>
      <FormControl id="title" mb={4}>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <Button onClick={handleSubmit}>Save</Button>
    </Box>
  );
};

const EditEventPage = ({ eventId, onSave, onError }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const data = await response.json();
        setTitle(data.name);
        setDescription(data.description);
      } catch (error) {
        onError(error.message);
      }
    };

    fetchEvent();
  }, [eventId, onError]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      onSave();
    } catch (error) {
      onError(error.message);
    }
  };

  return (
    <Box>
      <Heading as="h1" mb={4}>
        Edit Event
      </Heading>
      <FormControl id="title" mb={4}>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <Button onClick={handleSubmit}>Save</Button>
    </Box>
  );
};

const Index = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setCurrentPage("home");
    setError(null);
  };

  const handleEditEvent = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentPage("edit");
  };

  const handleUpdateEvent = () => {
    setCurrentPage("home");
    setError(null);
    
   
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
        <Heading as="h1">Event Management App</Heading>
        <Button leftIcon={<FaPlus />} onClick={() => setCurrentPage("create")}>
          Create Event
        </Button>
      </Flex>
      {error && <Text color="red.500">{error}</Text>}
      {currentPage === "home" && <HomePage events={events} onAddEvent={handleAddEvent} onEditEvent={handleEditEvent} />}
      {currentPage === "create" && <CreateEventPage onSave={handleAddEvent} onError={setError} />}
      {currentPage === "edit" && <EditEventPage eventId={selectedEventId} onSave={handleUpdateEvent} onError={setError} />}
    </Box>
  );
};

export default Index;
