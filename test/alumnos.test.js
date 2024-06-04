const request = require('supertest');
const app = require('../index.js');

describe('GET /api/alumnos', function () {
  it('debería obtener todos los alumnos', async function () {
    const res = await request(app).get('/api/alumnos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/alumnos/:id', function () {
  it('debería obtener un alumno por ID', async function () {
    const res = await request(app).get('/api/alumnos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('POST /api/alumnos', function () {
    it('debería crear un nuevo alumno', async function () {
      const res = await request(app)
        .post('/api/alumnos')
        .send({ NombreAlumno: 'Mirta', FechaAlumno: '2024-06-01' });
  
      // Agregar un registro de depuración para ver el cuerpo de la respuesta
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        NombreAlumno: 'MIRTA',
        FechaAlumno: '2024-06-01T00:00:00.000Z',
      });
    });
  });

describe('PUT /api/alumnos/:id', function () {
  it('debería actualizar un alumno', async function () {
    const res = await request(app)
      .put('/api/alumnos/1')
      .send({ NombreAlumno: 'Javier', FechaAlumno: '1832-10-22' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([1]);
  });
});

describe('DELETE /api/alumnos/:id', function () {
  beforeAll(async () => {
    await request(app)
      .post('/api/alumnos')
      .send({ NombreAlumno: 'AlumnosToDelete', FechaAlumno: '2024-01-01' });
  });

  it('debería eliminar un alumno', async function () {
    const alumnosToDelete = await request(app)
      .post('/api/alumnos')
      .send({ NombreAlumno: 'AlumnosToDelete', FechaAlumno: '2024-01-01' });
    
    const res = await request(app).delete(`/api/alumnos/${alumnosToDelete.body.IdAlumno}`);
    expect(res.statusCode).toBe(200);
  });
});
