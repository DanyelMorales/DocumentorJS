# DocumentorJS(DKDoc)

Esta utilidad permite monitorear los archivos que posean documentación consumible por el programa ApidocJS (http://apidocjs.com/) de modo que aquellas rutas con sus respectivas expresiones regulares deben ser contenidas en el archivo de configuración(apidoc.config.js).



## **Instalación**

**Usando el instalador**

Una vez clonado el proyecto, se deberá ejecutar el script "bin/install.sh" el cual posee las instrucciones de instalación de las dependencias. Una vez instalado correctamente, el comando DKDoc estará ya disponible.



**Instalación manual**

Si ocurre que existe un error de instalación al ejecutar el instalador, intente instalarlas de forma individual:



* Es necesario que se instale Grunt(https://gruntjs.com/getting-started) y Grunt-cli(https://gruntjs.com/getting-started#installing-the-cli) en un ambito global, tal como se explica en sus respectivos manuales.

```js
npm install grunt -g ;
npm install grunt-cli -g;
```



* Apidocjs es instalable utilizando el comando:

`npm install apidoc -g;`



* Dentro del repositorio clonado de DocumentorJS es necesario ejecutar:

```js
npm install grunt-apidoc --save-dev;
npm install grunt-contrib-watch --save-dev;
npm install grunt-exec --save-dev ;
```



* Por último para registrar el comando de invocación, dentro del repositorio de DocumentorJS es requerido invocar el siguiente comando:

`npm link;`



## **Utilización**

La herramienta internamente esta diseñada para ejecutarse utilizando el archivo "apidoc.config.js" el cual define las reglas a seguir para monitorear e invocar la documentación, la flexibilidad de la configuración permite generar documentación modular y adecuarla a una gran variedad de paradigmas. 



#### Archivo de configuración (apidoc.config.js)

El archivo de configuración debe colocarse dentro del proyecto que se desea documentar, debe considerarse que las rutas que posea el archivo de configuración deberán ser relativas desde la ubicación del apidoc.config.js(marca el root), por lo tanto no es válido que las rutas comiencen con "./ruta/a/documentar", en vez de ello deberá siempre escribirse  como "ruta/a/documentar". El archivo de configuración es solo un módulo de NodeJs que retorna un objeto con dos indices:



| Indice | Descripción                              | Tipo   |
| :----: | ---------------------------------------- | ------ |
| global | Valores predeterminados que permiten ser reutilizados en aquellos objetos que no posean un indice de configuración. Posee valores fallback. | Objeto |
| groups | Almacena una colección de objetos que representan grupos de configuración. | Array  |



Un grupo de configuración representa una estrategía definida que permite monitorear los tipos de archivos que se desean documentar, todo grupo de configuración posee los siguientes indices (aplicables al indice global):


|   Indice    | Descripción                              | Valores                                  |
| :---------: | ---------------------------------------- | ---------------------------------------- |
|  configDir  | Ruta de configuración aplicable para Apidocjs | Es explicado en http://apidocjs.com/#configuration |
|  outputDir  | Ruta donde se almacenarán todos los grupos de documentación generados | String                                   |
|  sourceDir  | Directorio o directorios donde se buscarán los archivos a documentar | Array de Strings                         |
|    regex    | Regex de grunt watch,  cada indice representa un tipo de archivos escrito como expresión regular | Array de regex, cada regex usa el formato de https://github.com/bomsy/grunt-regex-replace |
| regexapidoc | Regex de Apidoc, cada indice representa un tipo de archivos escrito como expresión regular | Array de regex, cada regex usa el formato de http://apidocjs.com/#CLI |
|  groupName  | Nombre del folder del grupo de documentación que se procesa | String                                   |

### 

Ejemplo de archivo de configuración válido:


```
var globalConfig = {
	"configDir": "doc/apidoc/",
	"outputDir": "doc/apidoc/",
	"sourceDir": ["src/resourcesToDocument/"]
};

var example1 = {
				"sourceDir": ["src/resourcesToDocument/"],
				"groupName":"example1", 
				"regex":["/example1/**/*.java", "**/*.js"],
				"regexapidoc":["example1\/.*\.java$"]
};

var example2 = {
				"groupName":"example2", 
				"regex":["!**/example2*.java", "**/*.java"],
				"regexapidoc":["!example2.*\.java$",".*\.java$"]
};

module.exports = {
	"global": globalConfig, 
	"groups": [example1,example2]
};
```



### DKDoc

El comando DKDoc deberá ser ejecutado donde se encuentre el archivo de configuración, esto iniciará el proceso de monitorización y generación automatica de acuerdo a las reglas del archivo de configuración.

```
proyecto/
	doc/
		example1/...
		example2/...
		example3/...
	src/resourcesToDocument/
		myresource.java
		example1.java
		example2.java
	apidoc.config.js
```



### Generando un indice

:p no existe aún