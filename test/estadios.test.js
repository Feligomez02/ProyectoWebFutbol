const request = require('supertest');
const app = require('../index.js');

describe('GET /api/estadios', function () {
  it('debería obtener todas los estadios', async function () {
    const res = await request(app).get('/api/estadios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/estadios/:id', function () {
  it('debería obtener un estadio por ID', async function () {
    const res = await request(app).get('/api/estadios/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/estadios', function () {
    it('debería crear un nuevo estadio', async function () {
      const res = await request(app)
        .post('/api/estadios')
        .send({ NombreEstadio: 'Kempes', PartidoId: 2, ActivoEstadio: false, FechaEstadio: '2024-06-01' });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        NombreEstadio: 'KEMPES',
        PartidoId: 2,
        ActivoEstadio: false,
        FechaEstadio: '2024-06-01T00:00:00.000Z',
      });
    });
  });

describe('PUT /api/estadios/:id', function () {
  it('debería actualizar un estadio', async function () {
    const res = await request(app)
      .put('/api/estadios/1')
      .send({ NombreEstadio: 'Alberdi', PartidoId:2, ActivoEstadio: true, FechaEstadio: '1910-10-25' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/estadios/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/estadios')
      .send({ NombreEstadio: 'EstadioToDelete', PartidoId: 5, ActivoEstadio: true,  FechaEstadio: '2024-01-01' });
  });

  it('debería eliminar un estadio', async function () {
    const estadioToDelete = await request(app)
      .post('/api/estadios')
      .send({ NombreEstadio: 'EstadioToDelete', PartidoId: 5, ActivoEstadio: true, FechaEstadio: '2024-01-01' });
    
    const res = await request(app).delete(`/api/estadios/${estadioToDelete.body.IdEstadio}`);
    expect(res.statusCode).toBe(200);
  });
});
