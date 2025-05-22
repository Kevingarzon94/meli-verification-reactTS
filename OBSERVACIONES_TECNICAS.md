# Paso de Verificación Final
Se detalla algunas de las consideraciones para realizar la implementacion del modulo
y las decisiones tecnicas

## React Context vs Redux
Aunque Redux es una herramienta poderosa se opto por solo usar context
para el manejo del estado
- Sin dependencias externas
- Menor complejidad
- Suficiente para el manejo del estado
- Opcion nativa

## Typescript
Se decidio typescript por que el tipado ayuda a detectar errores tempranos en tiempos de compilacion
ademas de las facilidades de mantenimiento y refactoring del modulo

## Componentes Modulares
Facilidad para la reutilizacion, mejor forma de seperar las responsabilidades y 
permite que sea mas escalable

## Tailwind CSS 
Se decidio usar ya que me permite generar un menor tamañan en el CSS final,
facilidades para el responsive desing, y permite un desarrollo mas rapido con todas
las herramientas que se tienen a disposicion

## Formularios con validacion inmediata
Reduce errores al validar en tiempo real los errores generados por el usuario y
agiliza su correcion al no esperar al paso final para validarlos

## Unico Contexto
para el alcance del proyecto se decidio utilizar un unico contexto centralizado por simplicidad
y facilidad para el testing

## Reducer con Actions tipadas
Cambios de estados mas predecibles, mejor escalabilidad que tener multiples useStates

## React-i18next
Se decidio usar este paquete ya que es un estandar, tiene soporte para carga dinamica
y conlleva menos tiempo de implementacion que hacerlo custom

# ⚡ Rendimiento
## Lazy loading
Carga de captcha solo cuando es necesario, reduce el tiempo de carga inicial ya que 
el captcha no es critico para la primera visualizacion
## Code Splitting
separar componentes pesados en chunks. menor bundle inicial, carga bajo demanda

## Axios vs FetchAPI
Una configuracion un poco mas robusta, mejor soporte para las peticiones y un menor manejo de interceptors

# Próximas Mejoras

- Implementar métricas
- Optimizar convercion
- Mejora gradual de funcionalidades
