export type PlanType = 'free' | 'basic' | 'premium' | 'enterprise'
export type PaymentMethod = 'credit_card' | 'pix' | 'bank_transfer'
export type NotificationType = 'success' | 'warning' | 'info'

export interface PaymentHistory {
  id: number
  date: string
  amount: number
  status: 'paid' | 'pending'
  method: PaymentMethod
  description: string
}

export interface CreditCard {
  id: number
  last4: string
  brand: 'visa' | 'mastercard'
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

export interface Plan {
  type: PlanType
  name: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  features: string[]
  creditsPerMonth: number
  isActive: boolean
}

export interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  date: string
  isRead: boolean
}

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  phone: string
  company: string
  plan: Plan
  paymentMethods: CreditCard[]
  paymentHistory: PaymentHistory[]
  notifications: Notification[]
  createdAt: string
  updatedAt: string
} 