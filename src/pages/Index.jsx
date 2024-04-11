import React, { useState } from "react";
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
          {event.title}
        </Heading>
        <Text>{event.description}</Text>
        <Button leftIcon={<FaEdit />} size="sm" onClick={() => onEditEvent(index)}>
          Edit
        </Button>
      </Box>
    ))}
  </Box>
);

const CreateEventPage = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSave({ title, description });
    setTitle("");
    setDescription("");
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

const EditEventPage = ({ event, onSave }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);

  const handleSubmit = () => {
    onSave({ title, description });
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
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setCurrentPage("home");
  };

  const handleEditEvent = (index) => {
    setSelectedEventIndex(index);
    setCurrentPage("edit");
  };

  const handleUpdateEvent = (updatedEvent) => {
    const updatedEvents = [...events];
    updatedEvents[selectedEventIndex] = updatedEvent;
    setEvents(updatedEvents);
    setCurrentPage("home");
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
        <Heading as="h1">Event Management App</Heading>
        <Button leftIcon={<FaPlus />} onClick={() => setCurrentPage("create")}>
          Create Event
        </Button>
      </Flex>
      {currentPage === "home" && <HomePage events={events} onAddEvent={handleAddEvent} onEditEvent={handleEditEvent} />}
      {currentPage === "create" && <CreateEventPage onSave={handleAddEvent} />}
      {currentPage === "edit" && <EditEventPage event={events[selectedEventIndex]} onSave={handleUpdateEvent} />}
    </Box>
  );
};

export default Index;
