import { ApiTourSummary, Tour } from "./tour"

export interface BookingRecord {
  id: string
  reference: string
  tourId: number
  tour: Tour | null
  departureId: string
  departureDate?: string
  status: string
  travelers: number
  total: number
  currency: string
  holdExpiresAt: string
  createdAt: string
}

export interface ApiBookingRecord extends Omit<
  BookingRecord,
  "tour" | "total"
> {
  tour: ApiTourSummary | null
  totalCents: number
}

export interface BookingHold {
  id: string
  reference: string
  tourId: number
  departureId: string
  status: string
  travelers: number
  unitPriceCents: number
  subtotalCents: number
  serviceFeeCents: number
  totalCents: number
  currency: string
  holdExpiresAt: string
  createdAt: string
}

export interface BookingPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}
