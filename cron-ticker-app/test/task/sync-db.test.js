const { syncDB } = require("../../task/sync-db");

//Agrupador de las pruebas
describe('Pruebas en Sync-DB',()=>{
    test('Debe de ejecutar el proceso 2 veces',()=>{
        syncDB() //Se ejecuta una vez
        const times=syncDB(); //Se ejecuta por 2da vez y se obtiene el valor
        
        expect(times).toBe(2)
    })
})