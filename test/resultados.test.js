const request = require('supertest');
const app = require('../index.js');

describe('GET /api/resultados', function () {
  it('debería obtener todas los resultados', async function () {
    const res = await request(app).get('/api/resultados');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/resultados/:id', function () {
  it('debería obtener un resultado por ID', async function () {
    const res = await request(app).get('/api/resultados/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/resultados', function () {
    it('debería crear un nuevo resultado', async function () {
      const res = await request(app)
        .post('/api/resultados')
        .send({ Descripcion: 'Torneo 1, partido 5', TorneoId: 1, Activo: false, FechaResultado: '2024-06-01' });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        Descripcion: 'TORNEO 1, PARTIDO 5',
        TorneoId: 1,
        Activo: false,
        FechaResultado: '2024-06-01T00:00:00.000Z',
      });
    });
  });

describe('PUT /api/resultados/:id', function () {
  it('debería actualizar un resultado', async function () {
    const res = await request(app)
      .put('/api/resultados/1')
      .send({ Descripcion: 'Torneo 1, partido 5', TorneoId: 1, Activo: false, FechaResultado: '2024-06-01' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/resultados/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/resultados')
      .send({ Descripcion: 'ResultadoToDelete', TorneoId: 5, Activo: true,  FechaResultado: '2024-01-01' });
  });

  it('debería eliminar un resultado', async function () {
    const resultadoToDelete = await request(app)
      .post('/api/resultados')
      .send({ Descripcion: 'ResultadoToDelete', TorneoId: 5, Activo: true,  FechaResultado: '2024-01-01' });
    }); });
    
    const res = await request(app).delete(`/api/resultados/${resultadoToDelete.body.IdResultado}`);
        expect(res.statusCode).toBe(200);
    });
