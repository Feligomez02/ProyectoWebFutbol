const request = require('supertest');
const app = require('../index.js');

describe('GET /api/jugadores', function () {
  it('debería obtener todas los jugadores', async function () {
    const res = await request(app).get('/api/jugadores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/jugadores/:id', function () {
  it('debería obtener un jugador por ID', async function () {
    const res = await request(app).get('/api/jugadores/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/jugadores', function () {
    it('debería crear un nuevo jugador', async function () {
      const res = await request(app)
        .post('/api/jugadores')
        .send({ Nombre: 'Martin Palermo', IdEquipo: 2, Activo: false, FechaNacimiento: '2024-06-01' });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        Nombre: 'MARTIN PALERMO',
        IdEquipo: 2,
        Activo: false,
        FechaNacimiento: '2024-06-01T00:00:00.000Z',
      });
    });
  });

describe('PUT /api/jugadores/:id', function () {
  it('debería actualizar un jugador', async function () {
    const res = await request(app)
      .put('/api/jugadores/1')
      .send({ Nombre: 'Edinson Cavani', IdEquipo:2, Activo: true, FechaNacimiento: '1910-10-25' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/jugadores/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/jugadores')
      .send({ Nombre: 'JugadorToDelete', IdEquipo: 5, Activo: true,  FechaNacimiento: '2024-01-01' });
  });

  it('debería eliminar un jugador', async function () {
    const jugadorToDelete = await request(app)
      .post('/api/jugadores')
      .send({ Nombre: 'JuagdorToDelete', IdEquipo: 5, Activo: true, FechaNacimiento: '2024-01-01' });
    
    const res = await request(app).delete(`/api/jugadores/${jugadorToDelete.body.IdJugador}`);
    expect(res.statusCode).toBe(200);
  });
});