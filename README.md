# 🧮 Visualizador de Integrales Triples

Este proyecto es una aplicación interactiva para visualizar integrales triples y sólidos en tres dimensiones utilizando **React**, **Three.js** y **TypeScript**.

## 🚀 Características

- **Visualización 3D**: Explora sólidos como esferas, cilindros, toros y funciones personalizadas.
- **Interfaz Interactiva**: Ajusta parámetros como límites de integración, resolución y velocidad de animación en tiempo real.
- **Animaciones Dinámicas**: Observa el proceso de integración a través de animaciones fluidas.
- **Funciones Personalizadas**: Ingresa funciones matemáticas para crear sólidos personalizados.

## 📂 Estructura del Proyecto

```bash
src/
├── App.tsx
├── components/
│   ├── Controls.tsx
│   ├── Scene.tsx
│   ├── TripleIntegral.tsx
│   ├── animation/
│   │   ├── AnimationControls.tsx
│   │   ├── DifferentialElement.tsx
│   │   └── IntegrationLayer.tsx
│   ├── solids/
│   │   ├── CustomSolid.tsx
│   │   ├── Cylinder.tsx
│   │   ├── Sphere.tsx
│   │   └── Torus.tsx
│   └── LoadingSpinner.tsx
├── hooks/
│   └── useGeometryWorker.ts
├── store/
│   ├── useAnimationStore.ts
│   └── useIntegrationStore.ts
├── types/
│   ├── animation.ts
│   └── math.ts
├── utils/
│   └── mathParser.ts
├── workers/
│   └── geometryWorker.ts
├── main.tsx
└── index.css
```

## 📦 Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

1. **Clona el repositorio**:

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Navega al directorio del proyecto**:

   ```sh
   cd <NOMBRE_DEL_PROYECTO>
   ```

3. **Instala las dependencias**:
   ```sh
   npm install
   ```

## 🖥️ Uso

Para iniciar la aplicación en modo desarrollo, ejecuta el siguiente comando:

```sh
npm run dev
```

## ⚙️ Configuración

Ajusta los parámetros de integración y visualización desde la interfaz de usuario:

- **Tipo de sólido**: Esfera, Cilindro, Toro o Función Personalizada.
- **Función Matemática**: Ingresa tu propia función cuando seleccionas "Función Personalizada".
- **Límites de Integración**: Modifica los límites para los ejes **X**, **Y** y **Z**.
- **Resolución**: Controla la calidad de la visualización ajustando la resolución.
- **Velocidad de Animación**: Ajusta la velocidad de la animación de integración.
- **Transparencia**: Controla la opacidad del sólido para mejorar la visualización de los elementos diferenciales.

## 🛠️ Tecnologías Utilizadas

- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Math.js](https://mathjs.org/)

## 📁 Componentes Clave

### [`App.tsx`](src/App.tsx)

Punto de entrada principal de la aplicación.

### [`TripleIntegral`](src/components/TripleIntegral.tsx)

Componente principal que renderiza el sólido y los elementos de integración.

```tsx
// Renderizado del sólido basado en el tipo seleccionado
{
  solidType === "sphere" && <Sphere {...solidProps} />;
}
{
  solidType === "cylinder" && <Cylinder {...solidProps} />;
}
{
  solidType === "torus" && <Torus {...solidProps} />;
}
{
  solidType === "custom" && <CustomSolid {...solidProps} function={fn} />;
}
```

## 📜 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

### 📝 Atribución

Parte del código fue generado utilizando [bolt.new](https://bolt.new/).

---

**Consejos Adicionales**:

- **Cierre de Bloques de Código**: Asegúrate de ajustar la resolución y la complejidad de los sólidos para mantener un rendimiento fluido, `especialmente en dispositivos con menos capacidad de procesamiento.`
- **Validación de Entradas**: Implementa validaciones para las funciones matemáticas y los límites de integración ingresados por el usuario para evitar errores y comportamientos inesperados.
- **Documentación de Código**: Comenta tu código de manera clara y concisa para facilitar la comprensión y el mantenimiento del proyecto por parte de otros desarrolladores.
- **Pruebas Unitarias**: Escribe pruebas unitarias para los componentes clave y las funciones críticas del proyecto para asegurar su correcto funcionamiento y facilitar la detección de errores.
- **Actualización de Dependencias**: Mantén las dependencias del proyecto actualizadas para beneficiarte de las últimas mejoras y correcciones de seguridad.
- **Uso de Herramientas de Desarrollo**: Utiliza herramientas como ESLint y Prettier para mantener un código limpio y consistente.
- **Accesibilidad**: Considera la accesibilidad en el diseño de la interfaz de usuario para que la aplicación sea usable por personas con discapacidades.
- **Feedback de Usuarios**: Recoge y analiza el feedback de los usuarios para identificar áreas de mejora y nuevas funcionalidades que podrían ser añadidas.
- **Despliegue en Producción**: Si planeas desplegar la aplicación en producción, asegúrate de configurar correctamente el entorno de producción y realizar pruebas exhaustivas.
- **Seguridad**: Implementa medidas de seguridad para proteger la aplicación y los datos de los usuarios, especialmente si planeas permitir la entrada de funciones matemáticas personalizadas.

---
