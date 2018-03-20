import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AdopcionPage } from '../../pages/adopcion/adopcion';

/*
  Generated class for the BaseDatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseDatosProvider {

  db:SQLiteObject=null;

  constructor(private sqLite:SQLite) {
    console.log('Hello BaseDatosProvider Provider');
  }

  iniciarbdd(){
    this.sqLite.create({
      name:"data.db",
      location:"default"
    })
    .then(
      (data)=>{
        console.log("BASE DE DATOS CREADA");
        this.db=data;
        this.creatablaAdopcion()
        .then(
          (datal)=>{
            console.log("TABLA CREADA");
          })
      .catch((error)=>{
        console.log("ERROR AL CREAR LA TABLA");
      })
    }
    )
    .catch((error)=>{
      console.log("ERROR AL CREAR LA BDD");
    })
  }

  creatablaAdopcion(){
    let sql = "CREATE TABLE IF NOT EXISTS adopciones(id INTEGER PRIMARY KEY AUTOINCREMENT,descripcion TEXT, edad INTEGER,raza TEXT,sexo INTEGER)";
    return this.db.executeSql(sql,[]);
  }

  insertarAdopcion(adopciones:any){
    let sql="INSERT INTO adopciones(descripcion,edad,raza,sexo) VALUES (?,?,?,?)";
    return this.db.executeSql(sql,[adopciones.descripcion,adopciones.edad,adopciones.raza,adopciones.sexo])
  }

  recuperadatos(){
    let sql = "SELECT * FROM alumnos";
    return this.db.executeSql(sql,[])
    .then(
      Response=>{
        let alumnos = [];
        for (let index = 0; index < Response.rows.length; index++) {
          alumnos.push(Response.rows.item(index));
        }
        return Promise.resolve(alumnos);
      }
    )
    .catch(
      error => Promise.reject(error)
    )
  } 

}