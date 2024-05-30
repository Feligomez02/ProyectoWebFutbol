const request = require('supertest');
const app = require('../index.js');

describe('GET /api/ciudades', function () {
  it('debería obtener todas las ciudades', async function () {
    const res = await request(app).get('/api/ciudades');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/ciudades/:id', function () {
  it('debería obtener una ciudad por ID', async function () {
    const res = await request(app).get('/api/ciudades/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/ciudades', function () {
    it('debería crear una nueva ciudad', async function () {
      const res = await request(app)
        .post('/api/ciudades')
        .send({ Nombre: 'Bariloche', PaisId: 1, FechaCiudad: '2024-06-01' });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        Nombre: 'BARILOCHE',
        PaisId: 1,
        FechaCiudad: '2024-06-01T00:00:00.000Z',
      });
    });
  });

describe('PUT /api/ciudades/:id', function () {
  it('debería actualizar una ciudad', async function () {
    const res = await request(app)
      .put('/api/ciudades/1')
      .send({ Nombre: 'Cordoba', PaisId:1, FechaCiudad: '1810-10-25' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/ciudades/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/ciudades')
      .send({ Nombre: 'CityToDelete', PaisId: 5, FechaCiudad: '2024-01-01' });
  });

  it('debería eliminar una ciudad', async function () {
    const cityToDelete = await request(app)
      .post('/api/paises')
      .send({ Nombre: 'CityToDelete', PaisId: 5, FechaCiudad: '2024-01-01' });
    
    const res = await request(app).delete(`/api/ciudades/${cityToDelete.body.IdPais}`);
    expect(res.statusCode).toBe(200);
  });
});