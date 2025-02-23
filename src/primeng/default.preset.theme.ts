import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const defaultPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "#ececec",
          100: "#dedfdf",
          200: "#c4c4c6",
          300: "#adaeb0",
          400: "#97979b",
          500: "#7f8084",
          600: "#6a6b70",
          700: "#55565b",
          800: "#3f4046",
          900: "#2c2c34",
          950: "#16161d",
          bg: "#ececec",
          card: {
            bg: "#ececec",
            inverse: "#ffffff",
          },
          nav: {
            bg: "#ffffff",
            item: {
              bg: "#ececec",
              border: "#c4c4c6"
            }
          },
        }
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "#ececec",
          100: "#dedfdf",
          200: "#c4c4c6",
          300: "#adaeb0",
          400: "#97979b",
          500: "#7f8084",
          600: "#6a6b70",
          700: "#55565b",
          800: "#3f4046",
          900: "#2c2c34",
          950: "#16161d",
          bg: "#16161d",
          card: {
            bg: "#16161d",
            inverse: "#2c2c34",
          },
          nav: {
            bg: "#2c2c34",
            item: {
              bg: "#16161d",
              border: "#55565b"
            }
          },
        }
      }
    },
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.300}',
      400: '{teal.400}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}'
    }
  }
});
