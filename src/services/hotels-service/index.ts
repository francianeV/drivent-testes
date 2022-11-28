import { notFoundError, unauthorizedError, invalidDataError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getAvaliablesHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollment) {
    throw unauthorizedError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(Number(enrollment.id));
    
  if(!ticket || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw notFoundError();
  }

  if(ticket.status === "RESERVED") {
    throw invalidDataError(["Ticket must be paid"]);
  }

  return await hotelsRepository.findHotels();
}

async function getHotelRooms(hotelId: number) {
  const rooms = await hotelsRepository.findHotelsRooms(hotelId);

  if(rooms.length === 0) {
    throw notFoundError();
  }

  return rooms;
}

const hotelsService = {
  getAvaliablesHotels,
  getHotelRooms,
};

export default hotelsService;

