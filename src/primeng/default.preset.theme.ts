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
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}'
    }
  }
});
