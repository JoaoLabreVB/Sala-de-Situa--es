import { useContext } from 'react'

import { PopupContext } from '@context/PopupContext'

export function usePopup() {
  const data = useContext(PopupContext)
  return data
}
