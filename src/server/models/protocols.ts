import { Schema } from "mongoose";

export interface IUser {
  id: string | number;
  name: string;
  email: string;
  password: string;
}

export interface ITransition {
  id: string | number;
  userId: Schema.Types.ObjectId | string; //id do usuario
  origintionCurrency: "EUR"; //moeda de origem
  originValue: number; //valor que vai converter
  destinationCurrency: "BRL" | "USD" | "EUR" | "JPY"; //moeda de destino
  conversionRate: number; //taxa de converção
  destinationValue: number; // valor convertido
  acheat_at: Date;
}
