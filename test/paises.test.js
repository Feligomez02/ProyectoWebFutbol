const request = require('supertest');
const app = require('../index.js');

describe('GET /api/paises', function () {
  it('debería obtener todos los países', async function () {
    const res = await request(app).get('/api/paises');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/paises/:id', function () {
  it('debería obtener un país por ID', async function () {
    const res = await request(app).get('/api/paises/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/paises', function () {
    it('debería crear un nuevo país', async function () {
      const res = await request(app)
        .post('/api/paises')
        .send({ Nombre: 'Bangladesh', Fecha: '2024-06-01' });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        Nombre: 'BANGLADESH',
        Fecha: '2024-06-01T00:00:00.000Z',
      });
    });
  });

describe('PUT /api/paises/:id', function () {
  it('debería actualizar un país', async function () {
    const res = await request(app)
      .put('/api/paises/1')
      .send({ Nombre: 'Peru', Fecha: '1810-10-25' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/paises/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/paises')
      .send({ Nombre: 'CountryToDelete', Fecha: '2024-01-01' });
  });

  it('debería eliminar un país', async function () {
    const countryToDelete = await request(app)
      .post('/api/paises')
      .send({ Nombre: 'CountryToDelete', Fecha: '2024-01-01' });
    
    const res = await request(app).delete(`/api/paises/${countryToDelete.body.IdPais}`);
    expect(res.statusCode).toBe(200);
  });
});
