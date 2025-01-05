import { z } from 'zod';

// Address Info Schema
export const addressInfoSchema = z.object({
  ID: z.number(),
  Title: z.string(),
  AddressLine1: z.string().optional(),
  Town: z.string().optional(),
  StateOrProvince: z.string().optional(),
  Latitude: z.number(),
  Longitude: z.number(),
});

// Connection Type Schema
export const connectionTypeSchema = z.object({
  ID: z.number(),
  Title: z.string(),
});

// Connection Schema
export const connectionSchema = z.object({
  ID: z.number(),
  ConnectionType: connectionTypeSchema.optional(),
  PowerKW: z.number().optional(),
  Quantity: z.number().optional(),
});

// Status Type Schema
export const statusTypeSchema = z.object({
  ID: z.number(),
  Title: z.string(),
  IsOperational: z.boolean().optional(),
});

// Charging Station Schema
export const chargingStationSchema = z.object({
  ID: z.number(),
  UUID: z.string(),
  AddressInfo: addressInfoSchema,
  Connections: z.array(connectionSchema).optional(),
  NumberOfPoints: z.number().optional(),
  StatusType: statusTypeSchema.optional(),
});

// Types generated from schemas
export type AddressInfo = z.infer<typeof addressInfoSchema>;
export type ConnectionType = z.infer<typeof connectionTypeSchema>;
export type Connection = z.infer<typeof connectionSchema>;
export type StatusType = z.infer<typeof statusTypeSchema>;
export type ChargingStation = z.infer<typeof chargingStationSchema>;

export interface FetchStationsParams {
  latitude: number;
  longitude: number;
  distance: number;
  maxResults?: number;
}