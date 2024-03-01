import { ThemeProvider } from 'styled-components'
import { theme } from '@styles/theme'

import { Router } from '@routes'
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from '@context/AuthContext';

import { PopupContextProvider } from '@context/PopupContext';

import GlobalStyles from '@styles/global'

export const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthContextProvider>
            <PopupContextProvider>
              <Router />
              <GlobalStyles />
            </PopupContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </ThemeProvider>

    </>
  )
}