const request = require('supertest');
const app = require('../index.js');

describe('GET /api/designaciones', function () {
  it('debería obtener todas las designaciones', async function () {
    const res = await request(app).get('/api/designaciones');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdDesignacion: expect.any(Number),
            IdArbitro: expect.any(Number),
            Descripcion: expect.any(String),
            Confirmada: expect.any(Boolean),
            FechaDesig: expect.any(Date),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});


describe('GET /api/designaciones/:id', function () {
  it('debería obtener una designacion por ID', async function () {
    const res = await request(app).get('/api/designaciones/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/designaciones', function () {
    it('debería crear una nueva designacion', async function () {
      const res = await request(app)
        .post('/api/designaciones')
        .send({ IdArbitro: 8, Descripcion: 'Facundo Tello Dirige el 1 de Junio de 2024' ,Confirmada: true, FechaDesig: '2024-06-01' });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        IdArbitro: 8,
        Confirmada: true,
        FechaDesig: '2024-06-01T00:00:00.000Z',
      });
    });
  });

describe('PUT /api/designaciones/:id', function () {
  it('debería actualizar una designacion', async function () {
    const res = await request(app)
      .put('/api/designaciones/1')
      .send({ IdArbitro: 3, Descripcion: 'Yael Falcon Perez Dirige el 29 de Junio de 2024' , Confirmada: true, FechaDesig: '2024-06-29' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/designaciones/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/designaciones')
      .send({ IdDesignacion: 5, IdArbitro: 1 , Descripcion: 'Fernando Rapalini Dirige el 2 de Julio de 2024' , Confirmada: true, FechaDesig: '2024-07-02' });
  });

  it('debería eliminar un designacion', async function () {
    const designacionToDelete = await request(app)
      .post('/api/designaciones')
      .send({ IdDesignacion: 5, IdArbitro: 1 , Descripcion: 'Fernando Rapalini Dirige el 2 de Julio de 2024' , Confirmada: true, FechaDesig: '2024-07-02' });
    
    const res = await request(app).delete(`/api/designaciones/${designacionToDelete.body.IdDesignacion}`);
    expect(res.statusCode).toBe(200);
  });
});