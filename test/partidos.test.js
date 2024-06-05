const request = require('supertest');
const app = require('../index.js');

describe('GET /api/partidos', function () {
  it('debería obtener todas los partidos', async function () {
    const res = await request(app).get('/api/partidos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/partidos/:id', function () {
  it('debería obtener un partido por ID', async function () {
    const res = await request(app).get('/api/partidos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/partidos', function () {
    it('debería crear un nuevo partido', async function () {
      const res = await request(app)
        .post('/api/partidos')
        .send({ NombrePartido: 'PARTIDO DE PLAZA',FechaPartido:'2024-06-01', Activo: false });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        NombrePartido: 'PARTIDO DE PLAZA',
        FechaPartido: '2024-06-01T00:00:00.000Z',
        ActivoPartido: false,
      });
    });
  });

describe('PUT /api/partidos/:id', function () {
  it('debería actualizar un partido', async function () {
    const res = await request(app)
      .put('/api/partidos/1')
      .send({ NombrePartido: 'Partido Amigos', FechaPartido: '1910-10-25' , ActivoPartido: true, });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/partidos/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/partidos')
      .send({ Nombre: 'PartidoToDelete', ActivoPartido: true,  FechaPartido: '2024-01-01' });
  });

  it('debería eliminar un partido', async function () {
    const partidoToDelete = await request(app)
      .post('/api/partidos')
      .send({ NombrePartido: 'PartidoToDelete', FechaPartido: '2024-01-01', ActivoPartido: true,  });
    
    const res = await request(app).delete(`/api/partidos/${partidoToDelete.body.IdPartido}`);
    expect(res.statusCode).toBe(200);
  });
});