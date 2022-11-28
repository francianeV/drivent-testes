import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelsRooms(hotelId: number) {
  return prisma.hotel.findMany({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  findHotels,
  findHotelsRooms,
};

export default hotelsRepository;
