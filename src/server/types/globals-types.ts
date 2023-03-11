import { ITransition } from "../models/protocols";

export type TOmitId<T> = Omit<T, "id">;
export type TOmitPassword<T> = Omit<T, "password">;
export type TOmitDestinationValue = Omit<ITransition, "destinationValue">;
