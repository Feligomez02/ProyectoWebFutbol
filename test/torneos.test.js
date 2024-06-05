const request = require('supertest');
const app = require('../index.js');

describe('GET /api/torneos', function () {
  it('debería obtener todos los torneos', async function () {
    const res = await request(app).get('/api/torneos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/torneos/:id', function () {
  it('debería obtener un torneo por ID', async function () {
    const res = await request(app).get('/api/torneos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/torneos', function () {
    it('debería crear un nuevo torneo', async function () {
      const res = await request(app)
        .post('/api/torneos')
        .send({ Nombre: 'Copa Argentina', FechaInicio: '1986-06-01', Activo: true});
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        Nombre: 'COPA ARGENTINA',
        FechaInicio: '1986-06-01T00:00:00.000Z',
        Activo: true
      });
    });
  });

describe('PUT /api/torneos/:id', function () {
  it('debería actualizar un torneo', async function () {
    const res = await request(app)
      .put('/api/torneos/1')
      .send({ Nombre: 'Vendetta', Fecha: '1976-10-25', Activo: true });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/torneos/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/torneos')
      .send({ Nombre: 'TorneoToDelete', Fecha: '2024-01-01'});
  });

  it('debería eliminar un Torneo', async function () {
    const torneoToDelete = await request(app)
      .post('/api/torneos')
      .send({ Nombre: 'TorneoToDelete', Fecha: '2024-01-01' });
    
    const res = await request(app).delete(`/api/torneos/${torneoToDelete.body.IdTorneo}`);
    expect(res.statusCode).toBe(200);
  });
});