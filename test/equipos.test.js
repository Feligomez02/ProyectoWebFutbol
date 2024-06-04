const request = require('supertest');
const app = require('../index.js');

describe('GET /api/equipos', function () {
  it('debería obtener todos los equipos', async function () {
    const res = await request(app).get('/api/equipos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/equipos/:id', function () {
  it('debería obtener un equipo por ID', async function () {
    const res = await request(app).get('/api/equipos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/equipos', function () {
    it('debería crear un nuevo equipo', async function () {
      const res = await request(app)
        .post('/api/equipos')
        .send({ Nombre: 'Talleres', FechaCreacion: '2024-06-01', Activo: true });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        Nombre: 'TALLERES',
        FechaCreacion: '2024-06-01T00:00:00.000Z',
        Activo: true,
      });
    });
  });

describe('PUT /api/equipos/:id', function () {
  it('debería actualizar un equipo', async function () {
    const res = await request(app)
      .put('/api/equipos/1')
      .send({ Nombre: 'Real Madrid', FechaCreacion: '1900-10-25', Activo: true});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/equipos/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/equipos')
      .send({ Nombre: 'EquipoToDelete', FechaCreacion: '2024-01-01', Activo: true });
  });

  it('debería eliminar un equipo', async function () {
    const equipoToDelete = await request(app)
      .post('/api/equipos')
      .send({ Nombre: 'equipoToDelete', FechaCreacion: '2024-01-01', Activo: true });
    
    const res = await request(app).delete(`/api/equipos/${equipoToDelete.body.IdEquipo}`);
    expect(res.statusCode).toBe(200);
  });
});
