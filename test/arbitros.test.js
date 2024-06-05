const request = require('supertest');
const app = require('../index.js');

describe('GET /api/arbitros', function () {
  it('debería obtener todos los arbitros', async function () {
    const res = await request(app).get('/api/arbitros');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/arbitros/:id', function () {
  it('debería obtener un arbitro por ID', async function () {
    const res = await request(app).get('/api/arbitros/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/arbitros', function () {
    it('debería crear un nuevo arbitro', async function () {
      const res = await request(app)
        .post('/api/arbitros')
        .send({ NombreApellido: 'Leandro Rey Hilfer', FechaNac: '1986-06-01', Activo: true});
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        NombreApellido: 'LEANDRO REY HILFER',
        FechaNac: '1986-06-01T00:00:00.000Z',
        Activo: true
      });
    });
  });

describe('PUT /api/arbitros/:id', function () {
  it('debería actualizar un arbitro', async function () {
    const res = await request(app)
      .put('/api/arbitros/1')
      .send({ NombreApellido: 'Fernando Rapalini', Fecha: '1976-10-25', Activo: true });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/arbitros/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/arbitros')
      .send({ NombreApellido: 'ArbitroToDelete', Fecha: '2024-01-01'});
  });

  it('debería eliminar un arbitro', async function () {
    const arbitroToDelete = await request(app)
      .post('/api/arbitros')
      .send({ NombreApellido: 'ArbitroToDelete', Fecha: '2024-01-01' });
    
    const res = await request(app).delete(`/api/arbitros/${arbitroToDelete.body.IdArbitro}`);
    expect(res.statusCode).toBe(200);
  });
});
