import { User } from '@/types/user'

export const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://picsum.photos/seed/john/200',
  phone: '+55 (11) 98765-4321',
  company: 'Tech Solutions Inc.',
  plan: {
    type: 'premium',
    name: 'Premium',
    price: 99.90,
    billingCycle: 'monthly',
    features: [
      'Até 100 vídeos por mês',
      'Todas as plataformas',
      'Suporte prioritário',
      'Acesso antecipado a novos recursos',
      'Personalização avançada',
      'Análise detalhada de performance'
    ],
    creditsPerMonth: 100,
    isActive: true
  },
  paymentMethods: [
    {
      id: 1,
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 2,
      last4: '8888',
      brand: 'mastercard',
      expiryMonth: 8,
      expiryYear: 2024,
      isDefault: false
    }
  ],
  paymentHistory: [
    {
      id: 1,
      date: '2024-03-01T10:00:00Z',
      amount: 99.90,
      status: 'paid',
      method: 'credit_card',
      description: 'Assinatura Premium - Março 2024'
    },
    {
      id: 2,
      date: '2024-02-01T10:00:00Z',
      amount: 99.90,
      status: 'paid',
      method: 'credit_card',
      description: 'Assinatura Premium - Fevereiro 2024'
    },
    {
      id: 3,
      date: '2024-01-01T10:00:00Z',
      amount: 99.90,
      status: 'paid',
      method: 'credit_card',
      description: 'Assinatura Premium - Janeiro 2024'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'success',
      title: 'Pagamento confirmado',
      message: 'Seu pagamento de março foi processado com sucesso.',
      date: '2024-03-01T10:00:00Z',
      isRead: true
    },
    {
      id: 2,
      type: 'info',
      title: 'Novo recurso disponível',
      message: 'Agora você pode gerar vídeos em formato vertical para Stories.',
      date: '2024-02-28T15:30:00Z',
      isRead: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Cartão próximo do vencimento',
      message: 'Seu cartão terminado em 8888 irá expirar em breve.',
      date: '2024-02-25T09:15:00Z',
      isRead: false
    }
  ],
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2024-03-01T10:00:00Z'
} 