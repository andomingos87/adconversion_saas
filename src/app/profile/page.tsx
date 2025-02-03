'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { mockUser } from '@/data/user'
import { Tab } from '@headlessui/react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Camera } from 'lucide-react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {
  const [user] = useState(mockUser)
  const [selectedTab, setSelectedTab] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // TODO: Implementar upload do avatar
      console.log('Upload avatar:', file)
    }
  }

  const tabs = [
    { name: 'Dados Pessoais', content: <PersonalDataTab user={user} /> },
    { name: 'Plano e Pagamentos', content: <PlanAndPaymentsTab user={user} /> },
    { name: 'Notificações', content: <NotificationsTab user={user} /> },
    { name: 'Segurança', content: <SecurityTab /> }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center space-x-4">
        <div className="group relative">
          <div className="overflow-hidden rounded-full ring-2 ring-gray-200 transition-all duration-200 group-hover:ring-blue-500 dark:ring-gray-700 dark:group-hover:ring-blue-400">
            <Image
              src={user.avatar}
              alt={user.name}
              width={100}
              height={100}
              className="rounded-full transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <button
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600"
            title="Alterar foto de perfil"
          >
            <Camera className="h-4 w-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="mb-8 flex space-x-1 rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                  'focus:outline-none',
                  selected
                    ? 'bg-blue-600 text-white shadow dark:bg-blue-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700',
                'p-6 transition-all duration-200'
              )}
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

function PersonalDataTab({ user }: { user: typeof mockUser }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Informações Básicas
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nome
            </label>
            <input
              type="text"
              defaultValue={user.name}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              defaultValue={user.email}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Telefone
            </label>
            <input
              type="tel"
              defaultValue={user.phone}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Empresa
            </label>
            <input
              type="text"
              defaultValue={user.company}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow dark:bg-blue-500 dark:hover:bg-blue-600">
          Salvar Alterações
        </button>
      </div>
    </div>
  )
}

function PlanAndPaymentsTab({ user }: { user: typeof mockUser }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Seu Plano Atual
        </h3>
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.plan.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                R$ {user.plan.price.toFixed(2)}/mês
              </p>
            </div>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow dark:bg-blue-500 dark:hover:bg-blue-600">
              Alterar Plano
            </button>
          </div>
          <div className="mt-4">
            <h5 className="font-medium text-gray-900 dark:text-white">
              Recursos Incluídos:
            </h5>
            <ul className="mt-2 space-y-2">
              {user.plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Métodos de Pagamento
        </h3>
        <div className="mt-4 space-y-4">
          {user.paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-gray-800/50"
            >
              <div className="flex items-center">
                <div className="mr-4 rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-200 dark:bg-gray-700 dark:ring-gray-600">
                  {method.brand === 'visa' ? (
                    <Image
                      src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/visa.svg"
                      alt="Visa"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/mastercard.svg"
                      alt="Mastercard"
                      width={40}
                      height={40}
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)}{' '}
                    terminado em {method.last4}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expira em {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              {method.isDefault ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Principal
                </span>
              ) : (
                <button className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Tornar Principal
                </button>
              )}
            </div>
          ))}
          <button className="mt-4 flex items-center text-blue-600 transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="font-medium">
              Adicionar Novo Método de Pagamento
            </span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Histórico de Pagamentos
        </h3>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {user.paymentHistory.map((payment) => (
                  <tr
                    key={payment.id}
                    className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {format(new Date(payment.date), 'dd/MM/yyyy', {
                        locale: ptBR
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {payment.description}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      R$ {payment.amount.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={classNames(
                          'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        )}
                      >
                        {payment.status === 'paid' ? 'Pago' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationsTab({ user }: { user: typeof mockUser }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Central de Notificações
        </h3>
        <div className="mt-4 space-y-4">
          {user.notifications.map((notification) => (
            <div
              key={notification.id}
              className={classNames(
                'rounded-lg border p-4 shadow-sm transition-all duration-200',
                notification.isRead
                  ? 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50'
                  : 'border-blue-200 bg-blue-50 dark:border-blue-800/50 dark:bg-blue-900/20'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={classNames(
                      'mr-3 flex h-8 w-8 items-center justify-center rounded-full',
                      notification.type === 'success'
                        ? 'bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-300'
                        : notification.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300'
                    )}
                  >
                    {notification.type === 'success' ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : notification.type === 'warning' ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {format(
                        new Date(notification.date),
                        "d 'de' MMMM 'às' HH:mm",
                        {
                          locale: ptBR
                        }
                      )}
                    </p>
                  </div>
                </div>
                {!notification.isRead && (
                  <button className="ml-4 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Marcar como lida
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Preferências de Notificação
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Notificações por Email
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receba atualizações importantes por email
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:after:border-gray-600 dark:peer-checked:bg-blue-500 dark:peer-focus:ring-blue-800"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Notificações Push
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receba notificações em tempo real no navegador
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:after:border-gray-600 dark:peer-checked:bg-blue-500 dark:peer-focus:ring-blue-800"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Alterar Senha
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Senha Atual
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nova Senha
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div className="flex justify-end">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow dark:bg-blue-500 dark:hover:bg-blue-600">
              Alterar Senha
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Autenticação em Duas Etapas
        </h3>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Status: Desativado
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adicione uma camada extra de segurança à sua conta
              </p>
            </div>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow dark:bg-blue-500 dark:hover:bg-blue-600">
              Ativar
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
          Zona de Perigo
        </h3>
        <div className="mt-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm transition-all duration-200 dark:border-red-900/50 dark:bg-red-900/10">
            <h4 className="font-medium text-red-800 dark:text-red-300">
              Cancelar Conta
            </h4>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Ao cancelar sua conta, todos os seus dados serão permanentemente
              excluídos. Esta ação não pode ser desfeita.
            </p>
            <button className="mt-4 rounded-md border border-red-600 bg-white px-4 py-2 text-red-600 shadow-sm transition-all duration-200 hover:bg-red-50 hover:shadow dark:border-red-500 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/30">
              Cancelar Minha Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 