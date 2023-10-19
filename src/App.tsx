import { Suspense, useEffect, useState } from 'react'
import s from './App.module.scss'
import { useRoutes } from 'react-router-dom'
import routes from './router/router'
import { ConfigProvider } from 'antd'
import { AppContext } from './share/AppContext'
import { dayTheme } from './theme'

function App() {
  const [theme, setTheme] = useState<any>(dayTheme)
  function switchTheme(theme: string) {
    const root = document.documentElement;
  
    if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }
  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('git_theme') as string)
    if(theme){
      switchTheme('day')
      import('./theme').then(res=>{
        setTheme(res.dayTheme)
      })
    }else{
      switchTheme('dark')
      import('./theme').then(res=>{
        setTheme(res.darkTheme)
      })
    }
  },[])
  const doSomething = (e:Boolean) => {
    if(!e){
      switchTheme('dark')
      import('./theme').then(res=>{
        setTheme(res.darkTheme)
      })
    }else{
      switchTheme('day')
      import('./theme').then(res=>{
        setTheme(res.dayTheme)
      })
    }
  }

  return (
    <AppContext.Provider value={{ doSomething}}>
      <ConfigProvider theme={theme}>
      <Suspense fallback="">
        <div className={s.main}>{useRoutes(routes)}</div>
      </Suspense>
    </ConfigProvider>
    </AppContext.Provider>
    
  )
}

export default App
