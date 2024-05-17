import { PaymentInfo } from "./paymentInfo"

export interface Subscription {
    id: string
    startDate: string
    endDate: string
    cancelDate: any
    cancelReason: any
    status: string
    planId: string
    volume: number
    extraLabelPrice: number
    maxLabelQuantity: number
    isYearly: boolean
    paymentInfo: PaymentInfo
    paymentMethod: string
    paymentStatus: string
    paymentId: string
    paymentDate: string
    paymentAmount: number
    paymentCurrency: string
    createdAt: string
    updatedAt: string
    orgId: string
    createdById: any
  }