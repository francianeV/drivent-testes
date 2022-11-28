import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try{
    const hotels = await hotelsService.getAvaliablesHotels(userId);

    res.status(httpStatus.OK).send(hotels);
  }catch(error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    if(error.name === "InvalidDataError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;

  try{
    const rooms = await hotelsService.getHotelRooms(Number(hotelId));

    res.status(httpStatus.OK).send(rooms);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
