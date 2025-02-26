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
      50: '{rose.50}',
      100: '{rose.100}',
      200: '{rose.200}',
      300: '{rose.300}',
      400: '{rose.400}',
      500: '{rose.500}',
      600: '{rose.600}',
      700: '{rose.700}',
      800: '{rose.800}',
      900: '{rose.900}',
      950: '{rose.950}'
    }
  }
});
