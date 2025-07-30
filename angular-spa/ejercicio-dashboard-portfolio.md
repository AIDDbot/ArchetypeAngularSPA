# 💼 Ejercicio Práctico: Dashboard de Portfolio Financiero

EJEMPLO DEL USO DE DEFER CON EL RECURSO...

DISPONER DE UN API SIMULADO, POR EJEMPLO CON INTERCEPTORES, PARA RETORNAR INFORMACION DE UN PORTFOLIO FINANCIERO.

- STOCKS, CRYPTO, MONEDAS...

PLANTAR EL ARBOL DE RUTAS NAVEGABLES

- INCLUIR PARAMATEROS, Y PAGINACIÓN (RECORRER UNA LISTA CAMBIANDO PARÁMETROS SIN CAMBIAR DE COMPONENTE)

## 🎯 Objetivo

Desarrollar una aplicación web con **Angular** que permita visualizar un **portfolio financiero personal**, mostrando los diferentes activos del usuario, su valor total y una estimación del valor actualizado en función de precios simulados.

---

## 🧱 Requisitos funcionales

1. **Visualización del portfolio**

   - Mostrar todos los activos (`assets`) del usuario, incluyendo nombre, tipo, símbolo y cantidad.
   - Mostrar el valor total del portfolio (`value`), calculado con los precios actuales.

2. **Autenticación**

   - Simular un flujo básico de autorización para obtener el portfolio de un usuario autenticado.
   - Los datos se obtendrán desde un **servidor Node local**.

3. **Simulación de precios**

   - Utilizar un **interceptor HTTP** en Angular para interceptar las peticiones a precios y devolver valores simulados con el siguiente formato:
     ```ts
     export type Rate = {
       symbol: string;
       name: string;
       price: number;
       timestamp: number;
     };
     ```

4. **Filtrado por tipo de activo**

   - Permitir al usuario filtrar entre: efectivo, criptomonedas y acciones (`cash`, `crypto`, `stoks`).

5. **Actualización dinámica**

   - Permitir actualizar los precios y recalcular automáticamente el valor total del portfolio.

6. **Accesibilidad y semántica**
   - Usar solo HTML estándar semántico, sin frameworks de estilos ni librerías externas para maquetación.

---

## 🧾 Modelos de datos

```ts
export type Asset = {
  id: number;
  name: string;
  type: "cash" | "crypto" | "stoks";
  symbol: string;
  quantity: number;
};

export type Portfolio = {
  currency: string;
  date: Date;
  assets: Asset[];
  value: number;
};

export type Rate = {
  symbol: string;
  name: string;
  price: number;
  timestamp: number;
};
```

---

## ⚙️ Requisitos técnicos

- **Frontend**: Angular (última versión).
- **Estilos**: HTML semántico sin frameworks CSS.
- **Backend**: Servidor Node local que expone endpoints REST para:
  - Autenticación simulada
  - Recuperación del portfolio
- **Precios**: Simulados mediante un interceptor Angular que responde a las peticiones de precios.

---

## 🔄 Flujo esperado

1. Usuario accede a la aplicación y se autentica (simulado).
2. El sistema obtiene el portfolio desde un endpoint local (`/api/portfolio`).
3. Por cada símbolo, se consulta un endpoint de precios (`/api/prices/:symbol`), interceptado para devolver precios aleatorios.
4. Se calcula el valor total del portfolio y se muestra.
5. El usuario puede:
   - Filtrar activos por tipo
   - Actualizar precios para recalcular el valor total

---

## 🎓 Evaluación (si aplica)

- Estructura del proyecto y organización del código.
- Uso correcto de Angular (componentes, servicios, interceptores, tipado).
- HTML accesible y semántico.
- Gestión del estado y lógica de actualización de precios.
- Legibilidad del código y buenas prácticas.

> Bonus:
>
> - Uso de gráficos simples con SVG o canvas sin librerías externas.
> - Persistencia temporal en `localStorage`.
> - Tests unitarios de componentes o servicios.

---

## 📁 Estructura sugerida

```
src/
├── app/
│   ├── core/ (auth, interceptores, servicios)
│   ├── features/
│   │   └── dashboard/
│   ├── models/
│   └── shared/
└── assets/
```

---

## 📌 Notas

- No se requiere integración real con APIs externas.
- El simulador de precios puede usar `Math.random()` dentro de un rango por activo.
- El backend puede ser un pequeño servidor Express con endpoints como `/api/login` y `/api/portfolio`.
