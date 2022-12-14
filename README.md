<h1 align="center">Angular - The modern web developer's platform.</h1>

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="angular-logo" width="120px" height="120px"/>
  <br>
  <i>Angular is a development platform for building mobile and desktop web applications
    <br> using Typescript/JavaScript and other languages.</i>
  <br>
</p>

<p align="center">
  <a href="https://www.angular.io"><strong>www.angular.io</strong></a>
  <br>
</p>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing Guidelines</a>
  ·
  <a href="https://github.com/angular/angular/issues">Submit an Issue</a>
  ·
  <a href="https://blog.angular.io/">Blog</a>
  <br>
  <br>
</p>

<p align="center">
  <a href="https://circleci.com/gh/angular/workflows/angular/tree/main">
    <img src="https://img.shields.io/circleci/build/github/angular/angular/main.svg?logo=circleci&logoColor=fff&label=CircleCI" alt="CI status" />
  </a>&nbsp;
  <a href="https://www.npmjs.com/@angular/core">
    <img src="https://img.shields.io/npm/v/@angular/core.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="Angular on npm" />
  </a>&nbsp;
  <a href="https://discord.gg/angular">
    <img src="https://img.shields.io/discord/463752820026376202.svg?logo=discord&logoColor=fff&label=Discord&color=7389d8" alt="Discord conversation" />
  </a>
</p>

<p align="center">
  <a href="https://app.circleci.com/insights/github/angular/angular/workflows/default_workflow?branch=main">
    <img src="https://dl.circleci.com/insights-snapshot/gh/angular/angular/main/default_workflow/badge.svg" alt="InsightsSnapshot" />
  </a>
</p>

## Descripción

Indicadores CMF App, es una aplicación que te permitirá ver distintos indicadores financieros, donde tendrás una interfaz muy amigable.
Los indicadores que se mostrán en la App, estarás divididas en 2 categorías. Las categorías son:
* Catergoría 1:
    * Dólar
    * Euro
    * UF
* Categoría 2: 
    * IPC
    * UTM
    
Cada indicador mostra su información según su categoría. En la App encontraremos 3 tipos de pantalla, las cuales son:  
    
    * Pantalla de Inicio: Mostrará una lista de indicadores.
    
    * Patalla del Historial: Mostra un historial del indicador seleccionado según su categoría.
        * Categoría 1: Mostrará los datos de los últimos 30 días.
        * Categoría 2: Mostrará los datos del año actual.
    
    * Pantalla del Gráfico: Mostrará un detalle del indicador seleccionado y un gráfico según su categoría.
        * Categoría 1: Mostrará los datos de los últimos 10 días.
        * Categoría 2: Mostrará los datos de los últimos 12 meses.

## API CMF Bancos

[API CMF BANCOS](https://api.cmfchile.cl/que-es-api.html): La API CMF Bancos permite el acceso a diversos recursos de información con datos actuales e históricos de diferentes tipos de reportes que se ofrecen en el sitio web.

La API CMF Bancos permite el acceso a diversos recursos de información con datos actuales e históricos de diferentes tipos de reportes que se ofrecen en el sitio web. Aunque al inicio habrá sólo un grupo de reportes, se irán agregando nuevos recursos, los que se irán informando a través de este sitio web.

La API CMF Bancos es un servicio gratuito; consulte los [términos de uso](https://api.cmfchile.cl/terminos-de-uso.html) para obtener más información al respecto.

## Configuración

[Angular](https://angular.io) Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página.

## Configuración de Desarrollo

### Requisitos

- Install [Node.js] which includes [Node Package Manager][npm]

### Configuración del proyecto

Instalar Angular CLI globalmente:

```
npm install -g @angular/cli
```

Crear un espacio de trabajo:

```
ng new [PROJECT NAME]
```

Para correr la aplicación:

```
cd [PROJECT NAME]
ng serve
```

Angular es multiplataforma, rápido, escalable, tiene herramientas increíbles y es amado por millones.


### Configuración de las librerias

Librería utilizadas en la aplicación


* [Angular Material](https://material.angular.io)
* [Bootstrap](https://getbootstrap.com)
* [Chart.js](https://www.chartjs.org)
* [Ng2-Charts](https://www.npmjs.com/package/ng2-charts)
* [Momentjs](https://momentjs.com)
* [Animate.css](https://animate.style)


Angular Material - Install :

```
ng add @angular/material
```

Bootstrap - Install :

```
<!-- CSS only -->

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
```

Chart.js - Install :

```
npm install chart.js
```

Ng2-Charts - Install :

```
npm install ng2-charts --save
```

Momentjs - Install :

```
npm install moment --save
```

Animate.css - Install :

```
npm install animate.css --save
```
