# Frontend Web3 Hackathon 🚀

Una aplicación web moderna construida con **React 18**, **TypeScript** y **Vite** que permite a los usuarios monitorear su consumo de energía, gestionar alertas de presupuesto y administrar su cartera de criptomonedas (BSV).

## 📋 Descripción del Proyecto

Esta es una aplicación frontend para un sistema de monitoreo de energía integrado con tecnología blockchain. Los usuarios pueden:

- 📊 Visualizar gráficos interactivos de consumo de energía y precios
- 🔔 Crear y gestionar alertas de presupuesto y consumo
- 💰 Ver su balance en euros y satoshis (BSV)
- 👤 Administrar su perfil de usuario
- 📱 Acceder a un historial de alertas disparadas

## 🛠️ Tecnologías Utilizadas

### Core Framework
- **React 18** - Librería de UI basada en componentes
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Bundler y dev server ultrarrápido
- **React Router DOM** - Enrutamiento del lado del cliente

### UI & Styling
- **Tailwind CSS** - Framework de CSS utility-first
- **shadcn/ui** - Componentes de UI accesibles y personalizables
- **Lucide React** - Iconos SVG de alta calidad

### Data Visualization
- **Recharts** - Librería de gráficos reactivos para React
- **Chart.js compatible** - Visualización de datos de consumo

### State Management & Context
- **React Context API** - Manejo de estado global
- **Custom Hooks** - Lógica reutilizable en componentes

### Herramientas de Desarrollo
- **ESLint** - Linter para código JavaScript/TypeScript
- **PostCSS** - Procesamiento de CSS
- **Tailwind Merge** - Manejo inteligente de clases CSS
- **clsx** - Utilidad para construcción de clases CSS condicionales

## 📦 Instalación

### Requisitos Previos
- **Node.js** 16.x o superior
- **npm** o **yarn** como gestor de paquetes

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/olixva/hackaton_web3_frontend.git
cd frontend-app-hackaton
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=https://hackaton-web3-backend.vercel.app
VITE_USER_ID=692b9e2c0c45d7f4031812c4
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🚀 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo con HMR
npm run dev

# Compilar para producción
npm run build

# Previsualizar la compilación de producción
npm run preview

# Ejecutar linter
npm run lint

# Ejecutar linter con --fix
npm run lint:fix
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── alarmCard.tsx   # Tarjeta individual de alarma
│   ├── balance-cards.tsx # Tarjetas de balance y consumo
│   ├── chart.tsx        # Gráfico interactivo
│   ├── createAlarmModal.tsx # Modal para crear alertas
│   ├── menu.tsx         # Menú de navegación
│   ├── welcome.tsx      # Componente de bienvenida
│   └── ui/              # Componentes base de UI
├── contexts/            # React Context
│   └── UserContext.tsx  # Contexto global de usuario
├── pages/               # Páginas de la aplicación
│   ├── home.tsx         # Página principal
│   ├── alerts.tsx       # Página de alertas
│   └── profile.tsx      # Página de perfil
├── services/            # Servicios API
│   ├── userService.service.tsx
│   ├── chartService.service.tsx
│   └── alertService.service.tsx
├── lib/                 # Utilidades
│   └── utils.ts         # Funciones auxiliares
├── enums/               # Enumeraciones
│   └── steps.enum.ts    # Enum de intervalos de tiempo
├── constants.ts         # Constantes de la aplicación
├── layout.tsx           # Layout principal
├── router.tsx           # Configuración de rutas
├── main.tsx             # Punto de entrada
├── index.css            # Estilos globales
└── App.tsx              # Componente raíz
```

## 🔌 API Integration

La aplicación se conecta a un backend en `https://hackaton-web3-backend.vercel.app`

### Endpoints Principales

- `GET /user/{id}` - Obtener datos del usuario
- `GET /meter/chart?user_id={id}&step={interval}` - Obtener datos del gráfico
- `GET /alarm/user/{id}` - Obtener alarmas del usuario
- `POST /alarm` - Crear nueva alarma
- `PATCH /alarm/{id}/toggle` - Activar/desactivar alarma
- `GET /alarm/history/{id}` - Obtener historial de alertas

## 🎨 Características Principales

### 1. Dashboard Principal (Home)
- Bienvenida personalizada con avatar del usuario
- Tarjetas mostrando balance en euros y satoshis
- Consumo mensual y promedio diario de energía
- Gráfico interactivo con selector de intervalos (hora, día, semana, mes)

### 2. Gestión de Alertas
- Crear alertas para presupuesto (euros) o consumo (kWh)
- Ajustar umbrales con controles +/-
- Activar/desactivar alarmas existentes
- Visualizar historial de alertas disparadas
- Estado de carga optimista en la UI

### 3. Perfil de Usuario
- Información personal (nombre, email)
- Detalles de billetera BSV
- Balance actual en múltiples monedas
- Copiar dirección BSV al portapapeles
- Opción para añadir saldo

### 4. Navegación
- Menú inferior con acceso rápido a todas las páginas
- Indicadores visuales de página activa
- Smooth transitions entre rutas

## 🔐 Configuración de Usuario

El proyecto utiliza un ID de usuario de prueba. Para usar tu propio usuario, modifica la constante en `src/constants.ts`:

```typescript
export class Constants {
  static userId = "TU_USER_ID_AQUI";
  static API_URL = "https://tu-api-url.com";
}
```

## 🎯 Prefetching de Datos

La aplicación implementa prefetching de datos en la página principal usando `Promise.all()` para cargar datos de forma paralela:
- Datos de usuario
- Datos del gráfico
- Alarmas activas

## 📱 Responsive Design

- Diseño completamente responsive
- Optimizado para dispositivos móviles
- Tailwind CSS para breakpoints adaptativos
- Touch-friendly interactions

## 🌐 Internacionalización

Los comentarios del código están disponibles en:
- **Español** (comentarios originales)
- **Inglés** (traducidos para documentación)

## 🚢 Deployment

### Opciones de Deployment

#### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Arrastra la carpeta 'dist' a Netlify
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🐛 Troubleshooting

### Puerto 5173 ya está en uso
```bash
npm run dev -- --port 3000
```

### Problemas de CORS
Verifica que la variable de entorno `VITE_API_URL` apunta a la URL correcta del backend.

### Compilación fallida
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/)

## 👨‍💻 Autor

Hackathon Web3 - 2024

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

---

**Última actualización:** Diciembre 2024
**Versión:** 1.0.0
