import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography';

export default <Partial<Config>>{
    plugins: [typography],
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      }
    }
  }
}
