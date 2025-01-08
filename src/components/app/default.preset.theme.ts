import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const defaultPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          bg: "#ececec",
          nav: {
            item: "#ececec"
          },
          0: "#ffffff",
          50: "#fefefe",
          100: "#fafafa",
          200: "#f7f7f7",
          300: "#f3f3f3",
          400: "#f0f0f0",
          500: "#ececec",
          600: "#c9c9c9",
          700: "#c4c4c6",
          800: "#828282",
          900: "#ffffff",
          950: "#3b3b3b"
        }
      },
      dark: {
        surface: {
          bg: "#16161d",
          nav: {
            item: "#16161d"
          },
          50: "#f3f3f4",
          100: "#c7c7c9",
          200: "#9b9b9e",
          300: "#6f6f73",
          400: "#424248",
          500: "#16161d",
          600: "#131319",
          700: "#55565b",
          800: "#0c0c10",
          900: "#2c2c34",
          950: "#060607"
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
