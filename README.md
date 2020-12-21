# Movie App back end

Este proyecto se presenta cómo resultados de prueba para selección.

## Pasos a seguir

Descargar o clonar el proyecto y ejecutar los comandos para instalación

```
npm install
```

Una vez descargado, ejecutar con base de datos MS SQL a través de ORM Sequelize

## Este proyecto contiene

- Conexión a base de datos MS SQL
- Modelos de objetos
- Middlewares para autenticación y manejo de credenciales con bcrypt y JWT
- Routes para Signup (registro), validación de clave segura, login (acceso), creación de películas y creación de tickets
- No hay consultas o queries crudas para subir información, especialmente para usuarios debido a que estos se almacenan de forma encriptada e insertando esta data directamente en SQL generaría distorsión de la información
- El manejo de imágenes se hace directamente en SQL a través de archivos BLOB, que luego se traducen en columnas VARBINARY en la base de datos
- El trigger solicitado no se realizó en proyecto, se presenta a continuación en el quote siguiente

### Consultas que se usaron

En parte se usaron las siguientes consultas en SQL para verificar la información:

```
SELECT * FROM [Movies].[dbo].[tbUsers]
SELECT * FROM [Movies].[dbo].[tbMovies]
SELECT * FROM [Movies].[dbo].[tbTickets]
SELECT * FROM [Movies].[dbo].[tbRooms]


/*

TRUNCATE TABLE [Movies].[dbo].[tbUsers]

TRUNCATE TABLE [Movies].[dbo].[tbMovies]

delete from [Movies].[dbo].[tbUsers] where ident <> 1

delete from [Movies].[dbo].[tbMovies] where ident > 5

*/
```

```
```
CREATE TRIGGER dbo.tgBackupMovies
   ON  dbo.tbMovies
   AFTER DELETE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
	INSERT INTO dbo.tbBackup (ident, title, picture, [desc], duration, genre, time, createdAt, updatedAt)
	SELECT ident, title, picture, [desc], duration, genre, time, createdAt, updatedAt FROM deleted

END
GO
```