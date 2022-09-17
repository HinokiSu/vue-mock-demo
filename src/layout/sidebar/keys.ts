import { InjectionKey, Ref } from 'vue'

type handleClickSubMenuType = (basePath: string) => void

// keys
export const openedSubMenusKey: InjectionKey<Ref<string[]>> =
  Symbol('openedSubMenus')

export const handleClickSubMenuKey: InjectionKey<handleClickSubMenuType> =
  Symbol('handleClickSubmenu')
