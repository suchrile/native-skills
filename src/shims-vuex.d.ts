import { Store } from '@/shims-vuex'
import { RootState } from '@/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}
