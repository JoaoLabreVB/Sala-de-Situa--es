import React, { createContext, useState } from 'react'

type AlertType = 'success' | 'error'

interface IAlertDTO {
  open?: boolean
  title?: string
  description?: string
  type?: AlertType
}

interface IConfirmDTO {
  open?: boolean
  title?: string
  description?: string
  isRequest?: boolean
  button?: {
    onConfirm?(): void
    confirmTitle?: string
  }
}

interface PopupContextData {
  alertData: IAlertDTO
  confirmData: IConfirmDTO
  alertChange(value: IAlertDTO): Promise<void>
  confirmChange(value: IConfirmDTO): Promise<void>
}

interface PopupContextProviderProps {
  children: React.ReactNode
}

export const PopupContext = createContext({} as PopupContextData)

export const PopupContextProvider: React.FC<PopupContextProviderProps> = ({
  children,
}) => {
  const [alertData, setAlertData] = useState<IAlertDTO>({ open: false })
  const [confirmData, setConfirmData] = useState<IConfirmDTO>({ open: false })

  async function alertChange(value: IAlertDTO): Promise<void> {
    setAlertData(value)
  }

  async function confirmChange(value: IConfirmDTO): Promise<void> {
    setConfirmData(value)
  }

  return (
    <PopupContext.Provider
      value={{ alertData, confirmData, alertChange, confirmChange }}
    >
      {children}
    </PopupContext.Provider>
  )
}
